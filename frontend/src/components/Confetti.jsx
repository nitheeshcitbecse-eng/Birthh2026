import { useEffect, useRef } from 'react';

const COLORS = ['#f5c76a', '#ff8fab', '#a78bfa', '#7dd3fc', '#fef3c7', '#fca5a5'];

/**
 * Canvas confetti burst. Pass an incrementing number to `trigger` to fire.
 */
export default function Confetti({ trigger = 0 }) {
  const canvasRef = useRef(null);
  const partsRef = useRef([]);
  const rafRef = useRef(0);
  const runningRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (!trigger) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const w = window.innerWidth;
    const h = window.innerHeight;
    const count = w < 640 ? 90 : 160;

    for (let i = 0; i < count; i += 1) {
      const fromLeft = i % 2 === 0;
      partsRef.current.push({
        x: fromLeft ? w * 0.1 : w * 0.9,
        y: h * 0.55 + Math.random() * 40,
        vx: (fromLeft ? 1 : -1) * (Math.random() * 9 + 4),
        vy: -(Math.random() * 13 + 7),
        w: Math.random() * 8 + 4,
        h: Math.random() * 5 + 3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.3,
        life: 0,
        ttl: Math.random() * 70 + 110,
      });
    }

    const loop = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const next = [];

      partsRef.current.forEach((p) => {
        p.life += 1;
        p.vy += 0.32; // gravity
        p.vx *= 0.985; // drag
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;

        const alpha = Math.max(0, 1 - p.life / p.ttl);
        if (alpha <= 0 || p.y > window.innerHeight + 60) return;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();

        next.push(p);
      });

      partsRef.current = next;

      if (next.length > 0) {
        rafRef.current = requestAnimationFrame(loop);
      } else {
        runningRef.current = false;
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    };

    if (!runningRef.current) {
      runningRef.current = true;
      rafRef.current = requestAnimationFrame(loop);
    }
  }, [trigger]);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-50" />;
}