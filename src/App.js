import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0D0D0D;
    --cream: #F7F4EF;
    --rust: #C84B31;
    --gold: #C9A84C;
    --mist: #E8E4DD;
    --slate: #4A4A4A;
    --soft: #F0EDE8;
  }

  body { background: var(--cream); font-family: 'DM Sans', sans-serif; }

  .shell {
    min-height: 100vh;
    background: var(--cream);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 1rem 4rem;
  }

  .brand-strip {
    width: 100%;
    max-width: 640px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2.5rem;
  }

  .brand-name {
    font-family: 'Playfair Display', serif;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--ink);
    letter-spacing: -0.02em;
  }

  .brand-name span { color: var(--rust); }

  .issue-tag {
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--slate);
    background: var(--mist);
    padding: 4px 10px;
    border-radius: 100px;
  }

  /* Track selector */
  .track-screen {
    width: 100%;
    max-width: 640px;
  }

  .track-headline {
    font-family: 'Playfair Display', serif;
    font-size: 2rem;
    font-weight: 700;
    color: var(--ink);
    line-height: 1.25;
    margin-bottom: 0.6rem;
    letter-spacing: -0.03em;
  }

  .track-sub {
    font-size: 0.95rem;
    color: var(--slate);
    line-height: 1.7;
    margin-bottom: 2rem;
    font-weight: 300;
  }

  .track-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .track-card {
    background: #fff;
    border: 1.5px solid var(--mist);
    border-radius: 12px;
    padding: 1.5rem 1.25rem;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
  }

  .track-card:hover {
    border-color: var(--rust);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(200, 75, 49, 0.08);
  }

  .track-card.selected {
    border-color: var(--rust);
    background: #FDF5F3;
  }

  .track-icon {
    font-size: 1.75rem;
    margin-bottom: 0.75rem;
    display: block;
  }

  .track-title {
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    font-weight: 600;
    color: var(--ink);
    margin-bottom: 0.4rem;
  }

  .track-desc {
    font-size: 0.78rem;
    color: var(--slate);
    line-height: 1.6;
    font-weight: 300;
  }

  /* Progress bar */
  .progress-wrap {
    width: 100%;
    max-width: 640px;
    margin-bottom: 2rem;
  }

  .progress-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .progress-label {
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--slate);
  }

  .progress-count {
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--rust);
  }

  .progress-track {
    height: 3px;
    background: var(--mist);
    border-radius: 100px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: var(--rust);
    border-radius: 100px;
    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Question card */
  .q-card {
    width: 100%;
    max-width: 640px;
    background: #fff;
    border-radius: 16px;
    border: 1px solid var(--mist);
    padding: 2rem;
    margin-bottom: 1.25rem;
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  }

  .q-number {
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--rust);
    margin-bottom: 0.6rem;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .q-number::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--mist);
    display: block;
  }

  .q-text {
    font-family: 'Playfair Display', serif;
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--ink);
    line-height: 1.45;
    margin-bottom: 1.25rem;
    letter-spacing: -0.02em;
  }

  .q-hint {
    font-size: 0.78rem;
    color: var(--slate);
    font-style: italic;
    margin-top: -0.75rem;
    margin-bottom: 1rem;
    font-weight: 300;
  }

  /* Option types */
  .options-list {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .opt {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0.7rem 1rem;
    border: 1.5px solid var(--mist);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.15s ease;
    background: var(--soft);
    font-size: 0.9rem;
    color: var(--ink);
    font-weight: 400;
    user-select: none;
  }

  .opt:hover { border-color: var(--rust); background: #FDF5F3; }

  .opt.selected {
    border-color: var(--rust);
    background: #FDF5F3;
    font-weight: 500;
  }

  .opt-dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid var(--mist);
    flex-shrink: 0;
    transition: all 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .opt.selected .opt-dot {
    border-color: var(--rust);
    background: var(--rust);
  }

  .opt-dot-inner {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #fff;
  }

  /* Checkbox variant */
  .opt-box {
    width: 16px;
    height: 16px;
    border-radius: 4px;
    border: 2px solid var(--mist);
    flex-shrink: 0;
    transition: all 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    color: #fff;
  }

  .opt.selected .opt-box {
    border-color: var(--rust);
    background: var(--rust);
  }

  /* Chips */
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .chip {
    padding: 0.45rem 0.9rem;
    border: 1.5px solid var(--mist);
    border-radius: 100px;
    font-size: 0.82rem;
    cursor: pointer;
    transition: all 0.15s;
    background: var(--soft);
    color: var(--ink);
    font-weight: 400;
    user-select: none;
  }

  .chip:hover { border-color: var(--rust); }
  .chip.selected { border-color: var(--rust); background: var(--rust); color: #fff; font-weight: 500; }

  /* Open text */
  .open-input {
    width: 100%;
    border: 1.5px solid var(--mist);
    border-radius: 8px;
    padding: 0.85rem 1rem;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    color: var(--ink);
    background: var(--soft);
    resize: none;
    min-height: 80px;
    transition: border-color 0.15s;
    outline: none;
    line-height: 1.6;
  }

  .open-input:focus { border-color: var(--rust); background: #fff; }
  .open-input::placeholder { color: #aaa; font-style: italic; }

  /* Nav buttons */
  .nav-row {
    width: 100%;
    max-width: 640px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .btn {
    padding: 0.75rem 1.75rem;
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    border: none;
    transition: all 0.15s;
  }

  .btn-ghost {
    background: transparent;
    color: var(--slate);
    border: 1.5px solid var(--mist);
  }

  .btn-ghost:hover { border-color: var(--slate); }

  .btn-primary {
    background: var(--rust);
    color: #fff;
    flex: 1;
    max-width: 220px;
  }

  .btn-primary:hover { background: #B03D25; transform: translateY(-1px); }
  .btn-primary:disabled { background: var(--mist); color: #aaa; cursor: not-allowed; transform: none; }

  .btn-start {
    background: var(--rust);
    color: #fff;
    padding: 0.85rem 2rem;
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    border: none;
    width: 100%;
    transition: all 0.15s;
    margin-top: 0.5rem;
  }

  .btn-start:hover { background: #B03D25; transform: translateY(-1px); }
  .btn-start:disabled { background: var(--mist); color: #aaa; cursor: not-allowed; transform: none; }

  /* Thank you screen */
  .thankyou {
    width: 100%;
    max-width: 640px;
    text-align: center;
    padding: 3rem 2rem;
    background: #fff;
    border-radius: 16px;
    border: 1px solid var(--mist);
  }

  .ty-icon { font-size: 3rem; margin-bottom: 1rem; display: block; }

  .ty-headline {
    font-family: 'Playfair Display', serif;
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 0.75rem;
    letter-spacing: -0.03em;
  }

  .ty-sub {
    font-size: 0.92rem;
    color: var(--slate);
    line-height: 1.8;
    margin-bottom: 2rem;
    font-weight: 300;
  }

  .summary-box {
    background: var(--soft);
    border-radius: 10px;
    padding: 1.25rem 1.5rem;
    text-align: left;
    margin-bottom: 1.5rem;
  }

  .summary-title {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--rust);
    margin-bottom: 0.75rem;
  }

  .summary-item {
    font-size: 0.85rem;
    color: var(--slate);
    line-height: 1.8;
    display: flex;
    gap: 8px;
  }

  .summary-item + .summary-item { margin-top: 0.3rem; }

  .divider-line {
    width: 40px;
    height: 2px;
    background: var(--rust);
    margin: 1.5rem auto;
    border-radius: 100px;
  }

  @media (max-width: 480px) {
    .track-cards { grid-template-columns: 1fr; }
    .track-headline { font-size: 1.6rem; }
    .q-text { font-size: 1.05rem; }
  }
`;

const D2C_QUESTIONS = [
  {
    id: "d1",
    type: "radio",
    text: "How do you currently set prices for your products?",
    hint: "Pick the one that describes you most honestly.",
    options: [
      "Cost + fixed margin (cost × 2 or 3)",
      "I watch what competitors charge and match or beat them",
      "Gut feel — I know my market",
      "A mix of all three, changes every time",
      "I honestly don't have a clear method"
    ]
  },
  {
    id: "d2",
    type: "radio",
    text: "How long does one pricing decision typically take you?",
    options: [
      "Less than 10 minutes",
      "10–30 minutes",
      "30 minutes to 2 hours",
      "Half a day or more",
      "I delay it as long as possible"
    ]
  },
  {
    id: "d3",
    type: "chips",
    text: "Which platforms do you sell on?",
    hint: "Select all that apply.",
    options: ["Amazon", "Flipkart", "Meesho", "Myntra", "Nykaa", "ONDC", "Own Website", "Offline / Retail"]
  },
  {
    id: "d4",
    type: "radio",
    text: "Which pricing challenge costs you the most right now?",
    options: [
      "Losing the Amazon Buy Box to cheaper sellers",
      "Missing festival sale eligibility (Diwali, Big Billion Day)",
      "My margins disappear after platform fees and shipping",
      "Competitors undercut me and I don't know when it happens",
      "I price the same everywhere and don't know if that's right"
    ]
  },
  {
    id: "d5",
    type: "radio",
    text: "Have you ever lost revenue because of a pricing mistake?",
    hint: "Be honest — this is the most important question.",
    options: [
      "Yes — and I know roughly how much (₹50K+)",
      "Yes — but I couldn't calculate the exact damage",
      "Probably yes, but I've never measured it",
      "No, I don't think so",
      "I'm not sure — I don't track this"
    ]
  },
  {
    id: "d6",
    type: "radio",
    text: "If a tool automatically protected your margins and fixed your prices in real time — what would you pay monthly?",
    hint: "Assume it saves you at least 8–12% additional revenue.",
    options: [
      "Nothing — I'd need to see proof first",
      "₹2,000 – ₹5,000 / month",
      "₹5,000 – ₹15,000 / month",
      "₹15,000 – ₹30,000 / month",
      "More — if the ROI is clear"
    ]
  },
  {
    id: "d7",
    type: "open",
    text: "In one sentence — what is your biggest pricing headache right now?",
    hint: "No right or wrong answer. Your exact words matter more than polished language.",
    placeholder: "e.g. I never know if I'm priced right for Diwali until it's too late..."
  }
];

const B2B_QUESTIONS = [
  {
    id: "b1",
    type: "radio",
    text: "What is your role at the platform?",
    options: [
      "Founder / CEO",
      "Product or Growth Lead",
      "Seller Success / Partnerships",
      "Technology / CTO",
      "Other decision-maker"
    ]
  },
  {
    id: "b2",
    type: "radio",
    text: "What is the most common pricing complaint you hear from sellers on your platform?",
    options: [
      "\"I don't know why my Buy Box / Best Seller rank dropped\"",
      "\"My competitors are always cheaper and I can't react fast enough\"",
      "\"Platform fees are eating my margins and I didn't see it coming\"",
      "\"I missed a sale window because my price history wasn't right\"",
      "\"Pricing is too complex — I need someone to just tell me what to do\""
    ]
  },
  {
    id: "b3",
    type: "radio",
    text: "What percentage of your sellers do you estimate struggle with pricing decisions?",
    options: [
      "Less than 20%",
      "20–40%",
      "40–60%",
      "60–80%",
      "More than 80% — it's a universal problem"
    ]
  },
  {
    id: "b4",
    type: "chips",
    text: "What pricing intelligence do you currently offer sellers?",
    hint: "Select all that apply.",
    options: [
      "Basic price comparison reports",
      "Competitor price alerts",
      "Dynamic pricing recommendations",
      "Festival / sale window guidance",
      "Margin calculators",
      "Nothing yet"
    ]
  },
  {
    id: "b5",
    type: "radio",
    text: "Would you consider white-labelling an AI pricing tool to offer your sellers as a premium feature?",
    options: [
      "Yes — we've been looking for something like this",
      "Possibly — depends on the commercial model",
      "Only if sellers explicitly ask for it",
      "No — we prefer building in-house",
      "Not right now but open in 12–18 months"
    ]
  },
  {
    id: "b6",
    type: "radio",
    text: "What would make you commit to a pricing intelligence partnership?",
    options: [
      "Proven uplift data — show me ₹ results, not features",
      "White-label flexibility — it must look like our product",
      "API-first — plug into our existing seller dashboard",
      "Risk-free pilot — 60 days with 10 sellers before we commit",
      "All of the above honestly"
    ]
  },
  {
    id: "b7",
    type: "open",
    text: "What is the single pricing feature your sellers ask for most — that you haven't built yet?",
    hint: "One sentence is enough. Your exact words matter.",
    placeholder: "e.g. Sellers keep asking for automatic price matching that doesn't kill their margins..."
  }
];

function OptionItem({ opt, selected, onSelect, type }) {
  return (
    <div className={`opt${selected ? " selected" : ""}`} onClick={() => onSelect(opt)}>
      {type === "checkbox" ? (
        <span className="opt-box">{selected ? "✓" : ""}</span>
      ) : (
        <span className="opt-dot">{selected && <span className="opt-dot-inner" />}</span>
      )}
      {opt}
    </div>
  );
}

export default function App() {
  const [track, setTrack] = useState(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);

  const questions = track === "d2c" ? D2C_QUESTIONS : B2B_QUESTIONS;
  const current = questions[step];
  const total = questions.length;
  const progress = ((step) / total) * 100;

  const handleAnswer = (qid, val, type) => {
    if (type === "chips") {
      const prev = answers[qid] || [];
      const next = prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val];
      setAnswers(a => ({ ...a, [qid]: next }));
    } else {
      setAnswers(a => ({ ...a, [qid]: val }));
    }
  };

  const canProceed = () => {
    const a = answers[current.id];
    if (current.type === "open") return a && a.trim().length > 3;
    if (current.type === "chips") return a && a.length > 0;
    return !!a;
  };

  const next = () => {
    if (step < total - 1) setStep(s => s + 1);
    else setDone(true);
  };

  const back = () => {
    if (step > 0) setStep(s => s - 1);
    else { setTrack(null); setStep(0); setAnswers({}); }
  };

  const restart = () => {
    setTrack(null); setStep(0); setAnswers({}); setDone(false);
  };

  const painSummary = () => {
    const key = track === "d2c" ? answers["d4"] : answers["b2"];
    return key || "Pain identified — follow up for details.";
  };

  return (
    <>
      <style>{styles}</style>
      <div className="shell">
        <div className="brand-strip">
          <div className="brand-name">Price<span>IQ</span></div>
          <div className="issue-tag">Idea Validation · 2025</div>
        </div>

        {/* Track selection */}
        {!track && !done && (
          <div className="track-screen">
            <h1 className="track-headline">Help us understand your pricing world.</h1>
            <p className="track-sub">
              7 quick questions. No right or wrong answers. Your honest response shapes what we build next. Takes under 3 minutes.
            </p>
            <div className="track-cards">
              <div
                className={`track-card${track === "d2c" ? " selected" : ""}`}
                onClick={() => setTrack("d2c")}
              >
                <span className="track-icon">🏪</span>
                <div className="track-title">I run a D2C brand</div>
                <div className="track-desc">I sell products directly to consumers — on Amazon, Flipkart, my own site, or other platforms.</div>
              </div>
              <div
                className={`track-card${track === "b2b" ? " selected" : ""}`}
                onClick={() => setTrack("b2b")}
              >
                <span className="track-icon">🏗️</span>
                <div className="track-title">I work at an e-commerce platform</div>
                <div className="track-desc">I work at a marketplace, logistics platform, or tool that serves D2C sellers.</div>
              </div>
            </div>
            <button
              className="btn-start"
              disabled={!track}
              onClick={() => {}}
            >
              {track ? `Start as ${track === "d2c" ? "D2C Founder →" : "Platform Partner →"}` : "Select your role above to begin"}
            </button>
          </div>
        )}

        {/* Questions */}
        {track && !done && (
          <>
            <div className="progress-wrap">
              <div className="progress-meta">
                <span className="progress-label">
                  {track === "d2c" ? "D2C Founder Track" : "Platform Partner Track"}
                </span>
                <span className="progress-count">Q{step + 1} of {total}</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="q-card">
              <div className="q-number">Question {step + 1}</div>
              <div className="q-text">{current.text}</div>
              {current.hint && <div className="q-hint">{current.hint}</div>}

              {current.type === "radio" && (
                <div className="options-list">
                  {current.options.map(opt => (
                    <OptionItem
                      key={opt}
                      opt={opt}
                      selected={answers[current.id] === opt}
                      onSelect={v => handleAnswer(current.id, v, "radio")}
                      type="radio"
                    />
                  ))}
                </div>
              )}

              {current.type === "chips" && (
                <div className="chips">
                  {current.options.map(opt => (
                    <div
                      key={opt}
                      className={`chip${(answers[current.id] || []).includes(opt) ? " selected" : ""}`}
                      onClick={() => handleAnswer(current.id, opt, "chips")}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}

              {current.type === "open" && (
                <textarea
                  className="open-input"
                  placeholder={current.placeholder}
                  value={answers[current.id] || ""}
                  onChange={e => handleAnswer(current.id, e.target.value, "open")}
                />
              )}
            </div>

            <div className="nav-row">
              <button className="btn btn-ghost" onClick={back}>
                ← Back
              </button>
              <button
                className="btn btn-primary"
                disabled={!canProceed()}
                onClick={next}
              >
                {step === total - 1 ? "Submit →" : "Next →"}
              </button>
            </div>
          </>
        )}

        {/* Thank you */}
        {done && (
          <div className="thankyou">
            <span className="ty-icon">🙏</span>
            <h2 className="ty-headline">Thank you, genuinely.</h2>
            <div className="divider-line" />
            <p className="ty-sub">
              You just helped shape what PriceIQ becomes. Every answer you gave is a signal we'll use to build something that actually solves your pricing pain — not something we imagined in a boardroom.
            </p>

            <div className="summary-box">
              <div className="summary-title">What we heard from you</div>
              <div className="summary-item">
                <span>📍</span>
                <span>Track: {track === "d2c" ? "D2C Brand Founder" : "Platform / Marketplace Partner"}</span>
              </div>
              <div className="summary-item">
                <span>🎯</span>
                <span>Biggest pain: {painSummary()}</span>
              </div>
              {track === "d2c" && answers["d5"] && (
                <div className="summary-item">
                  <span>💸</span>
                  <span>Revenue impact acknowledged: {answers["d5"]}</span>
                </div>
              )}
              {track === "d2c" && answers["d6"] && (
                <div className="summary-item">
                  <span>💰</span>
                  <span>Willingness to pay: {answers["d6"]}</span>
                </div>
              )}
            </div>

            <p style={{ fontSize: "0.82rem", color: "var(--slate)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              We'll be in touch personally — not a mass email. If you're open to a 20-minute follow-up conversation, just reply to the message we sent you on LinkedIn.
            </p>

            <button className="btn-start" onClick={restart} style={{ background: "var(--ink)" }}>
              Start over with a different track
            </button>
          </div>
        )}
      </div>
    </>
  );
}