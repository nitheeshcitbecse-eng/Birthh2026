import { useState } from 'react';

/**
 * Ambient background: twinkling stars + slow rising motes.
 * Purely decorative, fixed behind everything.
 */
export default function Starfield({ stars = 70, motes = 18 }) {
  // Lazy state initialisers, not useMemo: these positions are random and must
  // stay fixed for the life of the component. useMemo is only a cache and may
  // recompute, which would visibly re-scatter the sky.
  const [starList] = useState(() =>
    Array.from({ length: stars }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2.2 + 0.8,
      delay: Math.random() * 6,
      duration: Math.random() * 3 + 3,
    }))
  );

  const [moteList] = useState(() =>
    Array.from({ length: motes }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 5 + 3,
      delay: Math.random() * 18,
      duration: Math.random() * 14 + 16,
      hue: ['#f5c76a', '#ff8fab', '#a78bfa'][i % 3],
    }))
  );

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden aurora">
      {starList.map((s) => (
        <span
          key={`s-${s.id}`}
          className="absolute rounded-full bg-cream"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}

      {moteList.map((m) => (
        <span
          key={`m-${m.id}`}
          className="absolute bottom-[-10vh] rounded-full blur-[1px]"
          style={{
            left: `${m.left}%`,
            width: `${m.size}px`,
            height: `${m.size}px`,
            background: m.hue,
            opacity: 0.5,
            animation: `riseSlow ${m.duration}s linear ${m.delay}s infinite`,
          }}
        />
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,5,18,0.75)_100%)]" />
    </div>
  );
}