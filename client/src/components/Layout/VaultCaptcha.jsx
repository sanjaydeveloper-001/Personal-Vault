// VaultCaptcha.jsx
//
// Usage:
//   const captchaRef = useRef(null);
//   <VaultCaptcha ref={captchaRef} />
//
//   Then on form submit:
//   const ok = captchaRef.current.verify();  // returns true / false
//   if (!ok) return;  // captcha wrong — show error, captcha stays same

import { useState, useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";

const CAPTCHA_FONTS = [
  "bold italic 27px 'Abril Fatface', cursive",
  "bold 29px 'Pacifico', cursive",
  "bold 25px 'Permanent Marker', cursive",
  "bold italic 28px 'Lobster', cursive",
  "bold 30px 'Boogaloo', cursive",
  "bold 24px 'Special Elite', cursive",
];

const CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function generateCaptchaText(len = 6) {
  return Array.from({ length: len }, () =>
    CHARSET[Math.floor(Math.random() * CHARSET.length)]
  ).join("");
}

function drawCaptcha(canvas, text) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;

  ctx.clearRect(0, 0, W, H);

  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#0a0a0a");
  bg.addColorStop(1, "#0d0b00");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Grid
  ctx.strokeStyle = "rgba(251,191,36,0.05)";
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 20) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y < H; y += 20) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  // Noise dots
  for (let i = 0; i < 80; i++) {
    ctx.fillStyle = `rgba(251,191,36,${Math.random() * 0.2})`;
    ctx.beginPath();
    ctx.arc(Math.random() * W, Math.random() * H, Math.random() * 1.8, 0, Math.PI * 2);
    ctx.fill();
  }

  // Interference lines
  for (let i = 0; i < 5; i++) {
    ctx.save();
    ctx.strokeStyle = `rgba(251,191,36,${0.07 + Math.random() * 0.12})`;
    ctx.lineWidth = 0.8 + Math.random();
    ctx.beginPath();
    ctx.moveTo(Math.random() * W, Math.random() * H);
    ctx.bezierCurveTo(
      Math.random() * W, Math.random() * H,
      Math.random() * W, Math.random() * H,
      Math.random() * W, Math.random() * H
    );
    ctx.stroke();
    ctx.restore();
  }

  // Characters — each with its own font, angle, offset
  const slotW = W / text.length;
  text.split("").forEach((char, i) => {
    ctx.save();
    ctx.font = CAPTCHA_FONTS[i % CAPTCHA_FONTS.length];
    const cx = slotW * i + slotW / 2;
    const cy = H / 2 + (Math.random() - 0.5) * 10;
    const angle = (Math.random() - 0.5) * 0.5;

    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.scale(0.92 + Math.random() * 0.18, 0.92 + Math.random() * 0.18);

    ctx.shadowColor = "#fbbf24";
    ctx.shadowBlur = 10 + Math.random() * 10;

    const g = 140 + Math.floor(Math.random() * 90);
    ctx.fillStyle = `rgb(248,${g},${Math.floor(Math.random() * 20)})`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(char, 0, 0);
    ctx.restore();
  });

  // Border + corner ticks
  ctx.strokeStyle = "rgba(251,191,36,0.18)";
  ctx.lineWidth = 1;
  ctx.strokeRect(0.5, 0.5, W - 1, H - 1);

  const L = 9;
  ctx.strokeStyle = "rgba(251,191,36,0.5)";
  ctx.lineWidth = 2;
  [[0,0,1,1],[W,0,-1,1],[0,H,1,-1],[W,H,-1,-1]].forEach(([x,y,dx,dy]) => {
    ctx.beginPath();
    ctx.moveTo(x + dx * L, y);
    ctx.lineTo(x, y);
    ctx.lineTo(x, y + dy * L);
    ctx.stroke();
  });
}

// ─────────────────────────────────────────────────────────────────────────────

