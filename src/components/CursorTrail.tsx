import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function CursorTrail() {
  const [trails, setTrails] = useState<{ id: number; x: number; y: number }[]>([]);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; angle: number; dist: number }[]>([]);

  useEffect(() => {
    let lastTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime > 40) {
        lastTime = now;
        setTrails(prev => [...prev, { id: now, x: e.clientX, y: e.clientY }].slice(-15));
      }
    };

    const handleClick = (e: MouseEvent) => {
      const now = Date.now();
      const newSparkles = Array.from({ length: 8 }).map((_, i) => ({
        id: now + i,
        x: e.clientX,
        y: e.clientY,
        angle: (i * 45) * (Math.PI / 180),
        dist: Math.random() * 40 + 20,
      }));
      setSparkles(prev => [...prev, ...newSparkles].slice(-40));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      <AnimatePresence>
        {trails.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute text-pink-500 drop-shadow-sm"
            style={{ left: t.x - 6, top: t.y - 6 }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        ))}
        {sparkles.map(s => (
          <motion.div
            key={s.id}
            initial={{ opacity: 1, x: s.x, y: s.y, scale: 1 }}
            animate={{
              opacity: 0,
              x: s.x + Math.cos(s.angle) * s.dist,
              y: s.y + Math.sin(s.angle) * s.dist,
              scale: 0,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute w-2 h-2 bg-yellow-300 rounded-full shadow-[0_0_8px_#fde047]"
            style={{ left: -1, top: -1 }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
