import { alerts } from "@/components/dashboard/tabs/data";

export function AlertsSurgesTab() {
  return (
    <section className="card fade-in">
      <header className="section-head">
        <p className="eyebrow">Situational awareness</p>
        <h3>Upcoming events</h3>
      </header>
      <div className="stack">
        {alerts.map((alert, idx) => (
          <div key={alert.label} className={`alert-banner fade-in fade-in-${idx + 1}`}>
            <span className="badge">{alert.type}</span>
            <div>
              <p>{alert.label}</p>
              <small>{alert.note}</small>
            </div>
            <p className="muted">{alert.window}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


