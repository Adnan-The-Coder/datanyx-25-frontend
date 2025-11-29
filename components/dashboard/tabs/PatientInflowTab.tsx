import { inflowWindows, severityMix } from "@/components/dashboard/tabs/data";

export function PatientInflowTab() {
  return (
    <section className="split two fade-in">
      <div className="card">
        <header className="section-head">
          <div>
            <p className="eyebrow">Symptom Pattern Forecasts</p>
            <h3>Symptom Progression Predictions</h3>
          </div>
        </header>
        <div className="stack">
          {inflowWindows.map((window, idx) => (
            <div key={window.label} className={`forecast-row fade-in fade-in-${idx + 1}`}>
              <div>
                <p className="eyebrow">{window.label}</p>
                <p className="forecast-value">{window.value} patients</p>
              </div>
              <div className="forecast-meta">
                <p>Confidence: {window.confidence}</p>
                <span>{window.severity}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <header className="section-head">
          <div>
            <p className="eyebrow">Symptom Severity Distribution</p>
            <h3>MG Patient Composition</h3>
          </div>
        </header>
        <div className="severity-chart">
          {severityMix.map((item, idx) => (
            <div key={item.label} className={`fade-in fade-in-${idx + 2}`}>
              <p>{item.label}</p>
              <div className="bar">
                <span style={{ width: `${item.percent}%` }} />
              </div>
              <small>{item.percent}%</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


