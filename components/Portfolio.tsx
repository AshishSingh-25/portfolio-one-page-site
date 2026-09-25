"use client";
import { useState } from "react";
import ChatWidget from "./ChatWidget";

function ask(question = "") {
  window.dispatchEvent(new CustomEvent("portfolio:ask", { detail: question }));
}
const projects = [
  {
    id: "ai",
    number: "01",
    title: "Healthcare Claim Denial Agent",
    category: "AGENT WORKFLOWS",
    stack: ["Python", "LangGraph", "React", "FastAPI", "Streamlit"],
    description:
      "From a denied claim to a grounded next step. A stateful workflow that checks a local knowledge base before making a recommendation.",
    repo: "https://github.com/AshishSingh-25/healthcare-claim-denial-agent",
    demo: "https://claim-resolve-dun.vercel.app/",
    question:
      "How does the Healthcare Claim Denial Agent handle unknown denial codes?",
    detail:
      "A deterministic LangGraph pipeline uses seven local sample codes to explain denials and return reference actions. Streamlit and React/FastAPI interfaces share the graph. Unknown codes take a safe core fallback; the API rejects them. The active workflow uses no LLM inference or real patient integration.",
  },
  {
    id: "web",
    number: "02",
    title: "Rainbow Advertising",
    category: "FULL-STACK / WEB",
    stack: ["Django", "SQLite", "Tailwind CSS"],
    description:
      "Billboard operations, brought together. Inventory, bookings, clients, and payment records in a staff management platform.",
    repo: "https://github.com/AshishSingh-25/Rainbow_advertising",
    demo: "https://ashish25.pythonanywhere.com/",
    question: "What did he build for Rainbow Advertising?",
    detail:
      "A staff-only Django dashboard manages linked hoardings, clients, and payments in SQLite. It includes name/location search, status and area filters, 25-item pagination, and summary metrics. Tailwind and custom CSS style the templates. The PDF endpoint is a demonstration; CSV export is not implemented.",
  },
];
export default function Portfolio() {
  const [filter, setFilter] = useState("all");
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("ashish639239@gmail.com");
      setCopied(true);
      setCopyFailed(false);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyFailed(true);
    }
  }
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="site-wrap">
        <header className="site-header">
          <a className="identity" href="#" aria-label="Ashish Singh, home">
            <span className="monogram">
              as<span>.</span>
            </span>
            <span>Ashish Singh</span>
          </a>
          <nav aria-label="Main navigation">
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#contact">Contact ↗</a>
          </nav>
        </header>
        <main id="main">
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="status-dot" /> MACHINE LEARNING & SOFTWARE
              </p>
              <h1 id="hero-title">
                Turning ideas into
                <br />
                <span>working systems.</span>
              </h1>
              <p className="hero-intro">
                I’m Ashish. An ML engineer and Python developer working across
                LLMs, NLP, and AI agents—with a full-stack foundation in Django.
              </p>
              <div className="hero-actions">
                <a className="button primary" href="#work">
                  Explore my work ↓
                </a>
                <a className="button secondary" href="/api/cv" download>
                  Download CV <span className="file-format">TXT</span>
                </a>
              </div>
              <div className="hero-note">
                <span className="small-orbit" aria-hidden="true">
                  ✳
                </span>{" "}
                Currently pursuing M.Tech in AI & Data Science at IIT Patna.
              </div>
            </div>
            <aside
              className="conversation-card"
              aria-label="Explore my background"
            >
              <div className="card-topline">
                <span className="eyebrow">A DIFFERENT KIND OF INTRO</span>
                <span className="tiny-star" aria-hidden="true">
                  ✳
                </span>
              </div>
              <div className="conversation-mark" aria-hidden="true">
                <span>as</span>
                <i />
              </div>
              <h2>
                Don’t just scroll.
                <br />
                Ask a question.
              </h2>
              <p>
                Explore my projects and background through answers grounded in
                my own documents.
              </p>
              <button
                className="question-preview"
                onClick={() => ask("What has he built with LangGraph?")}
              >
                <span>What has he built with LangGraph?</span>
                <span aria-hidden="true">↗</span>
              </button>
              <div className="card-foot">
                <span className="status-dot" /> Sources you can read. Honest
                when unsure.
              </div>
            </aside>
          </section>
          <section
            id="work"
            className="work-section"
            aria-labelledby="work-title"
          >
            <div className="section-heading">
              <div>
                <p className="eyebrow section-index">01 / SELECTED WORK</p>
                <h2 id="work-title">Built to solve something.</h2>
              </div>
              <div className="filter-group" aria-label="Filter projects">
                {[
                  ["all", "All work"],
                  ["ai", "AI / Agents"],
                  ["web", "Full-stack"],
                ].map(([id, label]) => (
                  <button
                    key={id}
                    aria-pressed={filter === id}
                    onClick={() => setFilter(id)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="project-grid">
              {projects
                .filter((p) => filter === "all" || p.id === filter)
                .map((p) => (
                  <article className="project-card" key={p.id}>
                    <div
                      className={"project-visual " + p.id}
                      aria-label={
                        p.id === "ai"
                          ? "Claim analysis workflow diagram"
                          : "Billboard management modules diagram"
                      }
                    >
                      <div className="visual-label">
                        <span>
                          {p.id === "ai"
                            ? "CLAIM RESOLVE"
                            : "RAINBOW / OPERATIONS"}
                        </span>
                        <span>WORKFLOW STUDY</span>
                      </div>
                      {p.id === "ai" ? (
                        <div className="claim-flow">
                          <div className="flow-node">
                            <span>01</span>Code lookup
                          </div>
                          <span className="flow-arrow" aria-hidden="true">
                            ↓
                          </span>
                          <div className="flow-node highlighted">
                            <span>02</span>Claim analysis
                            <span className="node-dot" />
                          </div>
                          <span className="flow-arrow" aria-hidden="true">
                            ↓
                          </span>
                          <div className="flow-node">
                            <span>03</span>Next action
                          </div>
                          <div className="flow-caption">
                            Unknown code? Safe fallback.
                          </div>
                        </div>
                      ) : (
                        <div className="operations-map">
                          <div className="map-title">
                            <span className="map-icon" aria-hidden="true">
                              ▥
                            </span>{" "}
                            Billboard management
                          </div>
                          <div className="map-grid">
                            {[
                              "Inventory",
                              "Bookings",
                              "Clients",
                              "Payments",
                            ].map((s, i) => (
                              <div key={s}>
                                <span>0{i + 1}</span>
                                {s}
                              </div>
                            ))}
                          </div>
                          <div className="map-footer">
                            Search <span>·</span> Filter <span>·</span> Manage
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="project-content">
                      <div className="project-kicker">
                        <span>{p.category}</span>
                        <span>/{p.number}</span>
                      </div>
                      <h3>{p.title}</h3>
                      <p>{p.description}</p>
                      <div className="tech-tags">
                        {p.stack.map((s) => (
                          <span key={s}>{s}</span>
                        ))}
                      </div>
                      <details className="project-details">
                        <summary>
                          Inside the project <span aria-hidden="true">+</span>
                        </summary>
                        <p>{p.detail}</p>
                      </details>
                      <div className="project-links">
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Live demo of ${p.title}`}
                        >
                          Live demo ↗
                        </a>
                        <a href={p.repo} target="_blank" rel="noreferrer">
                          View repository ↗
                        </a>
                        <button onClick={() => ask(p.question)}>
                          Ask about this ↗
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
            </div>
            <p className="results-note" aria-live="polite">
              {filter === "all"
                ? "Two projects. Two different kinds of problems."
                : filter === "ai"
                  ? "Showing AI / agent work."
                  : "Showing full-stack work."}
            </p>
          </section>
          <section
            id="about"
            className="about-section"
            aria-labelledby="about-title"
          >
            <div>
              <p className="eyebrow section-index">02 / THE BACKGROUND</p>
              <h2 id="about-title">
                Python at the core.
                <br />
                <span className="muted">Curiosity across the stack.</span>
              </h2>
              <p>
                My work spans transformer-based NLP, applied machine learning,
                and Python backends. I’m building on that foundation with
                retrieval and stateful agent workflows.
              </p>
              <button
                className="text-button"
                onClick={() => ask("What are his technical skills?")}
              >
                Explore my background ↗
              </button>
            </div>
            <div className="background-list">
              <div>
                <span className="eyebrow">CURRENTLY STUDYING</span>
                <h3>IIT Patna</h3>
                <p>M.Tech · Artificial Intelligence & Data Science</p>
              </div>
              <div>
                <span className="eyebrow">TOOLBOX</span>
                <div className="tech-tags">
                  {[
                    "Python",
                    "PyTorch",
                    "LangGraph",
                    "Django",
                    "PostgreSQL",
                    "Scikit-learn",
                  ].map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <span className="eyebrow">RESEARCH</span>
                <h3>VisionVoice</h3>
                <p>
                  Image captioning research published in AIP Conference
                  Proceedings.
                </p>
                <button
                  className="text-button"
                  onClick={() =>
                    ask("Tell me about his VisionVoice publication.")
                  }
                >
                  Ask about the publication ↗
                </button>
              </div>
            </div>
          </section>
          <section
            id="contact"
            className="contact-section"
            aria-labelledby="contact-title"
          >
            <div>
              <p className="eyebrow section-index">03 / GET IN TOUCH</p>
              <h2 id="contact-title">
                Have a problem
                <br />
                worth working on?
              </h2>
            </div>
            <div className="contact-actions">
              <a className="email-link" href="mailto:ashish639239@gmail.com">
                ashish639239@gmail.com ↗
              </a>
              <div>
                <button className="text-button" onClick={copyEmail}>
                  {copied ? "Copied!" : "Copy email"}
                </button>
                <a
                  href="https://github.com/AshishSingh-25"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub ↗
                </a>
              </div>
              <p className="copy-status" role="status">
                {copyFailed
                  ? "You can select the email above to copy it."
                  : copied
                    ? "Email copied to clipboard."
                    : ""}
              </p>
            </div>
          </section>
          <ChatWidget />
        </main>
        <footer className="site-footer">
          <span>© {new Date().getFullYear()} Ashish Singh</span>
          <span>Python curiosity. Thoughtful software.</span>
          <a href="#main">Back to top ↑</a>
        </footer>
      </div>
    </>
  );
}
