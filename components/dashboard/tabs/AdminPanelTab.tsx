import { adminSettings, roleMatrix } from "@/components/dashboard/tabs/data";

export function AdminPanelTab() {
  return (
    <section className="grid two fade-in">
      <article className="card">
        <header className="section-head">
          <p className="eyebrow">System settings</p>
          <h3>Controls</h3>
        </header>
        <div className="stack">
          {adminSettings.map((setting, idx) => (
            <div key={setting.label} className={`setting-row fade-in fade-in-${idx + 1}`}>
              <div>
                <p>{setting.label}</p>
                <small>{setting.description}</small>
              </div>
              <button className="ghost-button">{setting.value}</button>
            </div>
          ))}
        </div>
      </article>
      <article className="card">
        <header className="section-head">
          <p className="eyebrow">Role management</p>
          <h3>Access tiers</h3>
        </header>
        <div className="stack">
          {roleMatrix.map((role, idx) => (
            <div key={role.role} className={`role-row fade-in fade-in-${idx + 2}`}>
              <p>{role.role}</p>
              <span>{role.access}</span>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}


