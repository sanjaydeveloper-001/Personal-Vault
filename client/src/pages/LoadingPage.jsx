import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const LoadingPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [phase, setPhase] = useState(0);

  const steps = [
    "Initialising vault...",
    "Verifying session...",
    "Loading your data...",
  ];

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 500);
    const t2 = setTimeout(() => setPhase(2), 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    if (loading) return;
    const t = setTimeout(() => {
      navigate(user ? "/dashboard" : "/home", { replace: true });
    }, 1600);
    return () => clearTimeout(t);
  }, [loading, user, navigate]);

  return (
    <div className="loader-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .loader-root {
          min-height: 100vh;
          background: #0a0e1a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
          position: relative;
        }

        /* Grid bg */
        .loader-root::before {
          content: '';
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        .glow-top {
          position: fixed; top: -180px; left: 50%; transform: translateX(-50%);
          width: 600px; height: 400px; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(201,168,76,0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        .glow-bottom {
          position: fixed; bottom: -180px; right: -100px;
          width: 500px; height: 400px; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        .loader-center {
          position: relative; z-index: 10;
          display: flex; flex-direction: column;
          align-items: center; gap: 0;
          animation: fadeIn 0.5s ease forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Lock icon */
        .lock-wrap {
          position: relative;
          width: 72px; height: 72px;
          margin-bottom: 28px;
        }
        .lock-bg {
          width: 72px; height: 72px; border-radius: 20px;
          background: linear-gradient(135deg, #c9a84c, #8b6914);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 32px rgba(201,168,76,0.35);
          animation: lockPulse 2s ease-in-out infinite;
        }
        @keyframes lockPulse {
          0%, 100% { box-shadow: 0 8px 32px rgba(201,168,76,0.3); }
          50%       { box-shadow: 0 8px 48px rgba(201,168,76,0.55); }
        }
        .lock-ring {
          position: absolute; inset: -5px; border-radius: 24px;
          border: 1px solid rgba(201,168,76,0.25);
          animation: ringExpand 2s ease-in-out infinite;
        }
        .lock-ring-2 {
          position: absolute; inset: -12px; border-radius: 30px;
          border: 1px solid rgba(201,168,76,0.1);
          animation: ringExpand 2s 0.4s ease-in-out infinite;
        }
        @keyframes ringExpand {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 0.2; transform: scale(1.04); }
        }

        /* Brand */
        .brand-name {
          font-family: 'DM Serif Display', serif;
          font-size: 1.9rem;
          color: #f0ece4;
          letter-spacing: -0.01em;
          margin-bottom: 6px;
        }
        .brand-sub {
          font-size: 0.78rem;
          color: #4b5563;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 44px;
        }

        /* Steps */
        .steps {
          display: flex; flex-direction: column; gap: 10px;
          width: 240px; margin-bottom: 36px;
        }
        .step {
          display: flex; align-items: center; gap: 10px;
          opacity: 0;
          transition: opacity 0.4s ease, transform 0.4s ease;
          transform: translateX(-8px);
        }
        .step.visible {
          opacity: 1;
          transform: translateX(0);
        }
        .step-dot {
          width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
          background: rgba(255,255,255,0.1);
          transition: background 0.3s ease, box-shadow 0.3s ease;
        }
        .step.visible .step-dot {
          background: #c9a84c;
          box-shadow: 0 0 8px rgba(201,168,76,0.6);
        }
        .step-text {
          font-size: 0.78rem; color: #4b5563;
          transition: color 0.3s ease;
        }
        .step.visible .step-text { color: #9ca3af; }

        /* Progress bar */
        .progress-track {
          width: 200px; height: 2px;
          background: rgba(255,255,255,0.06);
          border-radius: 2px; overflow: hidden;
          margin-bottom: 20px;
        }
        .progress-fill {
          height: 100%; border-radius: 2px;
          background: linear-gradient(90deg, #c9a84c, #f59e0b);
          box-shadow: 0 0 8px rgba(201,168,76,0.5);
          transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Status text */
        .status-text {
          font-size: 0.72rem;
          color: #374151;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
      `}</style>

      <div className="glow-top" />
      <div className="glow-bottom" />

      <div className="loader-center">
        {/* Lock icon with rings */}
        <div className="lock-wrap">
          <div className="lock-ring-2" />
          <div className="lock-ring" />
          <div className="lock-bg">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0a0e1a" strokeWidth="2.5" strokeLinecap="round">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
        </div>

        {/* Brand */}
        <div className="brand-name">VaultNotes</div>
        <div className="brand-sub">Securing your vault</div>

        {/* Steps */}
        <div className="steps">
          {steps.map((text, i) => (
            <div key={i} className={`step${phase > i ? " visible" : ""}`}>
              <div className="step-dot" />
              <span className="step-text">{text}</span>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${loading ? Math.min(phase * 40 + 10, 80) : 100}%` }} />
        </div>

        <div className="status-text">
          {loading ? steps[Math.min(phase, steps.length - 1)] : "Ready"}
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;