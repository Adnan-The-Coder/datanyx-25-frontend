"use client";

import Link from "next/link";
import Footer from "../Footer";
import Shuffle from "@/components/landing/Shuffle";
import { useState, useEffect } from "react";

const heroStats = [
  { label: "Symptom patterns analyzed", value: "24,500+" },
  { label: "Avg. early detection window", value: "8.4 weeks" },
  { label: "Caregiver confidence boost", value: "+42%" },
];

const featureCards = [
  {
    title: "Symptom Pattern Recognition",
    description: "Track drooping eyelids, muscle weakness, swallowing difficulty, and breathing changes to detect severity shifts early.",
    badge: "Real-time",
  },
  {
    title: "Differential Diagnosis AI",
    description: "Distinguish MG from LEMS, GBS, CIDP, and early ALS using advanced pattern analysis and temporal symptom tracking.",
    badge: "Core Model",
  },
  {
    title: "Severity Alert System",
    description: "Intelligent alerts signal when symptoms escalate from stable to dangerous, enabling timely medical intervention.",
    badge: "Critical Care",
  },
];

const modules = [
  {
    title: "Symptom Monitoring Engine",
    points: ["Multi-symptom tracking", "Temporal pattern analysis", "Fluctuation detection", "Severity scoring"],
  },
  {
    title: "Neuroinformatics Intelligence",
    points: ["MG vs similar conditions", "Risk stratification", "Caregiver-friendly reports", "Evidence-based alerts"],
  },
  {
    title: "Clinical Decision Support",
    points: ["Treatment recommendations", "Similar case analysis", "Emergency escalation", "Longitudinal tracking"],
  },
];

const workflow = [
  { step: "01", title: "Symptom Data Collection", detail: "Track eyelid droop, weakness, swallowing, breathing" },
  { step: "02", title: "AI Pattern Analysis", detail: "Distinguish MG from LEMS, GBS, CIDP, ALS" },
  { step: "03", title: "Severity Assessment", detail: "Evaluate stability vs. escalation risk" },
  { step: "04", title: "Care Coordination", detail: "Alert caregivers and clinicians when needed" },
];

export function LandingPage() {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 2500); // Show for 2.5 seconds on initial load
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <Shuffle
            text="Grania AI"
            shuffleDirection="right"
            duration={0.8}
            animationMode="evenodd"
            shuffleTimes={1}
            ease="power3.out"
            stagger={0.03}
            threshold={0.1}
            triggerOnce={true}
            triggerOnHover={true}
            respectReducedMotion={true}
            className="text-white text-6xl md:text-9xl"
          />
        </div>
      )}
      <div className="landing-shell">
        <header className="landing-nav">
          <p className="logo">Grania AI</p>
          <nav>
            <Link href="/landing#modules">Modules</Link>
            <Link href="/landing#workflow">Workflow</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/admin-portal">Admin Portal</Link>
          </nav>
          <div className="nav-cta">
            <Link className="ghost-button" href="/signin">
              Sign In
            </Link>
            <Link className="primary" href="/admin-portal">
              Launch control
            </Link>
          </div>
        </header>

        <section className="landing-hero">
          <div className="hero-copy fade-in">
            <p className="eyebrow">AI-Driven Myasthenia Gravis Detection</p>
            <h1>
              Detect severity shifts before they become critical.
            </h1>
            <p className="muted">
              Myasthenia Gravis symptoms can be subtle and fluctuating, easily mistaken for aging or fatigue. 
              Grania AI's neuroinformatics platform observes symptom patterns over time, distinguishes MG from similar 
              neuromuscular conditions, and alerts caregivers when medical attention is urgently needed.
            </p>
            <div className="hero-actions">
              <Link className="primary" href="/dashboard">
                Explore Monitoring Dashboard
              </Link>
              <Link className="secondary" href="/admin-portal">
                Configure Alert System
              </Link>
            </div>
          </div>
          <div className="hero-panel fade-in fade-in-2">
            <p className="eyebrow">Problem Statement ID: 1404</p>
            <ul>
              <li>
                <span>Target</span> Elderly patients with neuromuscular symptoms
              </li>
              <li>
                <span>Challenge</span> Distinguish MG from LEMS, GBS, CIDP, ALS
              </li>
              <li>
                <span>Solution</span> AI-powered temporal pattern analysis
              </li>
            </ul>
            <p className="micro-copy">Serving neurology clinics, geriatric care, and rehab centers.</p>
          </div>
        </section>

        <section className="hero-stats">
          {heroStats.map((stat, idx) => (
            <article key={stat.label} className={`stat-card fade-in fade-in-${idx + 1}`}>
              <p className="eyebrow">{stat.label}</p>
              <h3>{stat.value}</h3>
            </article>
          ))}
        </section>

        <section className="feature-grid">
          {featureCards.map((feature, idx) => (
            <article key={feature.title} className={`feature-card fade-in fade-in-${idx + 1}`}>
              <span className="pill">{feature.badge}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </section>

        <section id="modules" className="modules-section">
          <div className="section-head">
            <p className="eyebrow">Core Neuroinformatics Modules</p>
            <h2>Comprehensive MG detection and monitoring.</h2>
          </div>
          <div className="modules-grid">
            {modules.map((module, idx) => (
              <article key={module.title} className={`module-card fade-in fade-in-${idx + 1}`}>
                <h3>{module.title}</h3>
                <ul>
                  {module.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="workflow" className="workflow-section">
          <div className="section-head">
            <p className="eyebrow">Clinical Workflow</p>
            <h2>From symptom to intervention.</h2>
          </div>
          <div className="workflow-grid">
            {workflow.map((item, idx) => (
              <article key={item.step} className={`workflow-card fade-in fade-in-${idx + 1}`}>
                <span>{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="cta-panel">
          <div>
            <p className="eyebrow">Target Audience</p>
            <h2>Built for neurology professionals and caregivers.</h2>
            <p className="muted">
              Neurology clinics, geriatric care centers, neuromuscular disorder researchers, and physiotherapy 
              & rehabilitation centers can leverage Grania AI to provide safer, more informed care for 
              elderly patients with MG and similar conditions.
            </p>
          </div>
          <div className="cta-actions">
            <Link className="primary" href="/dashboard">
              View Live Dashboard
            </Link>
            <Link className="ghost-button" href="/admin-portal">
              Configure Settings
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
