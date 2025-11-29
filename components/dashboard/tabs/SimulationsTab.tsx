import { simulations } from "@/components/dashboard/tabs/data";

export function SimulationsTab() {
  return (
    <section className="grid tri fade-in">
      {simulations.map((sim, idx) => (
        <article key={sim.scenario} className={`card fade-in fade-in-${idx + 1}`}>
          <p className="eyebrow">What-if</p>
          <h3>{sim.scenario}</h3>
          <ul className="simple-list">
            {sim.impact.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <button className="secondary full-width">Generate playbook</button>
        </article>
      ))}
    </section>
  );
}


