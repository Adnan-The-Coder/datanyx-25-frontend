import { predictiveForecasts } from "@/components/dashboard/tabs/data";

export function PredictionsTab() {
  return (
    <section className="grid tri fade-in">
      {predictiveForecasts.map((forecast, idx) => (
        <article key={forecast.title} className={`card fade-in fade-in-${idx + 1}`}>
          <p className="eyebrow">{forecast.horizon}</p>
          <h3>{forecast.title}</h3>
          <p className="muted">{forecast.highlight}</p>
          <div className="confidence">
            Confidence <strong>{forecast.confidence}</strong>
          </div>
        </article>
      ))}
    </section>
  );
}