const VaultCaptcha = forwardRef(function VaultCaptcha(_, ref) {
  const canvasRef = useRef(null);
  const [captchaText, setCaptchaText] = useState("");
  const [input, setInput] = useState("");
  // status: idle | success | error  — only changes on verify() or refresh
  const [status, setStatus] = useState("idle");
  const [shake, setShake] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);

  // Keep a ref to captchaText so verify() always reads current value
  const captchaTextRef = useRef("");

  useEffect(() => {
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => setFontsReady(true));
    } else {
      setTimeout(() => setFontsReady(true), 800);
    }
  }, []);

  const refresh = useCallback(() => {
    const text = generateCaptchaText();
    captchaTextRef.current = text;
    setCaptchaText(text);
    setInput("");
    setStatus("idle");
    requestAnimationFrame(() => drawCaptcha(canvasRef.current, text));
  }, []);

  useEffect(() => {
    if (fontsReady) refresh();
  }, [fontsReady, refresh]);

  // Exposed to parent via ref — call captchaRef.current.verify()
  // Returns true if correct, false if wrong (captcha stays, error shown)
  useImperativeHandle(ref, () => ({
    verify() {
      const typed = input.trim().toUpperCase();
      if (typed === captchaTextRef.current) {
        setStatus("success");
        return true;
      } else {
        setStatus("error");
        setShake(true);
        setTimeout(() => setShake(false), 600);
        // Captcha image stays the same — user can try again or regenerate
        return false;
      }
    },
    reset() {
      refresh();
    },
  }), [input, refresh]);

  const canvasBorder =
    status === "success"
      ? "1px solid rgba(34,197,94,0.45)"
      : status === "error"
      ? "1px solid rgba(239,68,68,0.4)"
      : "1px solid rgba(251,191,36,0.15)";

  const inputBorder =
    status === "success"
      ? "1px solid rgba(34,197,94,0.6)"
      : status === "error"
      ? "1px solid rgba(239,68,68,0.55)"
      : input.length > 0
      ? "1px solid rgba(251,191,36,0.4)"
      : "1px solid rgba(255,255,255,0.1)";

  const inputColor =
    status === "success" ? "#4ade80" : status === "error" ? "#f87171" : "#f1f5f9";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Pacifico&family=Permanent+Marker&family=Lobster&family=Boogaloo&family=Special+Elite&display=swap');

        @keyframes vcShake {
          0%,100%{transform:translateX(0)}
          15%{transform:translateX(-6px)}
          30%{transform:translateX(6px)}
          45%{transform:translateX(-4px)}
          60%{transform:translateX(4px)}
          75%{transform:translateX(-2px)}
          90%{transform:translateX(2px)}
        }
        .vc-shake { animation: vcShake 0.6s ease; }

        .vc-canvas {
          display: block;
          width: 100%;
          height: 70px;
          border-radius: 10px;
          transition: border 0.25s;
        }

        .vc-refresh-btn {
          background: rgba(251,191,36,0.07);
          border: 1px solid rgba(251,191,36,0.2);
          border-radius: 8px;
          color: #fbbf24;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s, transform 0.25s;
          flex-shrink: 0;
          padding: 0;
        }
        .vc-refresh-btn:hover {
          background: rgba(251,191,36,0.16);
          transform: rotate(90deg);
        }

        .vc-dots {
          display: flex;
          justify-content: center;
          gap: 7px;
          margin: 7px 0 0;
        }
        .vc-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          transition: background 0.2s, box-shadow 0.2s;
        }

        .vc-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
          padding: 11px 16px;
          font-size: 0.9rem;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border 0.2s, color 0.2s, box-shadow 0.2s;
          letter-spacing: 0.2em;
          text-align: center;
          font-weight: 500;
          text-transform: uppercase;
          box-sizing: border-box;
        }
        .vc-input:focus {
          box-shadow: 0 0 0 3px rgba(251,191,36,0.08);
        }
        .vc-input::placeholder {
          color: #4b5563;
          letter-spacing: 0.1em;
          font-weight: 400;
          text-transform: none;
        }

        .vc-hint {
          font-size: 0.73rem;
          letter-spacing: 0.03em;
          min-height: 16px;
          margin-top: 5px;
          transition: color 0.2s;
        }
      `}</style>

      <div style={{ marginBottom: "20px" }}>
        {/* Label + refresh button row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
          <label className="auth-label" style={{ margin: 0 }}>Captcha Verification</label>
          <button
            type="button"
            className="vc-refresh-btn"
            onClick={refresh}
            title="Generate new CAPTCHA"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
              <path d="M3 3v5h5"/>
            </svg>
          </button>
        </div>

        {/* Canvas — never redraws unless refresh clicked */}
        <div className={shake ? "vc-shake" : ""} style={{ marginBottom: "10px" }}>
          <canvas
            ref={canvasRef}
            width={340}
            height={70}
            className="vc-canvas"
            style={{ border: canvasBorder }}
          />
        </div>

        {/* Input — typing here does NOT touch captcha or status */}
        <input
          type="text"
          className="vc-input"
          placeholder="Enter characters above"
          value={input}
          onChange={(e) => {
            // Only update the typed value — no verification, no redraw
            const val = e.target.value.replace(/[^a-zA-Z0-9]/g, "").slice(0, 6);
            setInput(val);
            // Clear error/success when user starts re-typing
            if (status !== "idle") setStatus("idle");
          }}
          maxLength={6}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          style={{ border: inputBorder, color: inputColor }}
        />

        {/* Progress dots */}
        <div className="vc-dots">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="vc-dot"
              style={{
                background:
                  i < input.length
                    ? status === "error"
                      ? "#f87171"
                      : status === "success"
                      ? "#4ade80"
                      : "#fbbf24"
                    : "rgba(255,255,255,0.1)",
                boxShadow:
                  i < input.length && status !== "error"
                    ? "0 0 6px rgba(251,191,36,0.4)"
                    : "none",
              }}
            />
          ))}
        </div>

        {/* Hint text — only shown after a verify() attempt */}
        <p
          className="vc-hint"
          style={{
            color:
              status === "success"
                ? "#4ade80"
                : status === "error"
                ? "#f87171"
                : "#4b5563",
          }}
        >
          {status === "success"
            ? "✓ Captcha verified"
            : status === "error"
            ? "✗ Incorrect — try again or click 🔄"
            : ""}
        </p>
      </div>
    </>
  );
});

export default VaultCaptcha;