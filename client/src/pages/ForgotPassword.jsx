import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';

const stepIcons = [
  // User icon
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  // List icon
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  // Shield icon
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  // Lock icon
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
];

const stepLabels = ['Username', 'Question', 'Verify', 'Reset'];

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/forgot-password/init', { username });
      setUserId(data.userId);
      setQuestions(data.questions);
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || 'User not found');
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionSelect = (questionId) => {
    setSelectedQuestion(questionId);
    setStep(3);
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/forgot-password/verify', {
        userId,
        questionId: selectedQuestion,
        answer,
      });
      setResetToken(data.resetToken);
      setStep(4);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Incorrect answer');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await api.post('/auth/reset-password', { resetToken, newPassword });
      toast.success('Password updated! You can now login.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  const strength = newPassword.length === 0 ? 0 : newPassword.length < 6 ? 1 : newPassword.length < 10 ? 2 : 3;
  const strengthColor = ["", "#ef4444", "#f59e0b", "#22c55e"];
  const strengthLabel = ["", "Weak", "Fair", "Strong"];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="min-h-screen bg-[#0a0e1a] flex items-center justify-center px-4 py-12">
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
          padding: 12px 16px;
          color: #f1f5f9;
          font-size: 0.9rem;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: all 0.2s;
          box-sizing: border-box;
        }
        .auth-input:focus {
          border-color: rgba(251,191,36,0.5);
          background: rgba(251,191,36,0.05);
          box-shadow: 0 0 0 3px rgba(251,191,36,0.08);
        }
        .auth-input::placeholder { color: #4b5563; }

        .auth-label {
          display: block;
          font-size: 0.78rem;
          color: #9ca3af;
          margin-bottom: 6px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          font-weight: 500;
        }

        /* Stepper */
        .stepper {
          display: flex;
          align-items: center;
          margin-bottom: 32px;
          gap: 0;
        }
        .step-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          position: relative;
        }
        .step-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.78rem;
          font-weight: 600;
          transition: all 0.3s;
          position: relative;
          z-index: 1;
        }
        .step-circle.done {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          border: none;
          color: white;
          box-shadow: 0 0 16px rgba(245,158,11,0.3);
        }
        .step-circle.active {
          background: rgba(251,191,36,0.1);
          border: 1.5px solid rgba(251,191,36,0.5);
          color: #f59e0b;
          box-shadow: 0 0 20px rgba(245,158,11,0.15);
        }
        .step-circle.inactive {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          color: #4b5563;
        }
        .step-label {
          font-size: 0.65rem;
          margin-top: 6px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          font-weight: 500;
          transition: color 0.3s;
        }
        .step-connector {
          flex: 1;
          height: 1px;
          margin: 0 4px;
          margin-bottom: 22px;
          transition: background 0.3s;
        }
        .step-connector.done { background: rgba(251,191,36,0.4); }
        .step-connector.inactive { background: rgba(255,255,255,0.07); }

        /* Question card */
        .q-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 14px 16px;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
          width: 100%;
          color: #c8cdd6;
          font-size: 0.88rem;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .q-card:hover {
          background: rgba(251,191,36,0.04);
          border-color: rgba(251,191,36,0.2);
          color: #f1f5f9;
          transform: translateX(3px);
        }
        .q-card-icon {
          width: 28px;
          height: 28px;
          border-radius: 7px;
          background: rgba(251,191,36,0.08);
          border: 1px solid rgba(251,191,36,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #f59e0b;
        }

        .cta-btn {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(245,158,11,0.25);
          width: 100%;
          padding: 13px;
          border-radius: 10px;
          color: white;
          font-weight: 500;
          font-size: 0.95rem;
          border: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
        }
        .cta-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 30px rgba(245,158,11,0.35);
        }
        .cta-btn:active { transform: translateY(0); }
        .cta-btn:disabled { opacity: 0.45; cursor: not-allowed; }

        .back-btn {
          display: inline-flex; align-items: center; gap: 6px;
          color: #6b7280; font-size: 0.85rem;
          transition: color 0.2s; text-decoration: none;
        }
        .back-btn:hover { color: #fbbf24; }

        .eye-btn {
          position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
          background: none; border: none; color: #4b5563;
          cursor: pointer; padding: 0; transition: color 0.2s;
        }
        .eye-btn:hover { color: #9ca3af; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.45s ease forwards; }
        .panel { animation: fadeUp 0.35s ease forwards; }
      `}</style>

      <div className="grid-bg fixed inset-0 pointer-events-none" />
      <div className="fixed bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(251,191,36,0.04) 0%, transparent 70%)" }} />

      <div className="relative z-10 w-full max-w-md fade-up">
        <div className="mb-6">
          <Link to="/login" className="back-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to login
          </Link>
        </div>

        <div className="auth-card rounded-2xl p-8">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.25rem", color: "#f1f5f9" }}>
              VaultNotes
            </span>
          </div>

          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.75rem", color: "#f1f5f9", marginBottom: "6px" }}>
            Reset password
          </h2>
          <p style={{ color: "#6b7280", fontSize: "0.88rem", marginBottom: "28px" }}>
            Verify your identity to regain access.
          </p>

          {/* Stepper */}
          <div className="stepper">
            {stepLabels.map((label, i) => {
              const idx = i + 1;
              const isDone = step > idx;
              const isActive = step === idx;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                  <div className="step-item" style={{ flex: "none" }}>
                    <div className={`step-circle ${isDone ? 'done' : isActive ? 'active' : 'inactive'}`}>
                      {isDone
                        ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                        : stepIcons[i]
                      }
                    </div>
                    <span className="step-label" style={{ color: isDone ? "#f59e0b" : isActive ? "#f59e0b" : "#374151" }}>
                      {label}
                    </span>
                  </div>
                  {i < stepLabels.length - 1 && (
                    <div className={`step-connector ${step > idx ? 'done' : 'inactive'}`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <form onSubmit={handleUsernameSubmit} className="panel">
              <div className="mb-5">
                <label className="auth-label">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="auth-input"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <button type="submit" disabled={loading} className="cta-btn">
                {loading ? 'Checking...' : 'Continue →'}
              </button>
            </form>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="panel">
              <p style={{ color: "#9ca3af", fontSize: "0.85rem", marginBottom: "14px" }}>
                Choose a security question to verify with:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {questions.map((q, i) => (
                  <button key={q.id} className="q-card" onClick={() => handleQuestionSelect(q.id)}>
                    <div className="q-card-icon">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>
                    </div>
                    {q.question}
                    <svg style={{ marginLeft: "auto", flexShrink: 0, color: "#4b5563" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <form onSubmit={handleAnswerSubmit} className="panel">
              <div style={{
                background: "rgba(251,191,36,0.04)",
                border: "1px solid rgba(251,191,36,0.12)",
                borderRadius: "10px",
                padding: "12px 14px",
                marginBottom: "18px",
                fontSize: "0.85rem",
                color: "#c8cdd6",
                lineHeight: 1.5
              }}>
                <span style={{ color: "#f59e0b", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "4px", fontWeight: 500 }}>Your question</span>
                {questions.find(q => q.id === selectedQuestion)?.question}
              </div>
              <div className="mb-5">
                <label className="auth-label">Your Answer</label>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="auth-input"
                  placeholder="Type your answer"
                  required
                />
              </div>
              <button type="submit" disabled={loading} className="cta-btn">
                {loading ? 'Verifying...' : 'Verify →'}
              </button>
            </form>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <form onSubmit={handleResetPassword} className="panel">
              <div className="mb-5">
                <label className="auth-label">New Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="auth-input"
                    style={{ paddingRight: "44px" }}
                    placeholder="Create a new password"
                    required
                    minLength={6}
                  />
                  <button type="button" className="eye-btn" onClick={() => setShowNew(!showNew)}>
                    {showNew
                      ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    }
                  </button>
                </div>
                {newPassword.length > 0 && (
                  <div style={{ marginTop: "8px" }}>
                    <div style={{ display: "flex", gap: "4px", marginBottom: "4px" }}>
                      {[1, 2, 3].map(i => (
                        <div key={i} style={{
                          height: "3px", flex: 1, borderRadius: "2px",
                          background: i <= strength ? strengthColor[strength] : "rgba(255,255,255,0.1)",
                          transition: "background 0.3s"
                        }} />
                      ))}
                    </div>
                    <span style={{ fontSize: "0.72rem", color: strengthColor[strength] }}>{strengthLabel[strength]}</span>
                  </div>
                )}
              </div>
              <div className="mb-6">
                <label className="auth-label">Confirm Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="auth-input"
                    style={{
                      paddingRight: "44px",
                      borderColor: confirmPassword && confirmPassword !== newPassword ? "rgba(239,68,68,0.5)" : undefined
                    }}
                    placeholder="Repeat your new password"
                    required
                  />
                  <button type="button" className="eye-btn" onClick={() => setShowConfirm(!showConfirm)}>
                    {showConfirm
                      ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    }
                  </button>
                </div>
                {confirmPassword && confirmPassword !== newPassword && (
                  <p style={{ fontSize: "0.75rem", color: "#ef4444", marginTop: "6px" }}>Passwords don't match</p>
                )}
              </div>
              <button type="submit" disabled={loading} className="cta-btn">
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          )}

          <div style={{ marginTop: "24px", textAlign: "center" }}>
            <Link to="/login" style={{ color: "#4b5563", fontSize: "0.82rem", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#fbbf24"}
              onMouseLeave={e => e.target.style.color = "#4b5563"}>
              ← Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;