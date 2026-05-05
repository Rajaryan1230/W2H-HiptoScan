const express = require('express');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const upload = multer({ limits: { fileSize: 20 * 1024 * 1024 } }); // 20MB limit

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_VISION_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
const GEMINI_PRO_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`;

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Original analyze endpoint for general scans
app.post('/api/analyse', upload.single('file'), async (req, res) => {
  try {
    const { testType, patientAge, patientSex, symptoms } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Convert file to base64
    const base64Data = file.buffer.toString('base64');
    const mimeType = file.mimetype;

    const prompt = `You are an expert radiologist. Analyze this medical scan and provide a detailed structured report.

Test Type: ${testType || 'Unknown'}
Patient Age: ${patientAge || 'Unknown'}
Patient Sex: ${patientSex || 'Unknown'}
Symptoms/Notes: ${symptoms || 'None provided'}

Provide your response in this exact JSON format:
{
  "reportTitle": "string",
  "urgency": "routine|urgent|emergency",
  "scanQuality": "string",
  "findings": [
    {
      "region": "string",
      "observation": "string",
      "severity": "normal|mild|moderate|severe"
    }
  ],
  "impression": "string",
  "differentialDiagnosis": ["string"],
  "recommendedFollowUp": "string",
  "limitations": "string"
}

Be thorough and professional. If you cannot make a definitive assessment, state the limitations clearly.`;

    const response = await fetch(GEMINI_VISION_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: mimeType,
                data: base64Data
              }
            }
          ]
        }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 4096,
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Gemini API error: ${error}`);
    }

    const data = await response.json();
    const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textContent) {
      throw new Error('No content received from Gemini');
    }

    // Parse JSON from response
    let report;
    try {
      report = JSON.parse(textContent);
    } catch {
      // If not valid JSON, wrap in expected format
      report = {
        reportTitle: "Medical Imaging Report",
        urgency: "routine",
        scanQuality: "Assessed",
        findings: [{ region: "General", observation: textContent, severity: "normal" }],
        impression: textContent,
        differentialDiagnosis: [],
        recommendedFollowUp: "Consult with your healthcare provider",
        limitations: "AI-generated assessment"
      };
    }

    res.json({ report });

  } catch (err) {
    console.error('Analysis error:', err);
    res.status(500).json({ error: err.message || 'Analysis failed' });
  }
});

