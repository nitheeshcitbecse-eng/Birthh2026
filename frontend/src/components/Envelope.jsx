import { config } from '../config';

/**
 * The sealed envelope. `opened` drives the flap + letter animation.
 */
export default function Envelope({ opened, onOpen }) {
  return (
    <div className="flex flex-col items-center">
      <p
        className="mb-8 text-center font-sans text-[11px] uppercase tracking-[0.45em] text-gold/70 animate-fade-up"
        style={{ animationDelay: '0.2s' }}
      >
        {config.envelope.eyebrow}
      </p>

      <div
        className="perspective animate-float"
        style={{ animationPlayState: opened ? 'paused' : 'running' }}
      >
        <div
          className={`relative h-[220px] w-[320px] transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:h-[290px] sm:w-[430px] ${
            opened ? 'scale-90 -translate-y-2' : ''
          }`}
        >
          {/* ── the letter peeking out ── */}
          <div
            className={`absolute inset-x-5 bottom-4 z-20 origin-bottom rounded-sm bg-gradient-to-b from-cream to-[#efe3cf] shadow-paper transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              opened
                ? '-translate-y-[62%] opacity-100 delay-[650ms]'
                : 'translate-y-6 opacity-0'
            }`}
            style={{ height: '78%' }}
          >
            <div className="flex h-full flex-col justify-center gap-2.5 px-7">
              <div className="h-2 w-1/3 rounded-full bg-plum/20" />
              <div className="h-1.5 w-full rounded-full bg-plum/12" />
              <div className="h-1.5 w-11/12 rounded-full bg-plum/12" />
              <div className="h-1.5 w-4/5 rounded-full bg-plum/12" />
              <div className="mt-2 h-2 w-1/4 rounded-full bg-rose/30" />
            </div>
          </div>

          {/* ── envelope back ── */}
          <div className="absolute inset-0 z-10 rounded-md bg-gradient-to-br from-[#3a2358] via-[#2a1742] to-[#1b0f2e] shadow-paper" />

          {/* ── envelope front face with V notch ── */}
          <div
            className="absolute inset-0 z-30 rounded-md bg-gradient-to-br from-[#4a2d6e] via-[#33204f] to-[#211337]"
            style={{ clipPath: 'polygon(0 0, 50% 46%, 100% 0, 100% 100%, 0 100%)' }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.08)_50%,transparent_65%)]" />
            <div className="absolute bottom-4 left-0 right-0 text-center font-script text-xl text-gold/40">
              for {config.name}
            </div>
          </div>

          {/* ── the flap ── */}
          <div
            className={`absolute inset-x-0 top-0 origin-top transition-transform duration-[900ms] ease-[cubic-bezier(0.6,0,0.3,1)] ${
              opened ? '[transform:rotateX(-172deg)] z-[15]' : '[transform:rotateX(0deg)] z-40'
            }`}
            style={{ height: '58%', transformStyle: 'preserve-3d' }}
          >
            <div
              className="h-full w-full rounded-t-md bg-gradient-to-b from-[#55347e] to-[#33204f] backface-hidden"
              style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.12),transparent_55%)]" />
            </div>
          </div>

          {/* ── wax seal ── */}
          <button
            type="button"
            onClick={onOpen}
            disabled={opened}
            aria-label="Open the letter"
            className={`absolute left-1/2 top-[52%] z-[45] flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-700 sm:h-20 sm:w-20 ${
              opened
                ? 'pointer-events-none scale-150 opacity-0'
                : 'animate-pulse-glow cursor-pointer hover:scale-110 active:scale-95'
            }`}
            style={{
              background: 'radial-gradient(circle at 32% 28%, #ff9fb8 0%, #e0416f 45%, #8c1b3d 100%)',
            }}
          >
            <span className="font-script text-3xl text-cream drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)] sm:text-4xl">
              {config.initial}
            </span>
            <span className="absolute inset-[6px] rounded-full border border-cream/25" />
          </button>
        </div>
      </div>

      <p
        className={`mt-12 font-sans text-xs uppercase tracking-[0.35em] text-cream/45 transition-opacity duration-500 ${
          opened ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {config.envelope.hint}
      </p>
    </div>
  );
}