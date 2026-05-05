import json
import logging

from django.conf import settings
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.db import IntegrityError
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_http_methods

from .gemini import generate_json
from .models import AnalysisRecord, AuthToken


User = get_user_model()
logger = logging.getLogger(__name__)


def _json_body(request):
    if not request.body:
        return {}
    return json.loads(request.body.decode("utf-8"))


def _user_payload(user):
    return {"id": user.id, "username": user.username, "email": user.email}


def _auth_user(request):
    header = request.headers.get("Authorization", "")
    if not header.startswith("Token "):
        return None
    token = AuthToken.objects.select_related("user").filter(key=header.removeprefix("Token ").strip()).first()
    return token.user if token else None


def _require_auth(request):
    user = _auth_user(request)
    if not user:
        return None, JsonResponse({"error": "Authentication required"}, status=401)
    return user, None


@require_GET
def health(_request):
    return JsonResponse({"status": "ok"})


@require_GET
def root(_request):
    return JsonResponse(
        {
            "service": "HepatoScan AI backend",
            "status": "ok",
            "health": "/api/health/",
            "auth": {
                "signup": "/api/auth/signup/",
                "signin": "/api/auth/signin/",
            },
            "endpoints": {
                "analyze": "/api/hepato-analyze/",
                "advice": "/api/hepato-advice/",
            },
        }
    )


@csrf_exempt
@require_http_methods(["POST"])
def signup(request):
    try:
        data = _json_body(request)
        username = data.get("username", "").strip()
        email = data.get("email", "").strip()
        password = data.get("password", "")
        if not username or not email or not password:
            return JsonResponse({"error": "Username, email, and password are required"}, status=400)
        validate_password(password)
        user = User.objects.create_user(username=username, email=email, password=password)
        token = AuthToken.create_for_user(user)
        return JsonResponse({"token": token.key, "user": _user_payload(user)}, status=201)
    except ValidationError as exc:
        return JsonResponse({"error": " ".join(exc.messages)}, status=400)
    except IntegrityError:
        return JsonResponse({"error": "Username already exists"}, status=400)


@csrf_exempt
@require_http_methods(["POST"])
def signin(request):
    data = _json_body(request)
    username_or_email = data.get("username", "").strip()
    password = data.get("password", "")
    username = username_or_email
    if "@" in username_or_email:
        matched_user = User.objects.filter(email__iexact=username_or_email).first()
        if matched_user:
            username = matched_user.get_username()
    user = authenticate(username=username, password=password)
    if not user:
        return JsonResponse({"error": "Invalid username/email or password"}, status=400)
    AuthToken.objects.filter(user=user).delete()
    token = AuthToken.create_for_user(user)
    return JsonResponse({"token": token.key, "user": _user_payload(user)})


@csrf_exempt
@require_http_methods(["POST"])
def signout(request):
    header = request.headers.get("Authorization", "")
    if header.startswith("Token "):
        AuthToken.objects.filter(key=header.removeprefix("Token ").strip()).delete()
    return JsonResponse({"status": "signed_out"})


@require_GET
def me(request):
    user, error = _require_auth(request)
    if error:
        return error
    return JsonResponse({"user": _user_payload(user)})


def _hepato_report_prompt(data):
    return f"""You are an expert hepatologist and radiologist specializing in liver diseases. Analyze this liver scan or report and provide a structured assessment.

Test Type: {data.get('testType') or 'Unknown'}
Patient Age: {data.get('patientAge') or 'Unknown'}
Patient Sex: {data.get('patientSex') or 'Unknown'}
Alcohol Use: {data.get('alcoholUse') or 'Unknown'}
Symptoms/Notes: {data.get('symptoms') or 'None provided'}

Focus on liver size, echotexture, steatosis, fibrosis/cirrhosis indicators, lesions, portal vein status, ascites, gallbladder/bile ducts, and spleen size if visible.

Return only JSON in this shape:
{{
  "reportTitle": "Liver Health Assessment Report",
  "severity": "normal|mild|moderate|severe",
  "scanQuality": "string",
  "findings": [{{"parameter": "string", "observation": "string", "status": "normal|mild|moderate|severe"}}],
  "impression": "string",
  "possibleConditions": ["string"],
  "recommendedFollowUp": "string",
  "limitations": "string"
}}"""


