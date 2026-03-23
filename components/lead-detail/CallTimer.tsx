"use client";
import { useState, useEffect, useRef } from "react";
import { Phone, PhoneOff, Clock } from "lucide-react";

interface CallTimerProps {
  /** Called when a call ends - passes duration string like "3:42" for pre-filling notes */
  onCallEnded?: (durationStr: string, durationSecs: number) => void;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function CallTimer({ onCallEnded }: CallTimerProps) {
  const [active, setActive] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef = useRef<number>(0);

  useEffect(() => {
    if (active) {
      startRef.current = Date.now() - elapsed * 1000;
      intervalRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
      }, 500);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const handleStart = () => {
    setElapsed(0);
    setActive(true);
  };

  const handleEnd = () => {
    setActive(false);
    const duration = elapsed;
    const durationStr = formatTime(duration);
    onCallEnded?.(durationStr, duration);
    // Brief delay before reset so caller can read it
    setTimeout(() => setElapsed(0), 3000);
  };

  if (!active && elapsed === 0) {
    return (
      <button
        onClick={handleStart}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
        style={{ background: "#C0392B" }}
      >
        <span className="w-2 h-2 rounded-full bg-white/80" />
        Start Call
      </button>
    );
  }

  return (
    <div className="inline-flex items-center gap-3">
      {/* Pulsing indicator + timer */}
      {active && (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-50 border border-red-200">
          {/* Pulsing red dot */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
          </span>
          <Clock className="w-3.5 h-3.5 text-red-600" />
          <span className="text-red-700 font-mono font-bold text-sm tracking-widest">
            {formatTime(elapsed)}
          </span>
        </div>
      )}

      {/* Ended state */}
      {!active && elapsed > 0 && (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-green-50 border border-green-200">
          <Phone className="w-3.5 h-3.5 text-green-600" />
          <span className="text-green-700 font-mono font-bold text-sm tracking-widest">
            {formatTime(elapsed)}
          </span>
          <span className="text-green-600 text-xs">saved</span>
        </div>
      )}

      {active && (
        <button
          onClick={handleEnd}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
          style={{ background: "#374151" }}
        >
          <PhoneOff className="w-4 h-4" />
          End Call
        </button>
      )}
    </div>
  );
}
