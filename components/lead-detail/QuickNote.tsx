"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { StickyNote } from "lucide-react";

interface QuickNoteProps {
  leadId: string;
}

const NOTE_PREFIX = "tc_note_";
const DEBOUNCE_MS = 600;

export function QuickNote({ leadId }: QuickNoteProps) {
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(true);
  const [mounted, setMounted] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(`${NOTE_PREFIX}${leadId}`);
    if (stored) setNote(stored);
  }, [leadId]);

  const persistNote = useCallback(
    (value: string) => {
      localStorage.setItem(`${NOTE_PREFIX}${leadId}`, value);
      setSaved(true);
    },
    [leadId]
  );

  const handleChange = (value: string) => {
    setNote(value);
    setSaved(false);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => persistNote(value), DEBOUNCE_MS);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="rounded-xl p-4 shadow-sm relative"
      style={{
        background: "linear-gradient(135deg, #FFF9C4 0%, #FFF176 60%, #FFEE58 100%)",
        border: "1px solid #F9D700",
      }}
    >
      {/* Fold corner effect */}
      <div
        className="absolute bottom-0 right-0 w-6 h-6"
        style={{
          background: "linear-gradient(135deg, transparent 50%, #E6CC00 50%)",
          borderRadius: "0 0 0.75rem 0",
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <StickyNote className="w-3.5 h-3.5 text-yellow-700" />
          <span className="text-xs font-bold text-yellow-800 uppercase tracking-wide">
            Note to self
          </span>
        </div>
        <span className="text-xs text-yellow-600">
          {saved ? "✓ saved" : "saving..."}
        </span>
      </div>

      {/* Textarea */}
      <textarea
        value={note}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Quick thoughts, reminders, follow-up ideas..."
        rows={4}
        className="w-full resize-none text-sm text-yellow-900 placeholder:text-yellow-600/60 outline-none bg-transparent leading-relaxed"
        style={{
          fontFamily: "'Segoe UI', system-ui, sans-serif",
        }}
      />

      {note.length > 0 && (
        <div className="flex justify-end mt-1">
          <span className="text-xs text-yellow-600">{note.length} chars</span>
        </div>
      )}
    </div>
  );
}
