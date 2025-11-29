import { overviewMetrics, loadGauges, gaugeClass } from "@/components/dashboard/tabs/data";

export function OverviewTab() {
  return (
    <>
      <section className="grid cards five">
        {overviewMetrics.map((metric, idx) => (
          <article
            key={metric.label}
            className={`card metric-card fade-in fade-in-${idx + 1}`}
          >
            <p className="eyebrow">{metric.label}</p>
            <h2>{metric.value}</h2>
            <p className="muted">{metric.sub}</p>
          </article>
        ))}
      </section>
      <section className="grid gauges fade-in fade-in-4">
        {loadGauges.map((gauge, idx) => (
          <article
            key={gauge.label}
            className={`card gauge-card fade-in fade-in-${idx + 5}`}
          >
            <p className="eyebrow">{gauge.label}</p>
            <div className={gaugeClass(gauge.tone)}>
              <span style={{ width: `${gauge.percent}%` }} />
              <strong>{gauge.percent}%</strong>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}


