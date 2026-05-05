const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();
const upload = multer({ limits: { fileSize: 20 * 1024 * 1024 } });

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_VISION_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
const GEMINI_PRO_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`;

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Analyze endpoint
app.post('/api/analyse', upload.single('file'), async (req, res) => {
  try {
    const { testType, patientAge, patientSex, symptoms } = req.body;
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

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
  "findings": [{"region": "string", "observation": "string", "severity": "normal|mild|moderate|severe"}],
  "impression": "string",
  "differentialDiagnosis": ["string"],
  "recommendedFollowUp": "string",
  "limitations": "string"
}`;

    const response = await fetch(GEMINI_VISION_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }, { inline_data: { mime_type: mimeType, data: base64Data } }] }],
        generationConfig: { temperature: 0.2, maxOutputTokens: 4096, responseMimeType: "application/json" }
      })
    });

    if (!response.ok) throw new Error(`Gemini API error: ${await response.text()}`);
    
    const data = await response.json();
    const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textContent) throw new Error('No content received');

    let report;
    try { report = JSON.parse(textContent); } 
    catch { report = { reportTitle: "Medical Imaging Report", urgency: "routine", scanQuality: "Assessed", findings: [{ region: "General", observation: textContent, severity: "normal" }], impression: textContent, differentialDiagnosis: [], recommendedFollowUp: "Consult healthcare provider", limitations: "AI-generated" }; }

    res.json({ report });
  } catch (err) {
    console.error('Analysis error:', err);
    res.status(500).json({ error: err.message || 'Analysis failed' });
  }
});

// Advice endpoint
app.post('/api/advice', async (req, res) => {
  try {
    const { report, patientAge, patientSex, symptoms } = req.body;

    const prompt = `You are a compassionate medical advisor. Based on the following radiologist report, provide personalized patient advice.
Radiologist Report: ${JSON.stringify(report, null, 2)}
Patient Age: ${patientAge || 'Unknown'}
Patient Sex: ${patientSex || 'Unknown'}
Symptoms: ${symptoms || 'None provided'}

Provide your response in this exact JSON format:
{
  "simpleSummary": "string",
  "whatItMeans": "string",
  "recommendations": ["string"],
  "redFlags": ["string"],
  "specialistReferral": "string",
  "disclaimer": "string"
}`;

    const response = await fetch(GEMINI_PRO_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.3, maxOutputTokens: 4096, responseMimeType: "application/json" }
      })
    });

    if (!response.ok) throw new Error(`Gemini API error: ${await response.text()}`);

    const data = await response.json();
    const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textContent) throw new Error('No content received');

    let advice;
    try { advice = JSON.parse(textContent); }
    catch { advice = { simpleSummary: textContent, whatItMeans: "Consult your doctor", recommendations: ["Schedule follow-up"], redFlags: [], specialistReferral: "Primary care physician", disclaimer: "AI-generated, not medical advice" }; }

    res.json({ advice });
  } catch (err) {
    console.error('Advice error:', err);
    res.status(500).json({ error: err.message || 'Advice failed' });
  }
});

// Hepato analyze endpoint
app.post('/api/hepato-analyze', upload.single('file'), async (req, res) => {
  try {
    const { testType, patientAge, patientSex, symptoms, alcoholUse } = req.body;
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const base64Data = file.buffer.toString('base64');
    const mimeType = file.mimetype;

    const prompt = `You are an expert hepatologist. Analyze this liver scan and provide structured assessment.
Test Type: ${testType || 'Unknown'}
Patient Age: ${patientAge || 'Unknown'}
Alcohol Use: ${alcoholUse || 'Unknown'}
Symptoms: ${symptoms || 'None'}

Provide JSON format:
{
  "reportTitle": "Liver Health Assessment Report",
  "severity": "normal|mild|moderate|severe",
  "scanQuality": "string",
  "findings": [{"parameter": "string", "observation": "string", "status": "normal|mild|moderate|severe"}],
  "impression": "string",
  "possibleConditions": ["string"],
  "recommendedFollowUp": "string",
  "limitations": "string"
}`;

    const response = await fetch(GEMINI_VISION_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }, { inline_data: { mime_type: mimeType, data: base64Data } }] }],
        generationConfig: { temperature: 0.2, maxOutputTokens: 4096, responseMimeType: "application/json" }
      })
    });

    if (!response.ok) throw new Error(`Gemini API error: ${await response.text()}`);

    const data = await response.json();
    const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textContent) throw new Error('No content received');

    let report;
    try { report = JSON.parse(textContent); }
    catch { report = { reportTitle: "Liver Health Assessment", severity: "normal", scanQuality: "Assessed", findings: [{ parameter: "General", observation: textContent, status: "normal" }], impression: textContent, possibleConditions: [], recommendedFollowUp: "Consult hepatologist", limitations: "AI-generated" }; }

    res.json({ report });
  } catch (err) {
    console.error('Liver analysis error:', err);
    res.status(500).json({ error: err.message || 'Analysis failed' });
  }
});

// Hepato advice endpoint
app.post('/api/hepato-advice', async (req, res) => {
  try {
    const { report, patientAge, patientSex, symptoms, alcoholUse } = req.body;

    const prompt = `You are a hepatology specialist. Provide liver health advice.
Liver Report: ${JSON.stringify(report, null, 2)}
Patient Age: ${patientAge || 'Unknown'}
Alcohol Use: ${alcoholUse || 'Unknown'}
Symptoms: ${symptoms || 'None'}

Provide JSON format:
{
  "simpleSummary": "string",
  "whatItMeans": "string",
  "recommendations": ["string"],
  "warningSigns": ["string"],
  "specialistReferral": "string",
  "disclaimer": "string"
}`;

    const response = await fetch(GEMINI_PRO_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.3, maxOutputTokens: 4096, responseMimeType: "application/json" }
      })
    });

    if (!response.ok) throw new Error(`Gemini API error: ${await response.text()}`);

    const data = await response.json();
    const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textContent) throw new Error('No content received');

    let advice;
    try { advice = JSON.parse(textContent); }
    catch { advice = { simpleSummary: textContent, whatItMeans: "Consult hepatologist", recommendations: ["See liver specialist"], warningSigns: [], specialistReferral: "Hepatologist or Gastroenterologist", disclaimer: "AI-generated, not medical advice" }; }

    res.json({ advice });
  } catch (err) {
    console.error('Liver advice error:', err);
    res.status(500).json({ error: err.message || 'Advice failed' });
  }
});

module.exports = app;
