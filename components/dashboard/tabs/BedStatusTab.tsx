import { wards } from "@/components/dashboard/tabs/data";

export function BedStatusTab() {
  return (
    <section className="card fade-in">
      <header className="section-head">
        <div>
          <p className="eyebrow">Symptom Type Analysis</p>
          <h3>Prevalence & Forecast by Symptom</h3>
        </div>
      </header>
      <div className="table">
        <div className="table-head">
          <span>Symptom Type</span>
          <span>Current</span>
          <span>24h</span>
          <span>3 days</span>
          <span>7 days</span>
        </div>
        {wards.map((ward, idx) => (
          <div key={ward.name} className={`table-row fade-in fade-in-${idx + 1}`}>
            <span>{ward.name}</span>
            <span>{ward.current}%</span>
            <span>{ward.forecast24}%</span>
            <span>{ward.forecast72}%</span>
            <span>{ward.forecast168}%</span>
          </div>
        ))}
      </div>
    </section>
  );
}


