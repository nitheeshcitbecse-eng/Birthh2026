import { useEffect, useState } from 'react';
import { config } from '../config';

function useTypewriter(text, speed = 55, start = true) {
  const [typed, setTyped] = useState({ source: text, out: '' });

  useEffect(() => {
    if (!start) return undefined;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped({ source: text, out: text.slice(0, i) });
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, start]);

  // Derived during render rather than reset inside the effect: a new `text`
  // starts from empty immediately, with no extra render and no stale flash.
  return typed.source === text ? typed.out : '';
}

export default function Letter({ onContinue }) {
  const [ready, setReady] = useState(false);
  const [done, setDone] = useState(false);
  const typed = useTypewriter(config.letter.greeting, 55, ready);

  useEffect(() => {
    const t1 = setTimeout(() => setReady(true), 500);
    const t2 = setTimeout(() => setDone(true), config.letter.greeting.length * 55 + 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <article
        className="relative w-full max-w-2xl rounded-[4px] px-7 py-12 shadow-paper animate-fade-up sm:px-14 sm:py-16"
        style={{
          background:
            'linear-gradient(175deg, #fbf4e6 0%, #f3e8d4 55%, #e9dcc4 100%)',
          animationDuration: '1.1s',
        }}
      >
        {/* paper texture + fold line */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:repeating-linear-gradient(0deg,#000_0_1px,transparent_1px_4px)]" />
        <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-px bg-plum/10" />

        <header className="relative mb-8 text-center">
          <p className="font-sans text-[10px] uppercase tracking-[0.5em] text-plum/40">
            {new Date().toLocaleDateString(undefined, {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
          <h1
            className={`mt-5 font-script text-4xl leading-tight text-[#5b2140] sm:text-6xl ${
              typed.length < config.letter.greeting.length ? 'caret' : ''
            }`}
          >
            {typed || '\u00A0'}
          </h1>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-[#b07a3f] to-transparent" />
        </header>

        <div className="relative space-y-6">
          {config.letter.paragraphs.map((p, i) => (
            <p
              key={i}
              className="font-serif text-[17px] leading-relaxed text-[#332038] opacity-0 animate-fade-up sm:text-xl"
              style={{
                animationDelay: `${config.letter.greeting.length * 0.055 + 0.5 + i * 0.6}s`,
              }}
            >
              {p}
            </p>
          ))}
        </div>

        <footer
          className="relative mt-12 text-right opacity-0 animate-fade-up"
          style={{
            animationDelay: `${
              config.letter.greeting.length * 0.055 + 0.5 + config.letter.paragraphs.length * 0.6
            }s`,
          }}
        >
          <p className="font-serif italic text-[#332038]/70">{config.letter.signoff}</p>
          <p className="mt-1 font-script text-4xl text-[#5b2140]">{config.from}</p>
        </footer>

        <div className="relative mt-14 flex justify-center">
          <button
            type="button"
            onClick={onContinue}
            className={`group rounded-full border border-[#5b2140]/25 bg-[#5b2140]/5 px-8 py-3 font-sans text-xs uppercase tracking-[0.3em] text-[#5b2140] transition-all duration-500 hover:bg-[#5b2140] hover:text-cream ${
              done ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            There&apos;s more
            <span className="ml-2 inline-block transition-transform group-hover:translate-y-0.5">↓</span>
          </button>
        </div>
      </article>
    </div>
  );
}