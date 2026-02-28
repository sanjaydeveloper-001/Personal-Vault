import { fmtBytes, SpinnerIcon } from "./settingsStyles";

const TrashCard = ({ trashItems, trashSize, emptyingTrash, onEmptyClick }) => {
  const isEmpty = trashItems.length === 0;

  return (
    <div
      className="s-card se se4"
      style={{ border: "1px solid rgba(239,68,68,0.12)", background: "#09080a" }}
    >
      {/* Header */}
      <div
        className="s-ch"
        style={{
          background: "rgba(239,68,68,0.03)",
          borderBottom: "1px solid rgba(239,68,68,0.08)",
        }}
      >
        <div
          className="s-chi"
          style={{
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.14)",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
          </svg>
        </div>
        <div>
          <div className="s-ch-title">Trash</div>
          <div className="s-ch-sub">Permanently remove deleted items</div>
        </div>
        {!isEmpty && (
          <span
            style={{
              marginLeft: "auto",
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.2)",
              color: "#fca5a5",
              borderRadius: 20,
              padding: "2px 10px",
              fontSize: "0.65rem",
              fontWeight: 600,
            }}
          >
            {trashItems.length} item{trashItems.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="s-cb">
        {isEmpty ? (
          /* ── Compact empty state ── */
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "4px 0",
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 11,
                flexShrink: 0,
                background: "rgba(239,68,68,0.05)",
                border: "1px solid rgba(239,68,68,0.09)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4b5563" strokeWidth="1.5">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
              </svg>
            </div>
            <div>
              <div style={{ color: "#6b7280", fontSize: "0.84rem", fontWeight: 500 }}>
                Trash is empty
              </div>
              <div style={{ color: "#374151", fontSize: "0.7rem", marginTop: 2 }}>
                Deleted items will appear here
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div style={{ display: "flex", gap: 8, marginBottom: 13 }}>
              {[
                { val: trashItems.length, label: "Items" },
                { val: fmtBytes(trashSize), label: "Space", small: true },
                { val: trashItems.filter((i) => i.type === "file").length, label: "Files" },
              ].map(({ val, label, small }) => (
                <div
                  key={label}
                  style={{
                    flex: 1,
                    background: "rgba(239,68,68,0.04)",
                    border: "1px solid rgba(239,68,68,0.09)",
                    borderRadius: 11,
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: small ? "1.05rem" : "1.4rem",
                      color: "#fca5a5",
                      lineHeight: 1,
                    }}
                  >
                    {val}
                  </div>
                  <div
                    style={{
                      fontSize: "0.66rem",
                      color: "#6b7280",
                      marginTop: 4,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Empty button */}
            <button
              className="s-btn s-btn-fw"
              style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.2)",
                color: "#fca5a5",
              }}
              disabled={emptyingTrash}
              onClick={onEmptyClick}
            >
              {emptyingTrash ? (
                <SpinnerIcon />
              ) : (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                </svg>
              )}
              {emptyingTrash
                ? "Emptying…"
                : `Empty Trash (${trashItems.length} item${trashItems.length !== 1 ? "s" : ""})`}
            </button>

            <p
              style={{
                color: "#374151",
                fontSize: "0.68rem",
                marginTop: 7,
                textAlign: "center",
              }}
            >
              Type a phrase to confirm · Cannot be undone
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default TrashCard;