import { useEffect, useState } from 'react';
import { config } from '../config';
import useReveal from '../hooks/useReveal';

export default function Cake({ onAllBlown }) {
  const [ref, shown] = useReveal();
  const [lit, setLit] = useState(() => Array(config.cake.candles).fill(true));
  const allOut = lit.length > 0 && lit.every((l) => !l);

  const blow = (index) => {
    setLit((prev) => {
      if (!prev[index]) return prev;
      const next = [...prev];
      next[index] = false;
      return next;
    });
  };

  useEffect(() => {
    if (allOut && typeof onAllBlown === 'function') onAllBlown();
  }, [allOut, onAllBlown]);

  return (
    <section className="mx-auto max-w-3xl px-5 py-24 text-center sm:py-32">
      <div
        ref={ref}
        className={`transition-all duration-1000 ${
          shown ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <p className="font-sans text-[11px] uppercase tracking-[0.45em] text-gold/70">Chapter three</p>
        <h2 className="mt-4 font-serif text-4xl gold-text sm:text-5xl">
          {allOut ? 'Wish made' : config.cake.prompt}
        </h2>
        <p className="mt-3 font-sans text-sm text-cream/45">
          {allOut ? config.cake.wish : `(${config.cake.hint})`}
        </p>

        {/* ── cake ── */}
        <div className="relative mx-auto mt-16 w-[260px] sm:w-[320px]">
          {/* candles */}
          <div className="relative z-20 flex items-end justify-center gap-4 sm:gap-6">
            {lit.map((isLit, i) => (
              <button
                key={i}
                type="button"
                onClick={() => blow(i)}
                aria-label={isLit ? `Blow out candle ${i + 1}` : `Candle ${i + 1} is out`}
                className="group relative h-[58px] w-[10px] cursor-pointer rounded-sm transition-transform duration-300 hover:-translate-y-1"
                style={{
                  background:
                    i % 2 === 0
                      ? 'repeating-linear-gradient(45deg,#ffd7e3 0 5px,#ff8fab 5px 10px)'
                      : 'repeating-linear-gradient(45deg,#fff3d0 0 5px,#f5c76a 5px 10px)',
                }}
              >
                {/* wick */}
                <span className="absolute -top-2 left-1/2 h-2 w-[2px] -translate-x-1/2 bg-plum" />

                {isLit ? (
                  <>
                    <span
                      className="absolute -top-[26px] left-1/2 h-[22px] w-[13px] -translate-x-1/2"
                      style={{
                        background:
                          'radial-gradient(circle at 50% 75%, #fff6d6 0%, #f5c76a 40%, #ff7a3c 75%, rgba(255,122,60,0) 100%)',
                        borderRadius: '50% 50% 50% 50% / 62% 62% 38% 38%',
                        animation: `flicker 0.55s ease-in-out infinite`,
                        animationDelay: `${i * 0.11}s`,
                      }}
                    />
                    <span className="absolute -top-[30px] left-1/2 h-10 w-10 -translate-x-1/2 rounded-full bg-gold/25 blur-xl" />
                  </>
                ) : (
                  <span
                    className="absolute -top-4 left-1/2 h-3 w-3 rounded-full bg-cream/35 blur-[3px]"
                    style={{ animation: 'smokeUp 2.4s ease-out infinite' }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* tiers */}
          <div className="relative z-10 -mt-1">
            <div className="mx-auto h-[52px] w-[62%] rounded-t-md bg-gradient-to-b from-[#ffd9e6] to-[#f7a8c4] shadow-[inset_0_-8px_0_rgba(0,0,0,0.08)]">
              <div className="h-3 w-full rounded-t-md bg-[#fff4f8]" />
            </div>
            <div className="mx-auto h-[58px] w-[82%] bg-gradient-to-b from-[#e7cff6] to-[#c39ae6] shadow-[inset_0_-8px_0_rgba(0,0,0,0.08)]">
              <div className="h-3 w-full bg-[#f6ecff]" />
            </div>
            <div className="mx-auto h-[64px] w-full rounded-b-2xl bg-gradient-to-b from-[#f7e0b8] to-[#d8a75f] shadow-[inset_0_-10px_0_rgba(0,0,0,0.1)]">
              <div className="h-3 w-full bg-[#fff6e6]" />
            </div>
            <div className="mx-auto mt-1 h-2 w-[112%] -translate-x-[5%] rounded-full bg-black/40 blur-md" />
          </div>
        </div>

        {allOut && (
          <p
            className="mt-14 font-script text-4xl text-gold animate-fade-up sm:text-5xl"
            style={{ animationDelay: '0.2s' }}
          >
            Happy Birthday, {config.name}
          </p>
        )}
      </div>
    </section>
  );
}