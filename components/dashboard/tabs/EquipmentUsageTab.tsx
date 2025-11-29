import { equipmentHeatmap, severityClass } from "@/components/dashboard/tabs/data";

export function EquipmentUsageTab() {
  return (
    <section className="card fade-in">
      <header className="section-head">
        <p className="eyebrow">Critical assets</p>
        <h3>Usage heatmap</h3>
      </header>
      <div className="heatmap">
        {equipmentHeatmap.map((item, idx) => (
          <div
            key={item.label}
            className={`heat-card ${severityClass(item.load * 100)} fade-in fade-in-${idx + 1}`}
          >
            <p>{item.label}</p>
            <strong>{Math.round(item.load * 100)}%</strong>
            <span>{item.load >= 0.7 ? "High" : item.load >= 0.5 ? "Watch" : "Healthy"}</span>
          </div>
        ))}
      </div>
    </section>
  );
}


