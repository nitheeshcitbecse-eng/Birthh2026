import { config } from '../config';
import useReveal from '../hooks/useReveal';

function Reason({ text, index }) {
  const [ref, shown] = useReveal();

  return (
    <li
      ref={ref}
      className={`group flex gap-6 border-b border-cream/10 py-7 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        shown ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <span className="shrink-0 font-serif text-3xl text-gold/45 transition-colors duration-500 group-hover:text-gold sm:text-4xl">
        {String(index + 1).padStart(2, '0')}
      </span>
      <p className="font-serif text-lg leading-relaxed text-cream/85 sm:text-2xl">{text}</p>
    </li>
  );
}

export default function Reasons() {
  const [ref, shown] = useReveal();

  return (
    <section className="mx-auto max-w-3xl px-5 py-24 sm:py-32">
      <header
        ref={ref}
        className={`mb-10 text-center transition-all duration-1000 ${
          shown ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <p className="font-sans text-[11px] uppercase tracking-[0.45em] text-gold/70">Chapter two</p>
        <h2 className="mt-4 font-serif text-4xl gold-text sm:text-5xl">
          Why you, specifically
        </h2>
        <div className="hairline mx-auto mt-6 w-40" />
      </header>

      <ul className="list-none">
        {config.reasons.map((r, i) => (
          <Reason key={r} text={r} index={i} />
        ))}
      </ul>
    </section>
  );
}