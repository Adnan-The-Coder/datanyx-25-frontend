export const overviewMetrics = [
  { label: "Active MG Patients", value: "247", sub: "18 new this month" },
  { label: "Critical Symptoms", value: "12", sub: "Requiring intervention" },
  { label: "Pattern Analyses (24h)", value: "1,247", sub: "↑12% vs yesterday" },
  { label: "Active Neurologists", value: "34", sub: "Caregivers: 89" },
  { label: "Early Detections", value: "23", sub: "Avg 8.4 weeks early" },
];

export const loadGauges = [
  { label: "MG Detection Accuracy", percent: 94, tone: "stable" as const },
  { label: "Differential Diagnosis", percent: 92, tone: "stable" as const },
  { label: "Severity Predictor", percent: 89, tone: "high" as const },
];

export const inflowWindows = [
  { label: "Next 6 hours", value: 34, confidence: "0.94", severity: "Mild symptom fluctuation" },
  { label: "24 hours", value: 127, confidence: "0.91", severity: "Moderate escalation risk" },
  { label: "7 days", value: 412, confidence: "0.87", severity: "Seasonal pattern shift" },
  { label: "30 days", value: 1580, confidence: "0.82", severity: "Treatment response tracking" },
];

export const severityMix = [
  { label: "Myasthenic Crisis", percent: 8 },
  { label: "Severe Symptoms", percent: 22 },
  { label: "Moderate Symptoms", percent: 48 },
  { label: "Mild/Stable", percent: 22 },
];

export const wards = [
  { name: "Ptosis (Eyelid Droop)", current: 68, forecast24: 74, forecast72: 82, forecast168: 65 },
  { name: "Muscle Weakness", current: 82, forecast24: 88, forecast72: 95, forecast168: 78 },
  { name: "Dysphagia (Swallowing)", current: 45, forecast24: 51, forecast72: 58, forecast168: 43 },
  { name: "Respiratory Distress", current: 12, forecast24: 14, forecast72: 18, forecast168: 11 },
];

export const staffing = {
  recommended: [
    { dept: "Neurology Clinic", doctors: 12, nurses: 28, rationale: "Increased MG assessments" },
    { dept: "Geriatric Care", doctors: 8, nurses: 24, rationale: "Elderly patient monitoring" },
    { dept: "Physiotherapy", doctors: 6, nurses: 14, rationale: "Rehab program expansion" },
  ],
  understaffed: [
    { dept: "Neuromuscular Lab", gap: "2 Technicians", note: "EMG testing backlog" },
    { dept: "Research Unit", gap: "1 Data Scientist", note: "Pattern analysis delay" },
  ],
  adjustments: [
    "Add evening neurology clinic hours for working caregivers",
    "Assign dedicated MG coordinator for crisis management",
    "Schedule weekly multidisciplinary team meetings",
  ],
};

export const equipmentHeatmap = [
  { label: "EMG Testing Units", load: 0.78 },
  { label: "Respiratory Monitors", load: 0.62 },
  { label: "Edrophonium Test Kits", load: 0.54 },
  { label: "AChR Antibody Tests", load: 0.71 },
  { label: "Spirometry Equipment", load: 0.48 },
  { label: "Video Swallow Studies", load: 0.58 },
];

export const predictiveForecasts = [
  {
    title: "Symptom Severity Forecast",
    horizon: "Next 7 days",
    confidence: "0.89",
    highlight: "3 patients at escalation risk",
  },
  {
    title: "Treatment Response Prediction",
    horizon: "Next 14 days",
    confidence: "0.86",
    highlight: "12 patients showing improvement",
  },
  {
    title: "Crisis Risk Assessment",
    horizon: "Next 30 days",
    confidence: "0.91",
    highlight: "2 high-risk patients identified",
  },
];

export const alerts = [
  { label: "Respiratory decline detected", type: "🔥", window: "Patient #1847", note: "Immediate neurologist consult" },
  { label: "Medication non-compliance", type: "⚠️", window: "3 patients", note: "Caregiver outreach needed" },
  { label: "Seasonal symptom worsening", type: "⚠️", window: "Next 2 weeks", note: "Cold weather impact" },
  { label: "New LEMS case suspected", type: "🔥", window: "Patient #2103", note: "Differential diagnosis required" },
];

export const simulations = [
  {
    scenario: "Myasthenic Crisis Surge",
    impact: ["ICU capacity +4 beds needed", "Plasmapheresis scheduling", "24/7 neurology coverage"],
  },
  {
    scenario: "Diagnostic Equipment Failure",
    impact: ["Refer EMG tests to partner facility", "Delay non-urgent assessments", "Expedite equipment repair"],
  },
  {
    scenario: "Specialist Shortage",
    impact: ["Telemedicine consultations", "Extended appointment intervals", "Prioritize crisis cases"],
  },
];

export const historyInsights = [
  { label: "Peak symptom hours", detail: "Morning (6-10 AM) and evening (6-9 PM)", delta: "+18%" },
  { label: "Differential diagnosis trends", detail: "MG vs LEMS accuracy improved", delta: "+6% this quarter" },
  { label: "Early detection success", detail: "Average 8.4 weeks before crisis", delta: "Best in 2 years" },
];

export const adminSettings = [
  { label: "Severity Alert Threshold", value: "75%", description: "Trigger caregiver notification" },
  { label: "Pattern Analysis Interval", value: "Every 10 min", description: "Real-time symptom tracking" },
  { label: "Clinical Roles", value: "12 neurologists • 34 caregivers", description: "Manage access permissions" },
];

export const roleMatrix = [
  { role: "Neurologist", access: "Full clinical data + AI insights" },
  { role: "Geriatric Specialist", access: "Patient monitoring + alerts" },
  { role: "Caregiver", access: "Symptom tracking + reports" },
  { role: "Researcher", access: "Anonymized data + analytics" },
];

export const gaugeClass = (tone: string) => {
  if (tone === "high") return "gauge high";
  if (tone === "stable") return "gauge stable";
  return "gauge";
};

export const severityClass = (percent: number) => {
  if (percent >= 70) return "heat high";
  if (percent >= 40) return "heat medium";
  return "heat low";
};


