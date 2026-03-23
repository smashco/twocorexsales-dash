"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { X, Play, Pause, ChevronDown } from "lucide-react";

type Speed = "slow" | "medium" | "fast";

const SPEED_PX_PER_SEC: Record<Speed, number> = {
  slow: 30,
  medium: 60,
  fast: 110,
};

interface TeleprompterModeProps {
  script: string;
}

export function TeleprompterMode({ script }: TeleprompterModeProps) {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState<Speed>("medium");
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const stopScroll = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    lastTimeRef.current = null;
  }, []);

  const startScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const tick = (timestamp: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = timestamp;
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      el.scrollTop += (SPEED_PX_PER_SEC[speed] * delta) / 1000;

      // Stop at bottom
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 4;
      if (atBottom) {
        setPlaying(false);
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [speed]);

  useEffect(() => {
    if (playing) {
      startScroll();
    } else {
      stopScroll();
    }
    return stopScroll;
  }, [playing, startScroll, stopScroll]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setPlaying(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  // Reset scroll when opened
  const handleOpen = () => {
    setOpen(true);
    setPlaying(false);
    setTimeout(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    }, 50);
  };

  const handleClose = () => {
    setOpen(false);
    setPlaying(false);
  };

  const togglePlay = () => {
    // If at bottom on resume, scroll back to top
    if (!playing && scrollRef.current) {
      const el = scrollRef.current;
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 4) {
        el.scrollTop = 0;
      }
    }
    setPlaying((p) => !p);
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={handleOpen}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-purple-200 bg-purple-50 text-purple-700 text-xs font-medium hover:bg-purple-100 transition-colors"
      >
        📺 Teleprompter
      </button>

      {/* Full-screen overlay */}
      {open && (
        <div className="fixed inset-0 z-[200] flex flex-col bg-gray-950 text-white">
          {/* Controls bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              {/* Play / Pause */}
              <button
                onClick={togglePlay}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium"
              >
                {playing ? (
                  <>
                    <Pause className="w-4 h-4" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" /> Auto-scroll
                  </>
                )}
              </button>

              {/* Speed */}
              <div className="flex items-center gap-1 bg-white/10 rounded-xl p-1">
                {(["slow", "medium", "fast"] as Speed[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpeed(s)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-colors ${
                      speed === s ? "bg-white text-gray-900" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 text-white/40 text-xs">
              <span>Tap text to pause · ESC to exit</span>
              <button
                onClick={handleClose}
                className="p-2 rounded-xl hover:bg-white/10 transition-colors text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Script content — clickable to pause */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-8 py-10 cursor-pointer select-none"
            onClick={togglePlay}
            style={{ scrollBehavior: "auto" }}
          >
            <div className="max-w-3xl mx-auto">
              <p className="text-2xl leading-relaxed text-white/90 whitespace-pre-wrap font-light tracking-wide">
                {script}
              </p>
              {/* Bottom padding so last line scrolls into view */}
              <div className="h-64" />
            </div>
          </div>

          {/* Scroll indicator at bottom */}
          <div className="flex items-center justify-center py-4 text-white/30 text-xs gap-1 shrink-0">
            <ChevronDown className="w-4 h-4 animate-bounce" />
            <span>Scroll or press Auto-scroll</span>
          </div>
        </div>
      )}
    </>
  );
}
