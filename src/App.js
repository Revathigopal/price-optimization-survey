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
    --green: #2D6A4F;
    --green-light: #EAF4EF;
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

  /* Brand strip */
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
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--ink);
    letter-spacing: -0.02em;
  }

  .brand-name span { color: var(--rust); }

  .brand-tagline {
    font-size: 0.72rem;
    color: var(--slate);
    font-weight: 300;
    letter-spacing: 0.04em;
  }

  /* About Me Card */
  .about-card {
    width: 100%;
    max-width: 640px;
    background: #fff;
    border-radius: 16px;
    border: 1px solid var(--mist);
    padding: 2rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 16px rgba(0,0,0,0.04);
    position: relative;
    overflow: hidden;
  }

  .about-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--rust), var(--gold));
  }

  .about-header {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1.25rem;
  }

  .about-avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: linear-gradient(135deg, #1A1A2E, #C84B31);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Playfair Display', serif;
    font-size: 1.25rem;
    color: #fff;
    font-weight: 700;
    flex-shrink: 0;
  }

  .about-name-block { flex: 1; }

  .about-name {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 0.2rem;
    letter-spacing: -0.02em;
  }

  .about-title {
    font-size: 0.78rem;
    color: var(--rust);
    font-weight: 500;
    letter-spacing: 0.02em;
  }

  .about-inst {
    font-size: 0.75rem;
    color: var(--slate);
    font-weight: 300;
    margin-top: 0.1rem;
  }

  .about-body {
    font-size: 0.92rem;
    color: var(--slate);
    line-height: 1.85;
    font-weight: 300;
    margin-bottom: 1.25rem;
  }

  .about-body strong {
    color: var(--ink);
    font-weight: 500;
  }

  .assurance-row {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .assurance-item {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 0.82rem;
    color: var(--slate);
    font-weight: 300;
    line-height: 1.5;
  }

  .assurance-dot {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--green-light);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .divider-line {
    width: 100%;
    height: 1px;
    background: var(--mist);
    margin: 1.25rem 0;
  }

  .time-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--soft);
    border: 1px solid var(--mist);
    border-radius: 100px;
    padding: 4px 12px;
    font-size: 0.75rem;
    color: var(--slate);
    font-weight: 400;
    margin-bottom: 0.75rem;
  }

  /* Track selector */
  .track-screen {
    width: 100%;
    max-width: 640px;
  }

  .track-headline {
    font-family: 'Playfair Display', serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--ink);
    line-height: 1.3;
    margin-bottom: 0.5rem;
    letter-spacing: -0.03em;
  }

  .track-sub {
    font-size: 0.9rem;
    color: var(--slate);
    line-height: 1.7;
    margin-bottom: 1.5rem;
    font-weight: 300;
  }

  .track-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1.25rem;
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
    box-shadow: 0 8px 24px rgba(200,75,49,0.08);
  }

  .track-card.selected {
    border-color: var(--rust);
    background: #FDF5F3;
  }

  .track-icon { font-size: 1.75rem; margin-bottom: 0.75rem; display: block; }

  .track-title {
    font-family: 'Playfair Display', serif;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--ink);
    margin-bottom: 0.4rem;
  }

  .track-desc {
    font-size: 0.76rem;
    color: var(--slate);
    line-height: 1.6;
    font-weight: 300;
  }

  /* Progress */
  .progress-wrap {
    width: 100%;
    max-width: 640px;
    margin-bottom: 1.75rem;
  }

  .progress-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .progress-label {
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--slate);
  }

  .progress-count { font-size: 0.72rem; font-weight: 600; color: var(--rust); }

  .progress-track {
    height: 3px;
    background: var(--mist);
    border-radius: 100px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--rust), var(--gold));
    border-radius: 100px;
    transition: width 0.4s cubic-bezier(0.4,0,0.2,1);
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
  }

  .q-text {
    font-family: 'Playfair Display', serif;
    font-size: 1.15rem;
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

  /* Options */
  .options-list { display: flex; flex-direction: column; gap: 0.6rem; }

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
    font-size: 0.88rem;
    color: var(--ink);
    font-weight: 400;
    user-select: none;
    line-height: 1.4;
  }

  .opt:hover { border-color: var(--rust); background: #FDF5F3; }
  .opt.selected { border-color: var(--rust); background: #FDF5F3; font-weight: 500; }

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

  .opt.selected .opt-dot { border-color: var(--rust); background: var(--rust); }
  .opt-dot-inner { width: 6px; height: 6px; border-radius: 50%; background: #fff; }

  /* Chips */
  .chips { display: flex; flex-wrap: wrap; gap: 0.5rem; }

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
    min-height: 90px;
    transition: border-color 0.15s;
    outline: none;
    line-height: 1.6;
  }

  .open-input:focus { border-color: var(--rust); background: #fff; }
  .open-input::placeholder { color: #bbb; font-style: italic; }

  /* Nav */
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

  /* Thank you */
  .thankyou {
    width: 100%;
    max-width: 640px;
    text-align: center;
    padding: 2.5rem 2rem;
    background: #fff;
    border-radius: 16px;
    border: 1px solid var(--mist);
    box-shadow: 0 2px 16px rgba(0,0,0,0.04);
  }

  .ty-icon { font-size: 2.75rem; margin-bottom: 1rem; display: block; }

  .ty-headline {
    font-family: 'Playfair Display', serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 0.6rem;
    letter-spacing: -0.03em;
  }

  .ty-sub {
    font-size: 0.9rem;
    color: var(--slate);
    line-height: 1.85;
    margin-bottom: 1.75rem;
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
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--rust);
    margin-bottom: 0.75rem;
  }

  .summary-item {
    font-size: 0.84rem;
    color: var(--slate);
    line-height: 1.8;
    display: flex;
    gap: 8px;
  }

  .summary-item + .summary-item { margin-top: 0.3rem; }

  .ty-divider {
    width: 40px;
    height: 2px;
    background: var(--rust);
    margin: 1.25rem auto;
    border-radius: 100px;
  }

  .dr-sign {
    font-size: 0.82rem;
    color: var(--slate);
    font-style: italic;
    margin-top: 1rem;
    line-height: 1.7;
    font-weight: 300;
  }

  @media (max-width: 480px) {
    .track-cards { grid-template-columns: 1fr; }
    .track-headline { font-size: 1.35rem; }
    .q-text { font-size: 1rem; }
    .about-card { padding: 1.5rem; }
  }
`;

const D2C_QUESTIONS = [
  {
    id: "d1",
    type: "radio",
    text: "How do you currently set prices for your products?",
    hint: "Pick the one that describes you most honestly — there is no wrong answer here.",
    options: [
      "Cost + fixed margin (cost × 2 or 3)",
      "I watch what competitors charge and match or beat them",
      "Gut feel — I know my market well",
      "A mix of all three, changes every time",
      "Having a team to work on pricing decisions",
      "I honestly don't have a clear method yet"
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
    text: "Which platforms do you currently sell on?",
    hint: "Select all that apply.",
    options: ["Amazon", "Flipkart", "Meesho", "Myntra", "Nykaa", "ONDC", "Own Website", "Offline / Retail", "others"],
 },
  {
    id: "d4",
    type: "radio",
    text: "Which pricing challenge costs your business the most right now?",
    options: [
      "Losing the Amazon Buy Box to cheaper sellers",
      "Missing festival sale eligibility (Diwali, Big Billion Day etc.)",
      "My margins disappear after platform fees and shipping costs and return orders",
      "Competitors undercut me and I don't know when it happens",
      "I price the same everywhere and don't know if that's right"
    ]
  },
  {
    id: "d5",
    type: "radio",
    text: "Have you ever lost revenue because of a pricing mistake?",
    hint: "This is the most important question. Your honest answer helps the research significantly.",
    options: [
      "Yes — and I know roughly how much (₹50,000 or more)",
      "Yes — but I couldn't calculate the exact damage",
      "Probably yes, but I have never measured it",
      "No, I don't think so",
      "I am not sure — I don't track this closely"
    ]
  },
  {
    id: "d6",
    type: "radio",
    text: "If a tool automatically protected your margins and recommended the right price in real time — what would you pay monthly?",
    hint: "Assume it saves you at least 8–12% additional revenue on your current sales.",
    options: [
      "Nothing — I would need to see proof first",
      "₹2,000 – ₹5,000 per month",
      "₹5,000 – ₹15,000 per month",
      "₹15,000 – ₹30,000 per month",
      "More — if the return on investment is clearly demonstrated"
    ]
  },
  {
    id: "d7",
    type: "open",
    text: "In your own words — what is your single biggest pricing headache right now?",
    hint: "One sentence is enough. Your exact words matter more than polished language. There is truly no wrong answer.",
    placeholder: "e.g. I never know if I am priced right for Diwali until it is already too late..."
  }
];

const B2B_QUESTIONS = [
  {
    id: "b1",
    type: "radio",
    text: "What is your primary role at the platform or organisation?",
    options: [
      "Founder / CEO",
      "Product or Growth Lead",
      "Seller Success / Partnerships Manager",
      "Technology Lead / CTO",
      "Other decision-making role"
    ]
  },
  {
    id: "b2",
    type: "radio",
    text: "What is the most common pricing complaint you hear from sellers on your platform?",
    options: [
      "\"I don't know why my ranking or visibility dropped\"",
      "\"My competitors are always cheaper and I can't react fast enough\"",
      "\"Platform fees are eating my margins and I didn't see it coming\"",
      "\"I missed a sale window because my price history wasn't right\"",
      "\"Pricing is too complex — I need someone to just tell me what to do\""
    ]
  },
  {
    id: "b3",
    type: "radio",
    text: "What percentage of your sellers do you estimate genuinely struggle with pricing decisions?",
    options: [
      "Less than 20%",
      "20 – 40%",
      "40 – 60%",
      "60 – 80%",
      "More than 80% — it is a universal problem on our platform"
    ]
  },
  {
    id: "b4",
    type: "chips",
    text: "What pricing support or intelligence do you currently offer sellers?",
    hint: "Select all that apply.",
    options: [
      "Basic price comparison reports",
      "Competitor price alerts",
      "Dynamic pricing recommendations",
      "Festival and sale window guidance",
      "Margin calculators",
      "Nothing structured yet"
    ]
  },
  {
    id: "b5",
    type: "radio",
    text: "Would your platform consider offering AI-powered pricing recommendations as a premium feature for sellers?",
    options: [
      "Yes — we have been looking for something exactly like this",
      "Possibly — it depends on the commercial model and integration effort",
      "Only if sellers explicitly and repeatedly ask for it",
      "No — we prefer building such capabilities in-house",
      "Not right now but we would be open to it in 12–18 months"
    ]
  },
  {
    id: "b6",
    type: "radio",
    text: "What would make you commit to a pricing intelligence partnership for your sellers?",
    options: [
      "Proven uplift data — show me revenue results, not just features",
      "White-label flexibility(rebrand pre-built technology as their own) — it must feel like our own product",
      "API-first integration — plugs into our existing seller dashboard",
      "A risk-free pilot — 60 days with a small group of sellers first",
      "Honestly, all of the above would be needed"
    ]
  },
  {
    id: "b7",
    type: "open",
    text: "What is the single pricing feature your sellers ask for most — that you have not built yet?",
    hint: "One sentence is more than enough. Your exact words are what this research needs.",
    placeholder: "e.g. Sellers keep asking for automatic price matching that doesn't destroy their margins..."
  }
];

function OptionItem({ opt, selected, onSelect }) {
  return (
    <div className={`opt${selected ? " selected" : ""}`} onClick={() => onSelect(opt)}>
      <span className="opt-dot">{selected && <span className="opt-dot-inner" />}</span>
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
  const progress = (step / total) * 100;

  const handleAnswer = (qid, val, type) => {
    if (type === "chips") {
      const prev = answers[qid] || [];
      const next = prev.includes(val)
        ? prev.filter(v => v !== val)
        : [...prev, val];
      setAnswers(a => ({ ...a, [qid]: next }));
    } else {
      setAnswers(a => ({ ...a, [qid]: val }));
    }
  };

  const canProceed = () => {
    const a = answers[current?.id];
    if (!current) return false;
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
    return key || "Recorded — follow-up conversation scheduled.";
  };

  return (
    <>
      <style>{styles}</style>
      <div className="shell">

        {/* Brand strip */}
        <div className="brand-strip">
          <div>
            <div className="brand-name">Bid<span>Optimize</span></div>
            <div className="brand-tagline">Pricing Intelligence Research</div>
          </div>
        </div>

        {/* About Dr. Revathi — always visible at top */}
        {!done && (
          <div className="about-card">
            <div className="about-header">
              <div className="about-avatar">Dr.</div>
              <div className="about-name-block">
                <div className="about-name">Dr. Revathi</div>
                <div className="about-title">Ph.D in Mathematics</div>
                <div className="about-inst">National Institute of Technology, Tiruchirappalli (NIT Trichy)</div>
              </div>
            </div>

            <div className="about-body">
              Hello, and thank you for being here.

              <br /><br />

               I am researching,<strong>how can data-driven pricing recommendations help e-commerce platforms and D2C founders make better, more confident pricing decisions?</strong>

              <br /><br />

              I am a researcher trying to understand the real pricing challenges that people like you face every day — so that whatever I build is genuinely useful, not just theoretically interesting.

              <br /><br />

              Your answers — honest and unpolished — are far more valuable to this research than perfect ones. <strong>There are no right or wrong answers here.</strong>
            </div>

            <div class="divider-line"></div>

            <div class="time-badge">
              <span>⏱</span> Takes under 3 minutes — 7 questions total
            </div>

            <div className="assurance-row">
              <div className="assurance-item">
                <div className="assurance-dot">✓</div>
                <span>Your responses are completely confidential, No sales pitch, no follow-up marketing - only a personal thank you from me</span>
              </div>
              
              
            </div>
          </div>
        )}

        {/* Track selection */}
        {!track && !done && (
          <div className="track-screen">
            <h2 className="track-headline">Which best describes you?</h2>
            <p className="track-sub">
              Choose your role below. The questions will be tailored specifically to your experience — no irrelevant questions.
            </p>
            <div className="track-cards">
              <div
                className={`track-card${track === "d2c" ? " selected" : ""}`}
                onClick={() => setTrack("d2c")}
              >
                <span className="track-icon">🏪</span>
                <div className="track-title">I am a manufacturer or dealer of products </div>
                <div className="track-desc">I sell products directly to consumers — on Amazon, Flipkart, my own website, or other platforms.</div>
              </div>
              <div
                className={`track-card${track === "b2b" ? " selected" : ""}`}
                onClick={() => setTrack("b2b")}
              >
                <span className="track-icon">🏗️</span>
                <div className="track-title">I work at an E-commerce Platform</div>
                <div className="track-desc">I work at a marketplace, logistics company, or a tool that serves (direct to consumer)D2C sellers at scale.</div>
              </div>
            </div>
            <button
              className="btn-start"
              disabled={!track}
            >
              {track
                ? `Begin as ${track === "d2c" ? "D2C Founder →" : "Platform Partner →"}`
                : "Please select your role above to begin"}
            </button>
          </div>
        )}

        {/* Questions */}
        {track && !done && (
          <>
            <div className="progress-wrap">
              <div className="progress-meta">
                <span className="progress-label">
                  {track === "d2c" ? "D2C Founder" : "Platform Partner"}
                </span>
                <span className="progress-count">Question {step + 1} of {total}</span>
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

        {/* Thank you screen */}
        {done && (
          <div className="thankyou">
            <span className="ty-icon">🙏</span>
            <h2 className="ty-headline">Thank you sincerely.</h2>
            <div className="ty-divider" />
            <p className="ty-sub">
              Every answer you gave contributes directly to research that I hope will make a real difference for Indian D2C businesses. Your time and honesty are genuinely appreciated — not as a formality, but as the foundation this work is built on.
            </p>

            <div className="summary-box">
              <div className="summary-title">What you shared with me today</div>
              <div className="summary-item">
                <span>📍</span>
                <span>{track === "d2c" ? "D2C Brand Founder perspective" : "E-commerce Platform perspective"}</span>
              </div>
              <div className="summary-item">
                <span>🎯</span>
                <span>Primary challenge noted: {painSummary()}</span>
              </div>
              {track === "d2c" && answers["d5"] && (
                <div className="summary-item">
                  <span>💸</span>
                  <span>Revenue impact: {answers["d5"]}</span>
                </div>
              )}
              {track === "d2c" && answers["d6"] && (
                <div className="summary-item">
                  <span>💰</span>
                  <span>Value assessment: {answers["d6"]}</span>
                </div>
              )}
            </div>

            <p className="dr-sign">
              — Dr. Revathi, Ph.D Mathematics<br />
              National Institute of Technology, Tiruchirappalli<br /><br />
              I will personally review your response and share a summary of findings with you once the research reaches a meaningful stage. If you are open to a short follow-up conversation, please reply to the message that brought you here.
            </p>

            <br />
            <button
              className="btn-start"
              onClick={restart}
              style={{ background: "var(--ink)", marginTop: "0.5rem" }}
            >
              Complete as a different role
            </button>
          </div>
        )}

      </div>
    </>
  );
}