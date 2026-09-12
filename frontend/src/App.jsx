import { useCallback, useEffect, useState } from 'react';
import { config } from './config';
import Starfield from './components/Starfield';
import Confetti from './components/Confetti';
import Envelope from './components/Envelope';
import Letter from './components/Letter';
import Gallery from './components/Gallery';
import Reasons from './components/Reasons';
import Cake from './components/Cake';
import useReveal from './hooks/useReveal';

const STAGE = {
  SEALED: 'sealed',
  OPENING: 'opening',
  LETTER: 'letter',
  JOURNEY: 'journey',
};

function Finale({ onReplay, onCelebrate }) {
  const [ref, shown] = useReveal();

  return (
    <section className="mx-auto max-w-3xl px-5 pb-32 pt-16 text-center">
      <div
        ref={ref}
        className={`transition-all duration-1000 ${
          shown ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="hairline mx-auto mb-12 w-56" />
        <p className="font-script text-5xl gold-text sm:text-7xl">{config.finale.line}</p>
        <p className="mt-6 font-serif text-lg text-cream/60 sm:text-xl">{config.finale.sub}</p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={onCelebrate}
            className="rounded-full bg-gradient-to-r from-gold to-rose px-8 py-3 font-sans text-xs uppercase tracking-[0.3em] text-ink transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            One more time 🎉
          </button>
          <button
            type="button"
            onClick={onReplay}
            className="rounded-full border border-cream/20 px-8 py-3 font-sans text-xs uppercase tracking-[0.3em] text-cream/70 transition-colors duration-300 hover:border-gold/50 hover:text-gold"
          >
            Reseal the letter
          </button>
        </div>

        <p className="mt-16 font-sans text-[10px] uppercase tracking-[0.4em] text-cream/25">
          made by {config.from}
        </p>
      </div>
    </section>
  );
}

export default function App() {
  const [stage, setStage] = useState(STAGE.SEALED);
  const [burst, setBurst] = useState(0);

  const celebrate = useCallback(() => setBurst((n) => n + 1), []);

  const openEnvelope = useCallback(() => {
    if (stage !== STAGE.SEALED) return;
    setStage(STAGE.OPENING);
    setTimeout(celebrate, 450);
    setTimeout(() => setStage(STAGE.LETTER), 1900);
  }, [stage, celebrate]);

  const goJourney = useCallback(() => {
    setStage(STAGE.JOURNEY);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const replay = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setStage(STAGE.SEALED), 400);
  }, []);

  useEffect(() => {
    document.title = `Happy Birthday, ${config.name} ✦`;
  }, []);

  return (
    <main className="relative min-h-screen font-sans">
      <Starfield />
      <Confetti trigger={burst} />

      {(stage === STAGE.SEALED || stage === STAGE.OPENING) && (
        <div className="flex min-h-screen items-center justify-center px-5">
          <Envelope opened={stage === STAGE.OPENING} onOpen={openEnvelope} />
        </div>
      )}

      {stage === STAGE.LETTER && <Letter onContinue={goJourney} />}

      {stage === STAGE.JOURNEY && (
        <div className="animate-fade-up" style={{ animationDuration: '1s' }}>
          <section className="flex min-h-[85vh] flex-col items-center justify-center px-5 text-center">
            <p className="font-sans text-[11px] uppercase tracking-[0.45em] text-gold/70">
              {config.hero.kicker}
            </p>
            <h1 className="mt-8 font-script text-6xl leading-[1.05] gold-text sm:text-8xl">
              {config.name}
            </h1>
            <p className="mt-8 max-w-md font-serif text-xl text-cream/65 sm:text-2xl">
              {config.hero.line}
            </p>
            <div className="mt-16 animate-float text-2xl text-gold/60">↓</div>
          </section>

          <Gallery />
          <Reasons />
          <Cake onAllBlown={celebrate} />
          <Finale onReplay={replay} onCelebrate={celebrate} />
        </div>
      )}
    </main>
  );
}