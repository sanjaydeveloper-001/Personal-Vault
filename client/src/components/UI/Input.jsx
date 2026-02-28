const Input = ({ label, id, className = "", ...props }) => {
  return (
    <div style={{ marginBottom: 14, fontFamily: "'DM Sans', sans-serif" }}>
      {label && (
        <label htmlFor={id} style={{
          display: "block", fontSize: "0.77rem", color: "#9ca3af",
          marginBottom: 6, letterSpacing: "0.05em", textTransform: "uppercase"
        }}>
          {label}
        </label>
      )}
      <input
        id={id}
        style={{
          width: "100%",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: 10,
          padding: "10px 14px",
          color: "#f1f5f9",
          fontSize: "0.875rem",
          fontFamily: "'DM Sans', sans-serif",
          outline: "none",
          boxSizing: "border-box",
          transition: "all 0.2s",
        }}
        onFocus={e => {
          e.target.style.borderColor = "rgba(251,191,36,0.45)";
          e.target.style.background = "rgba(251,191,36,0.04)";
          e.target.style.boxShadow = "0 0 0 3px rgba(251,191,36,0.07)";
        }}
        onBlur={e => {
          e.target.style.borderColor = "rgba(255,255,255,0.09)";
          e.target.style.background = "rgba(255,255,255,0.04)";
          e.target.style.boxShadow = "none";
        }}
        className={className}
        {...props}
      />
    </div>
  );
};

export default Input;