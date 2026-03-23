"use client";
import { useEffect, useRef, useState } from "react";

interface DealWonCelebrationProps {
  show: boolean;
  monthlyPrice?: number;
  companyName?: string;
  onDismiss: () => void;
}

// Generate random confetti pieces
function generateConfetti(count: number) {
  const colors = [
    "#F59E0B", "#EF4444", "#10B981", "#3B82F6", "#8B5CF6",
    "#EC4899", "#14B8A6", "#F97316", "#84CC16", "#06B6D4",
  ];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    color: colors[Math.floor(Math.random() * colors.length)],
    left: Math.random() * 100,
    animDuration: 2.5 + Math.random() * 2,
    animDelay: Math.random() * 1.5,
    size: 6 + Math.random() * 8,
    rotation: Math.random() * 360,
    shape: Math.random() > 0.5 ? "rect" : "circle",
  }));
}

const CONFETTI = generateConfetti(80);

function playSuccessChirp() {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();

    const play = (freq: number, start: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
      gain.gain.setValueAtTime(0, ctx.currentTime + start);
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + duration);
      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + start + duration);
    };

    // Happy ascending chirp
    play(523, 0, 0.15);    // C5
    play(659, 0.12, 0.15); // E5
    play(784, 0.24, 0.2);  // G5
    play(1047, 0.4, 0.35); // C6
  } catch {
    // Web Audio not supported - silently ignore
  }
}

export function DealWonCelebration({ show, monthlyPrice, companyName, onDismiss }: DealWonCelebrationProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      playSuccessChirp();
      timerRef.current = setTimeout(() => {
        setVisible(false);
        onDismiss();
      }, 3500);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [show, onDismiss]);

  const handleClick = () => {
    setVisible(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    onDismiss();
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(-10px) rotate(var(--rot)); opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateY(110vh) rotate(calc(var(--rot) + 720deg)); opacity: 0; }
        }
        @keyframes celebrationPop {
          0%   { transform: scale(0.5); opacity: 0; }
          60%  { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes shimmer {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .confetti-piece {
          position: fixed;
          top: -10px;
          animation: confettiFall var(--dur) ease-in var(--delay) forwards;
        }
        .celebration-card {
          animation: celebrationPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .shimmer-text {
          animation: shimmer 1.5s ease-in-out infinite;
        }
      `}</style>

      {/* Overlay */}
      <div
        className="fixed inset-0 z-[300] flex items-center justify-center cursor-pointer"
        style={{ background: "rgba(0,0,0,0.6)" }}
        onClick={handleClick}
      >
        {/* Confetti */}
        {CONFETTI.map((c) => (
          <div
            key={c.id}
            className="confetti-piece pointer-events-none"
            style={{
              left: `${c.left}%`,
              width: c.size,
              height: c.shape === "rect" ? c.size * 1.6 : c.size,
              background: c.color,
              borderRadius: c.shape === "circle" ? "50%" : "2px",
              "--rot": `${c.rotation}deg`,
              "--dur": `${c.animDuration}s`,
              "--delay": `${c.animDelay}s`,
            } as React.CSSProperties}
          />
        ))}

        {/* Card */}
        <div
          className="celebration-card relative bg-white rounded-3xl shadow-2xl px-10 py-10 text-center max-w-sm w-full mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Deal Closed!</h2>
          {companyName && (
            <p className="text-base text-gray-600 mb-3">{companyName}</p>
          )}
          {monthlyPrice && (
            <div
              className="shimmer-text text-3xl font-black mb-4"
              style={{ color: "#1E8449" }}
            >
              ₹{monthlyPrice.toLocaleString("en-IN")}/month
            </div>
          )}
          {monthlyPrice && (
            <p className="text-sm text-gray-500 mb-5">
              That&apos;s ₹{(monthlyPrice * 12).toLocaleString("en-IN")} per year for TwoCoreX! 🚀
            </p>
          )}
          <button
            onClick={handleClick}
            className="px-6 py-2.5 rounded-xl text-white text-sm font-semibold"
            style={{ background: "#1E8449" }}
          >
            Awesome, let&apos;s keep going!
          </button>
          <p className="text-xs text-gray-400 mt-3">Auto-dismisses in 3 seconds · Click anywhere to close</p>
        </div>
      </div>
    </>
  );
}
