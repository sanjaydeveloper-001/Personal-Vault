import { fmtBytes, MAX_STORAGE_BYTES } from "./settingsStyles";

const StorageCard = ({ storage, loading }) => {
  const usedPct  = Math.min(100, (storage.totalBytes / MAX_STORAGE_BYTES) * 100);
  const stoCls   = usedPct >= 85 ? "sto-danger" : usedPct >= 60 ? "sto-warning" : "sto-safe";
  const stoColor = usedPct >= 85 ? "#f87171" : usedPct >= 60 ? "#fbbf24" : "#4ade80";
  const freeBytes = Math.max(0, MAX_STORAGE_BYTES - storage.totalBytes);

  return (
    <div className="s-card se se2">
      <div className="s-ch">
        <div className="s-chi chi-sky">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2">
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M21 12c0 1.66-4.03 3-9 3S3 13.66 3 12" />
            <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
          </svg>
        </div>
        <div>
          <div className="s-ch-title">Storage</div>
          <div className="s-ch-sub">512 MB total allowance per account</div>
        </div>
      </div>

      <div className="s-cb">
        <div className="s-sto-top">
          <span className="s-sto-pct" style={{ color: loading ? "#4b5563" : stoColor }}>
            {loading ? "Loading…" : `${usedPct < 0.1 ? "< 0.1" : usedPct.toFixed(1)}% used`}
          </span>
          <span className="s-sto-of">
            {!loading && `${fmtBytes(storage.totalBytes)} / 512 MB`}
          </span>
        </div>

        <div className="s-sto-track">
          <div
            className={`s-sto-bar ${stoCls}`}
            style={{ width: loading ? "0%" : `${Math.max(usedPct, 0.3)}%` }}
          />
        </div>

        <div className="s-sto-msg" style={{ color: stoColor }}>
          {!loading && (
            usedPct >= 85
              ? "⚠️  Almost full — clear files to free up space"
              : usedPct >= 60
              ? "📦  Getting full — consider removing old items"
              : `✓  ${fmtBytes(freeBytes)} remaining`
          )}
        </div>

        <div className="s-sto-grid">
          {[
            { label: "Files", val: storage.fileBytes, color: "#f472b6" },
            { label: "Notes", val: storage.noteBytes, color: "#818cf8" },
            { label: "Links", val: storage.linkBytes, color: "#34d399" },
            { label: "Items", val: null, count: storage.itemCount, color: "#6b7280" },
          ].map(({ label, val, count, color }) => (
            <div className="s-sto-chip" key={label}>
              <div className="s-sto-dot" style={{ background: color }} />
              <div>
                <div className="s-sto-lbl">{label}</div>
                <div className="s-sto-val">{val !== null ? fmtBytes(val) : count}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StorageCard;