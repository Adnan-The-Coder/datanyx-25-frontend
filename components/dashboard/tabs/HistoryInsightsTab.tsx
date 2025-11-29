import { historyInsights } from "@/components/dashboard/tabs/data";

export function HistoryInsightsTab() {
  return (
    <section className="grid tri fade-in">
      {historyInsights.map((item, idx) => (
        <article key={item.label} className={`card fade-in fade-in-${idx + 1}`}>
          <p className="eyebrow">{item.label}</p>
          <h3>{item.detail}</h3>
          <p className="muted">{item.delta}</p>
          <div className="trendline">
            <span />
          </div>
        </article>
      ))}
    </section>
  );
}


