const SessionCard = ({ user, logout }) => {
  return (
    <div className="s-card se se4">
      <div className="s-ch">
        <div className="s-chi chi-ghost">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </div>
        <div>
          <div className="s-ch-title">Session</div>
          <div className="s-ch-sub">Sign out of your vault</div>
        </div>
      </div>

      <div className="s-cb">
        <div className="s-so-row">
          <div>
            <div className="s-so-user">
              Signed in as&ensp;
              <span style={{ color: "#fbbf24" }}>{user?.username}</span>
            </div>
            <div className="s-so-hint">
              Ends your session.<br />Your vault stays safe until you return.
            </div>
          </div>
          <button className="s-btn s-btn-ghost" onClick={logout}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;