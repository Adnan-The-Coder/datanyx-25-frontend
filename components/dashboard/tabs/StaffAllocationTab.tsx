import { staffing } from "@/components/dashboard/tabs/data";

export function StaffAllocationTab() {
  return (
    <section className="grid tri fade-in">
      <article className="card">
        <header className="section-head">
          <p className="eyebrow">Optimizer</p>
          <h3>Recommended staffing</h3>
        </header>
        <div className="stack">
          {staffing.recommended.map((rec) => (
            <div key={rec.dept} className="recommendation fade-in fade-in-1">
              <strong>{rec.dept}</strong>
              <p>
                {rec.doctors} doctors · {rec.nurses} nurses
              </p>
              <small>{rec.rationale}</small>
            </div>
          ))}
        </div>
      </article>
      <article className="card">
        <header className="section-head">
          <p className="eyebrow">Attention</p>
          <h3>Understaffed</h3>
        </header>
        <div className="stack">
          {staffing.understaffed.map((item) => (
            <div key={item.dept} className="alert-row fade-in fade-in-2">
              <p>{item.dept}</p>
              <small>{item.gap}</small>
              <span>{item.note}</span>
            </div>
          ))}
        </div>
      </article>
      <article className="card">
        <header className="section-head">
          <p className="eyebrow">Shift adjustments</p>
          <h3>Suggested moves</h3>
        </header>
        <ul className="simple-list">
          {staffing.adjustments.map((adj) => (
            <li key={adj} className="fade-in fade-in-3">
              {adj}
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}


