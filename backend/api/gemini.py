import json

import requests
from django.conf import settings


LEGACY_MODEL_REPLACEMENTS = {
    "gemini-1.5-flash": "gemini-2.5-flash",
    "gemini-1.5-pro": "gemini-2.5-pro",
}


def _normalize_model(model):
    model = (model or settings.GEMINI_TEXT_MODEL).removeprefix("models/")
    return LEGACY_MODEL_REPLACEMENTS.get(model, model)


def _gemini_url(model):
    return f"https://generativelanguage.googleapis.com/v1beta/models/{_normalize_model(model)}:generateContent?key={settings.GEMINI_API_KEY}"


def generate_json(prompt, *, file_obj=None, mime_type=None, model=None, temperature=0.2):
    if not settings.GEMINI_API_KEY:
        raise RuntimeError("GEMINI_API_KEY is not configured")

    parts = [{"text": prompt}]
    if file_obj is not None:
        encoded = file_obj.read()
        import base64

        parts.append(
            {
                "inline_data": {
                    "mime_type": mime_type or "application/octet-stream",
                    "data": base64.b64encode(encoded).decode("ascii"),
                }
            }
        )

    response = requests.post(
        _gemini_url(model),
        json={
            "contents": [{"parts": parts}],
            "generationConfig": {
                "temperature": temperature,
                "maxOutputTokens": 4096,
                "responseMimeType": "application/json",
            },
        },
        timeout=90,
    )
    if not response.ok:
        raise RuntimeError(f"Gemini API error: {response.text}")

    data = response.json()
    text = data.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text")
    if not text:
        raise RuntimeError("No content received from Gemini")

    try:
        return json.loads(text)
    except json.JSONDecodeError:
        return {"raw": text}