def _hepato_advice_prompt(data):
    return f"""You are a compassionate hepatology specialist. Based on this liver health assessment, provide personalized patient advice.

Liver Assessment Report:
{json.dumps(data.get('report', {}), indent=2)}

Patient Age: {data.get('patientAge') or 'Unknown'}
Patient Sex: {data.get('patientSex') or 'Unknown'}
Alcohol Use: {data.get('alcoholUse') or 'Unknown'}
Symptoms: {data.get('symptoms') or 'None provided'}

Return only JSON in this shape:
{{
  "simpleSummary": "string",
  "whatItMeans": "string",
  "recommendations": ["string"],
  "warningSigns": ["string"],
  "specialistReferral": "string",
  "disclaimer": "string"
}}"""


@csrf_exempt
@require_http_methods(["POST"])
def hepato_analyze(request):
    user, error = _require_auth(request)
    if error:
        return error
    upload = request.FILES.get("file")
    if not upload:
        return JsonResponse({"error": "No file uploaded"}, status=400)

    try:
        data = request.POST
        report = generate_json(
            _hepato_report_prompt(data),
            file_obj=upload,
            mime_type=upload.content_type,
            model=settings.GEMINI_VISION_MODEL,
        )
        if "raw" in report:
            report = {
                "reportTitle": "Liver Health Assessment Report",
                "severity": "normal",
                "scanQuality": "Assessed",
                "findings": [{"parameter": "General", "observation": report["raw"], "status": "normal"}],
                "impression": report["raw"],
                "possibleConditions": [],
                "recommendedFollowUp": "Consult a hepatologist or gastroenterologist",
                "limitations": "AI-generated assessment based on the uploaded file",
            }
        record = AnalysisRecord.objects.create(
            user=user,
            test_type=data.get("testType", "Liver Scan"),
            patient_age=data.get("patientAge", ""),
            patient_sex=data.get("patientSex", ""),
            symptoms=data.get("symptoms", ""),
            alcohol_use=data.get("alcoholUse", ""),
            report=report,
        )
        return JsonResponse({"report": report, "analysisId": record.id})
    except Exception as exc:
        logger.exception("Liver analysis failed")
        return JsonResponse({"error": str(exc) or "Liver analysis failed"}, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def hepato_advice(request):
    user, error = _require_auth(request)
    if error:
        return error
    try:
        data = _json_body(request)
        advice = generate_json(_hepato_advice_prompt(data), model=settings.GEMINI_TEXT_MODEL, temperature=0.3)
        if "raw" in advice:
            advice = {
                "simpleSummary": advice["raw"],
                "whatItMeans": "Please consult a hepatologist or gastroenterologist for proper interpretation.",
                "recommendations": ["Schedule an appointment with a liver specialist"],
                "warningSigns": ["Yellowing of skin or eyes", "Severe abdominal pain", "Confusion or extreme fatigue"],
                "specialistReferral": "Consult a hepatologist or gastroenterologist",
                "disclaimer": "This is AI-generated advice and not a substitute for professional medical care.",
            }
        record_id = data.get("analysisId")
        if record_id:
            AnalysisRecord.objects.filter(id=record_id, user=user).update(advice=advice)
        return JsonResponse({"advice": advice})
    except Exception as exc:
        logger.exception("Liver advice generation failed")
        return JsonResponse({"error": str(exc) or "Advice generation failed"}, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def general_analyze(request):
    return hepato_analyze(request)


@csrf_exempt
@require_http_methods(["POST"])
def general_advice(request):
    return hepato_advice(request)


@require_GET
def analysis_history(request):
    user, error = _require_auth(request)
    if error:
        return error
    records = AnalysisRecord.objects.filter(user=user)[:20]
    return JsonResponse(
        {
            "analyses": [
                {
                    "id": record.id,
                    "testType": record.test_type,
                    "patientAge": record.patient_age,
                    "patientSex": record.patient_sex,
                    "alcoholUse": record.alcohol_use,
                    "report": record.report,
                    "advice": record.advice,
                    "createdAt": record.created_at.isoformat(),
                }
                for record in records
            ]
        }
    )
