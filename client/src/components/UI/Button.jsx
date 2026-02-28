// Button.jsx
const Button = ({ children, className = "", variant = "primary", ...props }) => {
  const base = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.875rem",
    fontWeight: 500,
    padding: "9px 18px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    transition: "all 0.22s",
    lineHeight: 1,
  };

  const styles = {
    primary: {
      ...base,
      background: "linear-gradient(135deg, #f59e0b, #d97706)",
      color: "white",
      boxShadow: "0 3px 12px rgba(245,158,11,0.2)",
    },
    secondary: {
      ...base,
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.09)",
      color: "#9ca3af",
    },
    danger: {
      ...base,
      background: "rgba(239,68,68,0.1)",
      border: "1px solid rgba(239,68,68,0.2)",
      color: "#fca5a5",
    },
  };

  return (
    <button
      style={styles[variant] || styles.primary}
      onMouseEnter={e => { if (!props.disabled) e.currentTarget.style.transform = "translateY(-1px)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;