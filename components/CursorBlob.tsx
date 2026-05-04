'use client';
import { useEffect, useRef } from 'react';

export default function CursorBlob() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blob = ref.current;
    if (!blob) return;
    let tx = window.innerWidth / 2, ty = window.innerHeight / 2;
    let cx = tx, cy = ty;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX; ty = e.clientY;
      blob.style.opacity = '1';
    };
    const onOut = () => { blob.style.opacity = '0'; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseout', onOut);

    let raf: number;
    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      blob.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="cursor-blob" style={{opacity:0}} />;
}
