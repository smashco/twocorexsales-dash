"use client";
import { useState, useEffect } from "react";

const REP_NAME_KEY = "tc_rep_name";

interface RepIdentityProps {
  /** If true, only renders the topbar chip (no modal logic - use the hook instead) */
  chipOnly?: boolean;
}

export function useRepName(): { repName: string | null; setRepName: (n: string) => void } {
  const [repName, setRepNameState] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(REP_NAME_KEY);
    if (stored) setRepNameState(stored);
  }, []);

  const setRepName = (name: string) => {
    localStorage.setItem(REP_NAME_KEY, name);
    setRepNameState(name);
  };

  return { repName, setRepName };
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function RepIdentity({ chipOnly = false }: RepIdentityProps) {
  const [repName, setRepNameState] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editVal, setEditVal] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(REP_NAME_KEY);
    if (stored) {
      setRepNameState(stored);
    } else if (!chipOnly) {
      // Delay so it doesn't flash on SSR hydration
      const t = setTimeout(() => setShowModal(true), 400);
      return () => clearTimeout(t);
    }
  }, [chipOnly]);

  const handleSave = () => {
    const trimmed = inputVal.trim();
    if (!trimmed) return;
    localStorage.setItem(REP_NAME_KEY, trimmed);
    setRepNameState(trimmed);
    setShowModal(false);
    setInputVal("");
  };

  const handleEdit = () => {
    setEditVal(repName ?? "");
    setShowEditModal(true);
  };

  const handleEditSave = () => {
    const trimmed = editVal.trim();
    if (!trimmed) return;
    localStorage.setItem(REP_NAME_KEY, trimmed);
    setRepNameState(trimmed);
    setShowEditModal(false);
  };

  if (!mounted) return null;

  return (
    <>
      {/* Topbar chip */}
      {repName ? (
        <button
          onClick={handleEdit}
          className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors group"
          title="Change your name"
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
            style={{ background: "var(--navy, #1A2744)" }}
          >
            {getInitials(repName)}
          </div>
          <span className="text-sm font-medium text-gray-700 hidden sm:block">{repName}</span>
        </button>
      ) : (
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-dashed border-gray-300 text-xs text-gray-400 hover:border-gray-400 hover:text-gray-600 transition-colors"
        >
          + Set your name
        </button>
      )}

      {/* First-time name modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl mb-4 mx-auto"
              style={{ background: "var(--navy, #1A2744)" }}
            >
              👋
            </div>
            <h2 className="text-xl font-bold text-gray-800 text-center mb-1">
              Welcome to SalesIQ
            </h2>
            <p className="text-sm text-gray-500 text-center mb-5">
              What&apos;s your name? We&apos;ll use it across call logs and activity.
            </p>
            <input
              autoFocus
              className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-300 mb-3"
              placeholder="e.g. Arjun Shah"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
            />
            <button
              onClick={handleSave}
              disabled={!inputVal.trim()}
              className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-opacity disabled:opacity-40"
              style={{ background: "var(--navy, #1A2744)" }}
            >
              Let&apos;s Go
            </button>
          </div>
        </div>
      )}

      {/* Edit name modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowEditModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Edit your name</h2>
            <input
              autoFocus
              className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-300 mb-3"
              value={editVal}
              onChange={(e) => setEditVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleEditSave();
                if (e.key === "Escape") setShowEditModal(false);
              }}
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 py-2.5 rounded-xl border text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                disabled={!editVal.trim()}
                className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity disabled:opacity-40"
                style={{ background: "var(--navy, #1A2744)" }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
