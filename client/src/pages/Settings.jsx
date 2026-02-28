import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { itemService } from "../services/itemService";
import { STYLES, MAX_STORAGE_BYTES } from "../components/Settings/settingsStyles";

// Sub-components
import ProfileCard        from "../components/Settings/ProfileCard";
import StorageCard        from "../components/Settings/StorageCard";
import SecurityInfoCard   from "../components/Settings/SecurityInfoCard";
import ChangePasswordCard from "../components/Settings/ChangePasswordCard";
import TrashCard          from "../components/Settings/TrashCard";
import SessionCard        from "../components/Settings/SessionCard";
import DeleteTrashModal   from "../components/Settings/DeleteTrashModal";

const Settings = () => {
  const { user, logout, updateUser } = useAuth();

  /* ── Storage state ── */
  const [storage, setStorage] = useState({
    totalBytes: 0, fileBytes: 0, noteBytes: 0, linkBytes: 0, itemCount: 0,
  });
  const [storageLoading, setStorageLoading] = useState(true);

  /* ── Trash state ── */
  const [trashItems, setTrashItems]         = useState([]);
  const [showTrashModal, setShowTrashModal] = useState(false);
  const [emptyingTrash, setEmptyingTrash]   = useState(false);

  /* ── Load data on mount ── */
  useEffect(() => {
    (async () => {
      setStorageLoading(true);
      try {
        const [ar, tr] = await Promise.all([
          itemService.getItems(),
          itemService.getTrashItems(),
        ]);
        const active = ar?.data ?? ar ?? [];
        const trash  = tr?.data ?? tr ?? [];
        setTrashItems(trash);

        const all = [...active, ...trash];
        let fb = 0, nb = 0, lb = 0;
        all.forEach((i) => {
          if (i.type === "file")       fb += i.metadata?.size || 0;
          else if (i.type === "note")  nb += new Blob([i.content || ""]).size;
          else if (i.type === "link")  lb += new Blob([i.content || ""]).size;
        });
        setStorage({ totalBytes: fb + nb + lb, fileBytes: fb, noteBytes: nb, linkBytes: lb, itemCount: all.length });
      } catch { /* silent */ }
      finally { setStorageLoading(false); }
    })();
  }, []);

  const trashSize = trashItems.reduce((s, i) => s + (i.metadata?.size || 0), 0);

  /* ── Empty trash handler ── */
  const handleEmptyTrash = async () => {
    setEmptyingTrash(true);
    try {
      await itemService.emptyTrash();
      setTrashItems([]);

      // Refresh storage after emptying
      const ar = await itemService.getItems();
      const active = ar?.data ?? ar ?? [];
      let fb = 0, nb = 0, lb = 0;
      active.forEach((i) => {
        if (i.type === "file")       fb += i.metadata?.size || 0;
        else if (i.type === "note")  nb += new Blob([i.content || ""]).size;
        else if (i.type === "link")  lb += new Blob([i.content || ""]).size;
      });
      setStorage({ totalBytes: fb + nb + lb, fileBytes: fb, noteBytes: nb, linkBytes: lb, itemCount: active.length });
      toast.success(`Trash emptied · ${trashSize > 0 ? `space freed` : "done"}`);
    } catch {
      toast.error("Failed to empty trash");
    } finally {
      setEmptyingTrash(false);
    }
  };

  /* ────────────────── RENDER ────────────────── */
  return (
    <div className="s-page">
      <style>{STYLES}</style>

      {/* Page header */}
      <div className="se se1">
        <div className="s-eyebrow">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="8" r="4" />
            <path d="M6 20v-2a6 6 0 0 1 12 0v2" />
          </svg>
          Account
        </div>
        <h1 className="s-headline">Settings</h1>
        <p className="s-tagline">Manage your profile, security &amp; storage</p>
      </div>

      <div className="s-grid">

        {/* Row 1: Profile | Storage */}
        <ProfileCard user={user} updateUser={updateUser} />
        <StorageCard storage={storage} loading={storageLoading} />

        {/* Row 2: Change Password (full width) */}
        <ChangePasswordCard />

        {/* Row 3: Trash | Security Overview */}
        <SecurityInfoCard user={user} />
        <TrashCard
          trashItems={trashItems}
          trashSize={trashSize}
          emptyingTrash={emptyingTrash}
          onEmptyClick={() => setShowTrashModal(true)}
        />

        {/* Row 4: Session (full width) */}
        <SessionCard user={user} logout={logout} />

      </div>

      {/* Delete Trash Modal */}
      <DeleteTrashModal
        isOpen={showTrashModal}
        onClose={() => setShowTrashModal(false)}
        onConfirm={handleEmptyTrash}
        trashCount={trashItems.length}
        trashSize={trashSize}
      />
    </div>
  );
};

export default Settings;