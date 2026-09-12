import { config } from '../config';
import useReveal from '../hooks/useReveal';

function MemoryCard({ memory, index }) {
  const [ref, shown] = useReveal();

  return (
    <figure
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl glass transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}
      style={{ transitionDelay: `${(index % 3) * 120}ms` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {memory.image ? (
          <img
            src={memory.image}
            alt={memory.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-lilac/25 via-rose/15 to-gold/20 text-6xl transition-transform duration-[1200ms] group-hover:scale-110">
            <span>{memory.emoji}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
      </div>

      <figcaption className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="font-serif text-2xl text-cream">{memory.title}</h3>
        <p className="mt-1 font-sans text-sm text-cream/60">{memory.caption}</p>
      </figcaption>

      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-gold/0 transition-all duration-500 group-hover:ring-gold/40" />
    </figure>
  );
}

export default function Gallery() {
  const [ref, shown] = useReveal();

  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <header
        ref={ref}
        className={`mb-14 text-center transition-all duration-1000 ${
          shown ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <p className="font-sans text-[11px] uppercase tracking-[0.45em] text-gold/70">Chapter one</p>
        <h2 className="mt-4 font-serif text-4xl gold-text sm:text-5xl">Things I kept</h2>
        <div className="hairline mx-auto mt-6 w-40" />
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {config.memories.map((m, i) => (
          <MemoryCard key={m.title} memory={m} index={i} />
        ))}
      </div>
    </section>
  );
}