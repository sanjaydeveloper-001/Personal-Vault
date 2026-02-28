const SecurityInfoCard = ({ user }) => {
  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  const items = [
    {
      label: "Account Status",
      value: "Active & Secured",
      color: "#34d399",
      icon: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
    },
    {
      label: "Encryption",
      value: "End-to-end",
      color: "#818cf8",
      icon: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
    },
    {
      label: "Member Since",
      value: joinedDate,
      color: "#fbbf24",
      icon: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      label: "Storage Plan",
      value: "Free Vault · 512 MB",
      color: "#38bdf8",
      icon: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4.03 3-9 3S3 13.66 3 12" />
          <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
        </svg>
      ),
    },
    {
      label: "2FA Status",
      value: "Not configured",
      color: "#f59e0b",
      icon: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      label: "Last Activity",
      value: "Just now",
      color: "#9ca3af",
      icon: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
  ];

  return (
    <div className="s-card s-span2 se se2" style={{ display: "flex", flexDirection: "column" }}>
      <div className="s-ch">
        <div className="s-chi chi-green">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <div>
          <div className="s-ch-title">Security Overview</div>
          <div className="s-ch-sub">Your account at a glance</div>
        </div>
      </div>

      <div className="s-cb" style={{ flex: 1 }}>
        {items.map(({ label, value, color, icon }) => (
          <div className="s-sec-item" key={label}>
            <div className="s-sec-ico">{icon}</div>
            <div>
              <div className="s-sec-label">{label}</div>
              <div className="s-sec-val" style={{ color }}>{value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityInfoCard;