import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity,
  AlertTriangle,
  Download,
  FileText,
  HeartPulse,
  LogOut,
  Printer,
  RefreshCcw,
  ShieldCheck,
  Upload,
  UserRound,
  X,
} from "lucide-react";
import "./styles.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

async function readApiResponse(response, fallbackMessage) {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }
  const text = await response.text();
  return { error: text || fallbackMessage };
}

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("hepatoscan_token") || "");
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("hepatoscan_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [authMode, setAuthMode] = useState("signin");
  const [authForm, setAuthForm] = useState({ username: "", email: "", password: "" });
  const [authError, setAuthError] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [form, setForm] = useState({
    testType: "Liver Ultrasound",
    patientAge: "",
    patientSex: "Not specified",
    alcoholUse: "None",
    symptoms: "",
  });
  const [report, setReport] = useState(null);
  const [advice, setAdvice] = useState(null);
  const [analysisId, setAnalysisId] = useState(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const authedFetch = useMemo(() => {
    return (path, options = {}) =>
      fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Token ${token}`,
        },
      });
  }, [token]);

  function saveSession(nextToken, nextUser) {
    setToken(nextToken);
    setUser(nextUser);
    localStorage.setItem("hepatoscan_token", nextToken);
    localStorage.setItem("hepatoscan_user", JSON.stringify(nextUser));
  }

  async function submitAuth(event) {
    event.preventDefault();
    setAuthError("");
    const endpoint = authMode === "signup" ? "/auth/signup/" : "/auth/signin/";
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authForm),
    });
    const data = await readApiResponse(response, "Unable to authenticate");
    if (!response.ok) {
      setAuthError(data.error || "Unable to authenticate");
      return;
    }
    saveSession(data.token, data.user);
  }

  async function signOut() {
    if (token) {
      await authedFetch("/auth/signout/", { method: "POST" }).catch(() => {});
    }
    setToken("");
    setUser(null);
    localStorage.removeItem("hepatoscan_token");
    localStorage.removeItem("hepatoscan_user");
    resetAnalysis();
  }

  function handleFile(nextFile) {
    if (!nextFile) return;
    setFile(nextFile);
    setPreview("");
    if (nextFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => setPreview(event.target.result);
      reader.readAsDataURL(nextFile);
    }
  }

  function removeFile(event) {
    event.stopPropagation();
    setFile(null);
    setPreview("");
  }

  async function runAnalysis() {
    if (!file) return;
    setIsLoading(true);
    setError("");
    setReport(null);
    setAdvice(null);
    setStatus("Uploading liver scan to the AI backend");

    try {
      const payload = new FormData();
      payload.append("file", file);
      Object.entries(form).forEach(([key, value]) => payload.append(key, value || "Unknown"));
      payload.append("scanCategory", "liver");

      const analysisResponse = await authedFetch("/hepato-analyze/", {
        method: "POST",
        body: payload,
      });
      const analysisData = await readApiResponse(analysisResponse, "Analysis failed");
      if (!analysisResponse.ok) throw new Error(analysisData.error || "Analysis failed");

      setReport(analysisData.report);
      setAnalysisId(analysisData.analysisId);
      setStatus("Generating personalized liver-health advice");

      const adviceResponse = await authedFetch("/hepato-advice/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, report: analysisData.report, analysisId: analysisData.analysisId }),
      });
      const adviceData = await readApiResponse(adviceResponse, "Advice generation failed");
      if (!adviceResponse.ok) throw new Error(adviceData.error || "Advice generation failed");
      setAdvice(adviceData.advice);
      setStatus("");
    } catch (caught) {
      setError(caught.message);
      setStatus("");
    } finally {
      setIsLoading(false);
    }
  }

  function resetAnalysis() {
    setFile(null);
    setPreview("");
    setReport(null);
    setAdvice(null);
    setAnalysisId(null);
    setStatus("");
    setError("");
  }

  function downloadJson() {
    const blob = new Blob(
      [
        JSON.stringify(
          { analysisId, report, advice, patient: form, generatedAt: new Date().toISOString() },
          null,
          2,
        ),
      ],
      { type: "application/json" },
    );
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `hepatoscan-report-${Date.now()}.json`;
    link.click();
  }

  if (!token) {
    return (
      <main className="auth-shell">
        <section className="auth-panel">
          <div className="brand-mark">
            <HeartPulse size={28} />
            <div>
              <strong>HepatoScan AI</strong>
              <span>Clinical liver assessment workspace</span>
            </div>
          </div>
          <form className="auth-form" onSubmit={submitAuth}>
            <h1>{authMode === "signup" ? "Create account" : "Sign in"}</h1>
            <p>Secure access is required before analyzing scans or saving reports.</p>
            <label>
              Username
              <input
                value={authForm.username}
                onChange={(event) => setAuthForm({ ...authForm, username: event.target.value })}
                required
              />
            </label>
            {authMode === "signup" && (
              <label>
                Email
                <input
                  type="email"
                  value={authForm.email}
                  onChange={(event) => setAuthForm({ ...authForm, email: event.target.value })}
                  required
                />
              </label>
            )}
            <label>
              Password
              <input
                type="password"
                value={authForm.password}
                onChange={(event) => setAuthForm({ ...authForm, password: event.target.value })}
                required
              />
            </label>
            {authError && <div className="error-box">{authError}</div>}
            <button type="submit" className="primary-button">
              <ShieldCheck size={18} />
              {authMode === "signup" ? "Sign up" : "Sign in"}
            </button>
          </form>
          <button
            type="button"
            className="link-button"
            onClick={() => {
              setAuthMode(authMode === "signup" ? "signin" : "signup");
              setAuthError("");
            }}
          >
            {authMode === "signup" ? "Already have an account? Sign in" : "Need an account? Sign up"}
          </button>
        </section>
      </main>
    );
  }

  return (
    <>
      <header className="app-header">
        <div className="brand-mark">
          <HeartPulse size={28} />
          <div>
            <strong>HepatoScan AI</strong>
            <span>Render Django + Vercel React</span>
          </div>
        </div>
        <div className="user-pill">
          <UserRound size={16} />
          <span>{user?.username}</span>
          <button type="button" onClick={signOut} title="Sign out">
            <LogOut size={16} />
          </button>
        </div>
      </header>

      <main className="app-shell">
        <section className="hero">
          <div>
            <p className="eyebrow">AI liver health analyzer</p>
            <h1>Analyze liver scans and generate patient-friendly guidance.</h1>
          </div>
          <div className="hero-stats">
            <span>CT</span>
            <span>MRI</span>
            <span>Ultrasound</span>
            <span>FibroScan</span>
            <span>LFT reports</span>
          </div>
        </section>

        <section className="workspace">
          <div className="panel">
            <div className="panel-title">
              <Upload size={18} />
              Upload liver scan or report
            </div>
            <div
              className="upload-zone"
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                handleFile(event.dataTransfer.files[0]);
              }}
            >
              <input type="file" accept="image/*,.pdf" onChange={(event) => handleFile(event.target.files[0])} />
              {preview ? (
                <div className="preview-wrap">
                  <img src={preview} alt="Uploaded scan preview" />
                  <button type="button" onClick={removeFile} title="Remove file">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <Upload size={42} />
                  <strong>{file ? file.name : "Drop file here or click to browse"}</strong>
                  <span>JPG, PNG, WEBP, TIFF, or PDF up to 20 MB</span>
                </>
              )}
            </div>

            <div className="form-grid">
              <label>
                Scan type
                <select value={form.testType} onChange={(event) => setForm({ ...form, testType: event.target.value })}>
                  <option>Liver CT</option>
                  <option>Liver MRI</option>
                  <option>Liver Ultrasound</option>
                  <option>FibroScan</option>
                  <option>Liver Function Test</option>
                  <option>HBV DNA Test</option>
                  <option>HCV RNA Test</option>
                  <option>AFP Test</option>
                  <option>Liver Biopsy Report</option>
                </select>
              </label>
              <label>
                Patient age
                <input
                  type="number"
                  min="0"
                  max="120"
                  value={form.patientAge}
                  onChange={(event) => setForm({ ...form, patientAge: event.target.value })}
                />
              </label>
              <label>
                Patient sex
                <select value={form.patientSex} onChange={(event) => setForm({ ...form, patientSex: event.target.value })}>
                  <option>Not specified</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </label>
              <label>
                Alcohol use
                <select value={form.alcoholUse} onChange={(event) => setForm({ ...form, alcoholUse: event.target.value })}>
                  <option>None</option>
                  <option>Occasional</option>
                  <option>Regular</option>
                  <option>Heavy</option>
                </select>
              </label>
              <label className="wide">
                Symptoms or clinical notes
                <textarea
                  value={form.symptoms}
                  onChange={(event) => setForm({ ...form, symptoms: event.target.value })}
                  placeholder="Fatigue, abdominal pain, jaundice, hepatitis history, medications..."
                />
              </label>
            </div>

            <button type="button" className="primary-button" disabled={!file || isLoading} onClick={runAnalysis}>
              <Activity size={18} />
              {isLoading ? "Analyzing..." : "Analyze liver scan"}
            </button>
            {status && <div className="status-line">{status}</div>}
            {error && <div className="error-box">{error}</div>}
          </div>

          <Results report={report} advice={advice} onPrint={() => window.print()} onDownload={downloadJson} onReset={resetAnalysis} />
        </section>
      </main>
    </>
  );
}

function Results({ report, advice, onPrint, onDownload, onReset }) {
  if (!report) {
    return (
      <aside className="panel empty-state">
        <FileText size={44} />
        <h2>Report workspace</h2>
        <p>Your structured assessment and patient guidance will appear here after analysis.</p>
      </aside>
    );
  }

  const severity = (report.severity || "normal").toLowerCase();
  const findings = Array.isArray(report.findings) ? report.findings : [];
  const conditions = Array.isArray(report.possibleConditions) ? report.possibleConditions : [];
  const recommendations = Array.isArray(advice?.recommendations) ? advice.recommendations : [];
  const warnings = Array.isArray(advice?.warningSigns) ? advice.warningSigns : [];

  return (
    <aside className="results-stack">
      <section className="panel">
        <div className="panel-title">
          <FileText size={18} />
          Liver health assessment
        </div>
        <span className={`severity-badge ${severity}`}>{report.severity || "Normal"}</span>
        <div className="meta-grid">
          <InfoBlock label="Assessment title" value={report.reportTitle || "Liver Health Assessment"} />
          <InfoBlock label="Scan quality" value={report.scanQuality || "Assessed"} />
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Observation</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {findings.length ? (
                findings.map((finding, index) => (
                  <tr key={`${finding.parameter}-${index}`}>
                    <td>{finding.parameter || "General"}</td>
                    <td>{finding.observation || "-"}</td>
                    <td>{finding.status || "Normal"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No specific findings listed.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <InfoBlock label="Clinical impression" value={report.impression || "-"} />
        <InfoBlock label="Recommended follow-up" value={report.recommendedFollowUp || "-"} />
        <InfoBlock label="Limitations" value={report.limitations || "-"} tone="warn" />
        <div className="tag-list">
          {conditions.length ? conditions.map((condition) => <span key={condition}>{condition}</span>) : <span>None specified</span>}
        </div>
      </section>

      {advice && (
        <section className="panel">
          <div className="panel-title">
            <HeartPulse size={18} />
            Patient guidance
          </div>
          <InfoBlock label="Plain-language summary" value={advice.simpleSummary || "-"} tone="good" />
          <InfoBlock label="What this means" value={advice.whatItMeans || "-"} />
          <div className="advice-grid">
            {recommendations.map((item, index) => (
              <div className="advice-item" key={`${item}-${index}`}>
                <span>{index + 1}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
          <div className="warning-list">
            {warnings.length ? (
              warnings.map((warning) => (
                <div key={warning}>
                  <AlertTriangle size={16} />
                  {warning}
                </div>
              ))
            ) : (
              <div>No immediate warning signs identified.</div>
            )}
          </div>
          <InfoBlock label="Specialist referral" value={advice.specialistReferral || "Consult a hepatologist or gastroenterologist."} />
          <p className="disclaimer">{advice.disclaimer || "AI-generated information is not a substitute for professional medical care."}</p>
        </section>
      )}

      <div className="actions">
        <button type="button" onClick={onPrint}>
          <Printer size={16} />
          Print
        </button>
        <button type="button" onClick={onDownload}>
          <Download size={16} />
          JSON
        </button>
        <button type="button" onClick={onReset}>
          <RefreshCcw size={16} />
          New scan
        </button>
      </div>
    </aside>
  );
}

function InfoBlock({ label, value, tone = "" }) {
  return (
    <div className={`info-block ${tone}`}>
      <span>{label}</span>
      <p>{value}</p>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
