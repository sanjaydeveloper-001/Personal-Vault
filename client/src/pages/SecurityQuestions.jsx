import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';

const SecurityQuestions = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    dobYear: '2000',
    favPlaceAnswer: '',
    bestFriendAnswer: '',
  });
  const [yearError, setYearError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'dobYear') {
      const currentYear = new Date().getFullYear();
      const age = currentYear - parseInt(value, 10);
      if (value && age < 15) {
        setYearError('You must be at least 15 years old.');
      } else {
        setYearError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentYear = new Date().getFullYear();
    const age = currentYear - parseInt(formData.dobYear, 10);
    if (formData.dobYear && age < 15) {
      setYearError('You must be at least 15 years old.');
      return;
    }
    setLoading(true); 
    try {
      await api.post('/auth/security-questions', {
        birthYear: formData.dobYear || null,
        placeAnswer: formData.favPlaceAnswer,
        friendAnswer: formData.bestFriendAnswer,
      });
      toast.success('Security questions saved!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to save questions');
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const maxYear = currentYear - 15;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="min-h-screen bg-[#0a0e1a] flex items-center justify-center px-4 py-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

        .grid-bg {
          background-image: linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .auth-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
        }

        .auth-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 10px 8px;
          color: #f1f5f9;
          font-size: 0.95rem;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: all 0.2s;
          box-sizing: border-box;
          text-align: center;
          letter-spacing: 0.06em;
        }
        .auth-input:focus {
          border-color: rgba(251,191,36,0.5);
          background: rgba(251,191,36,0.05);
          box-shadow: 0 0 0 3px rgba(251,191,36,0.08);
        }
        .auth-input.error {
          border-color: rgba(239,68,68,0.5);
          background: rgba(239,68,68,0.04);
          box-shadow: 0 0 0 3px rgba(239,68,68,0.07);
        }
        .auth-input[type="number"] { -moz-appearance: textfield; }
        .auth-input[type="number"]::-webkit-inner-spin-button,
        .auth-input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }

        .auth-input-text {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 10px 14px;
          color: #f1f5f9;
          font-size: 0.88rem;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: all 0.2s;
          box-sizing: border-box;
        }
        .auth-input-text:focus {
          border-color: rgba(251,191,36,0.5);
          background: rgba(251,191,36,0.05);
          box-shadow: 0 0 0 3px rgba(251,191,36,0.08);
        }
        .auth-input-text::placeholder { color: #374151; }

        .sq-block {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 13px 15px;
          transition: border-color 0.2s, background 0.2s;
        }
        .sq-block:focus-within {
          border-color: rgba(251,191,36,0.18);
          background: rgba(251,191,36,0.012);
        }

        .sq-badge {
          display: inline-flex; align-items: center; gap: 5px;
          background: rgba(251,191,36,0.08);
          border: 1px solid rgba(251,191,36,0.14);
          border-radius: 20px; padding: 2px 8px;
          font-size: 0.63rem; color: #f59e0b;
          font-weight: 600; letter-spacing: 0.05em;
          text-transform: uppercase; margin-bottom: 7px;
        }

        .sq-question {
          font-size: 0.86rem; color: #cbd5e1;
          margin-bottom: 9px; line-height: 1.4;
        }

        .warn-banner {
          display: flex; align-items: flex-start; gap: 9px;
          background: rgba(239,68,68,0.05);
          border: 1px solid rgba(239,68,68,0.14);
          border-radius: 9px; padding: 10px 12px;
          margin-bottom: 14px;
        }
        .warn-text { font-size: 0.78rem; color: #fca5a5; line-height: 1.45; }

        .year-error {
          display: flex; align-items: center; gap: 5px;
          margin-top: 7px;
          font-size: 0.75rem; color: #f87171;
        }

        .optional-tag {
          font-size: 0.62rem; color: #4b5563;
          background: rgba(255,255,255,0.04);
          border-radius: 4px; padding: 1px 5px;
          margin-left: 6px; vertical-align: middle;
        }

        .cta-btn {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(245,158,11,0.22);
          width: 100%; padding: 12px;
          border-radius: 10px; color: white;
          font-weight: 500; font-size: 0.93rem;
          border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
        }
        .cta-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 28px rgba(245,158,11,0.32); }
        .cta-btn:active { transform: translateY(0); }
        .cta-btn:disabled { opacity: 0.45; cursor: not-allowed; }

        .back-btn {
          display: inline-flex; align-items: center; gap: 6px;
          color: #6b7280; font-size: 0.84rem;
          transition: color 0.2s; text-decoration: none;
        }
        .back-btn:hover { color: #fbbf24; }

        .skip-btn {
          display: block; text-align: center; margin-top: 11px;
          color: #374151; font-size: 0.78rem; cursor: pointer;
          text-decoration: none; transition: color 0.2s;
        }
        .skip-btn:hover { color: #9ca3af; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up   { animation: fadeUp 0.4s ease forwards; }
        .fade-up-2 { animation: fadeUp 0.4s 0.07s ease both; }
        .fade-up-3 { animation: fadeUp 0.4s 0.14s ease both; }
        .fade-up-4 { animation: fadeUp 0.4s 0.21s ease both; }
      `}</style>

      <div className="grid-bg fixed inset-0 pointer-events-none" />
      <div className="fixed top-[-100px] left-[-100px] w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(251,191,36,0.04) 0%, transparent 70%)" }} />

      <div className="relative z-10 w-full max-w-md fade-up">

        {/* Back */}
        <div className="mb-4">
          <Link to="/signup" className="back-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back
          </Link>
        </div>

        <div className="auth-card rounded-2xl p-6">

          {/* Logo + heading */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.1rem", color: "#f1f5f9" }}>
              VaultNotes
            </span>
          </div>

          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.45rem", color: "#f1f5f9", marginBottom: "3px" }}>
            Security questions
          </h2>
          <p style={{ color: "#6b7280", fontSize: "0.82rem", marginBottom: "14px" }}>
            Used to verify your identity during account recovery.
          </p>

          {/* Warning */}
          <div className="warn-banner fade-up-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }}>
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <span className="warn-text">
              <strong style={{ color: "#fca5a5" }}>This is the only way to recover your account.</strong> Remember your answers carefully.
            </span>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

            {/* Birth Year block */}
            <div className="sq-block fade-up-2">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span style={{ color: "#c8cdd6", fontSize: "0.84rem", fontWeight: 500 }}>Birth Year</span>
                </div>
                <span className="optional-tag">Optional</span>
              </div>

              <input
                type="number"
                name="dobYear"
                min="1900"
                max={maxYear}
                value={formData.dobYear}
                onChange={handleChange}
                className={`auth-input${yearError ? ' error' : ''}`}
                style={{ maxWidth: 140 }}
                placeholder="e.g. 1998"
              />

              {yearError && (
                <div className="year-error">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  {yearError}
                </div>
              )}
            </div>

            {/* Q1 */}
            <div className="sq-block fade-up-3">
              <div className="sq-badge">
                <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
                </svg>
                Q1
              </div>
              <p className="sq-question">What is your favourite place in your country?</p>
              <input
                type="text"
                name="favPlaceAnswer"
                placeholder="Your answer"
                value={formData.favPlaceAnswer}
                onChange={handleChange}
                className="auth-input-text"
                required
              />
            </div>

            {/* Q2 */}
            <div className="sq-block fade-up-4">
              <div className="sq-badge">
                <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
                </svg>
                Q2
              </div>
              <p className="sq-question">What is the name of your best friend?</p>
              <input
                type="text"
                name="bestFriendAnswer"
                placeholder="Your answer"
                value={formData.bestFriendAnswer}
                onChange={handleChange}
                className="auth-input-text"
                required
              />
            </div>

            <div style={{ marginTop: "6px" }}>
              <button
                type="submit"
                className="cta-btn"
                disabled={loading || !!yearError}
              >
                {loading ? 'Saving...' : 'Save & Continue →'}
              </button>
              <a className="skip-btn" onClick={() => navigate('/dashboard')}>
                Skip for now
              </a>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default SecurityQuestions;