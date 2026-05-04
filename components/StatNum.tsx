'use client';
import { useEffect, useRef } from 'react';

export default function StatNum({ count, suffix = '', prefix = '', color }: { count: number; suffix?: string; prefix?: string; color?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const dur = 1600;
    let started = false;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        started = true;
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          const v = count * eased;
          el.textContent = prefix + (Number.isInteger(count) ? Math.floor(v) : v.toFixed(1)) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io.unobserve(el);
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, [count, suffix, prefix]);
  return <div ref={ref} className="stat-num" style={color ? { color } : undefined}>0</div>;
}