// Original advice endpoint
app.post('/api/advice', async (req, res) => {
  try {
    const { report, patientAge, patientSex, symptoms } = req.body;

    const prompt = `You are a compassionate medical advisor. Based on the following radiologist report, provide personalized patient advice.

Radiologist Report:
${JSON.stringify(report, null, 2)}

Patient Age: ${patientAge || 'Unknown'}
Patient Sex: ${patientSex || 'Unknown'}
Symptoms: ${symptoms || 'None provided'}

Provide your response in this exact JSON format:
{
  "simpleSummary": "string - explain in simple terms what the report means",
  "whatItMeans": "string - medical explanation in plain language",
  "recommendations": ["string - actionable advice items"],
  "redFlags": ["string - symptoms to watch for, if any"],
  "specialistReferral": "string - what type of doctor to see",
  "disclaimer": "string"
}

Be empathetic, clear, and actionable. Focus on empowering the patient with knowledge while emphasizing the need for professional medical consultation.`;

    const response = await fetch(GEMINI_PRO_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 4096,
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Gemini API error: ${error}`);
    }

    const data = await response.json();
    const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textContent) {
      throw new Error('No content received from Gemini');
    }

    let advice;
    try {
      advice = JSON.parse(textContent);
    } catch {
      advice = {
        simpleSummary: textContent,
        whatItMeans: "Please consult your healthcare provider for interpretation.",
        recommendations: ["Schedule a follow-up with your doctor"],
        redFlags: [],
        specialistReferral: "Consult your primary care physician",
        disclaimer: "This is AI-generated advice and not a substitute for professional medical consultation."
      };
    }

    res.json({ advice });

  } catch (err) {
    console.error('Advice error:', err);
    res.status(500).json({ error: err.message || 'Advice generation failed' });
  }
});

// HepatoScan - Liver Analysis Endpoint
app.post('/api/hepato-analyze', upload.single('file'), async (req, res) => {
  try {
    const { testType, patientAge, patientSex, symptoms, alcoholUse, scanCategory } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Convert file to base64
    const base64Data = file.buffer.toString('base64');
    const mimeType = file.mimetype;

    const prompt = `You are an expert hepatologist and radiologist specializing in liver diseases. Analyze this liver scan/report and provide a detailed structured assessment.

Test Type: ${testType || 'Unknown'}
Patient Age: ${patientAge || 'Unknown'}
Patient Sex: ${patientSex || 'Unknown'}
Alcohol Use: ${alcoholUse || 'Unknown'}
Symptoms/Notes: ${symptoms || 'None provided'}

Focus on identifying:
- Liver size and echotexture
- Fatty liver changes (steatosis grade if visible)
- Fibrosis/cirrhosis indicators
- Lesions or masses (hemangioma, cysts, HCC, metastases)
- Portal vein status
- Ascites
- Gallbladder and bile ducts
- Spleen size (if visible)

Provide your response in this exact JSON format:
{
  "reportTitle": "Liver Health Assessment Report",
  "severity": "normal|mild|moderate|severe",
  "scanQuality": "string",
  "findings": [
    {
      "parameter": "string (e.g., Liver Size, Echotexture, Fatty Change, Fibrosis, Lesions, Portal Vein)",
      "observation": "string",
      "status": "normal|mild|moderate|severe"
    }
  ],
  "impression": "string - overall clinical impression",
  "possibleConditions": ["string - possible diagnoses to consider"],
  "recommendedFollowUp": "string - specific follow-up tests or timeline",
  "limitations": "string - limitations of this assessment"
}

Be thorough and professional. Consider the patient's alcohol use and symptoms in your assessment. If you cannot make a definitive assessment, state the limitations clearly.`;

    const response = await fetch(GEMINI_VISION_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: mimeType,
                data: base64Data
              }
            }
          ]
        }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 4096,
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Gemini API error: ${error}`);
    }

    const data = await response.json();
    const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textContent) {
      throw new Error('No content received from Gemini');
    }

    // Parse JSON from response
    let report;
    try {
      report = JSON.parse(textContent);
    } catch {
      // If not valid JSON, wrap in expected format
      report = {
        reportTitle: "Liver Health Assessment Report",
        severity: "normal",
        scanQuality: "Assessed",
        findings: [{ parameter: "General Assessment", observation: textContent, status: "normal" }],
        impression: textContent,
        possibleConditions: [],
        recommendedFollowUp: "Consult with a hepatologist or gastroenterologist",
        limitations: "AI-generated assessment based on image analysis"
      };
    }

    res.json({ report });

  } catch (err) {
    console.error('Liver analysis error:', err);
    res.status(500).json({ error: err.message || 'Liver analysis failed' });
  }
});

// HepatoScan - Liver Advice Endpoint
app.post('/api/hepato-advice', async (req, res) => {
  try {
    const { report, patientAge, patientSex, symptoms, alcoholUse } = req.body;

    const prompt = `You are a compassionate hepatology specialist. Based on the following liver health assessment, provide personalized patient advice.

Liver Assessment Report:
${JSON.stringify(report, null, 2)}

Patient Age: ${patientAge || 'Unknown'}
Patient Sex: ${patientSex || 'Unknown'}
Alcohol Use: ${alcoholUse || 'Unknown'}
Symptoms: ${symptoms || 'None provided'}

Provide your response in this exact JSON format:
{
  "simpleSummary": "string - explain in simple terms what the liver report means",
  "whatItMeans": "string - medical explanation of liver findings in plain language",
  "recommendations": ["string - actionable lifestyle and health advice items specific to liver health"],
  "warningSigns": ["string - liver-related symptoms to watch for and seek immediate care"],
  "specialistReferral": "string - what type of liver specialist to see (hepatologist/gastroenterologist)",
  "disclaimer": "string"
}

Be empathetic, clear, and actionable. Focus on:
- Liver-healthy diet recommendations
- Alcohol guidance based on assessment
- Exercise and weight management if relevant
- Medication safety for liver health
- When to seek urgent care

Always emphasize the need for professional medical consultation with a hepatologist or gastroenterologist.`;

    const response = await fetch(GEMINI_PRO_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 4096,
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Gemini API error: ${error}`);
    }

    const data = await response.json();
    const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textContent) {
      throw new Error('No content received from Gemini');
    }

    let advice;
    try {
      advice = JSON.parse(textContent);
    } catch {
      advice = {
        simpleSummary: textContent,
        whatItMeans: "Please consult a hepatologist or gastroenterologist for proper interpretation of your liver assessment.",
        recommendations: [
          "Schedule an appointment with a liver specialist",
          "Avoid alcohol until cleared by your doctor",
          "Maintain a healthy, balanced diet"
        ],
        warningSigns: [
          "Yellowing of skin or eyes (jaundice)",
          "Severe abdominal pain",
          "Unexplained fatigue or weakness"
        ],
        specialistReferral: "Consult a hepatologist or gastroenterologist",
        disclaimer: "This is AI-generated advice and not a substitute for professional medical consultation. Always seek care from qualified healthcare providers."
      };
    }

    res.json({ advice });

  } catch (err) {
    console.error('Liver advice error:', err);
    res.status(500).json({ error: err.message || 'Liver advice generation failed' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// For Vercel serverless - export handler
module.exports = app;
