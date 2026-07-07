import { useMemo } from 'react';
import { motion } from 'framer-motion';

export function AmbientEffects() {
  const hearts = useMemo(() => Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: Math.random() * 20 + 10,
    duration: Math.random() * 12 + 10,
    delay: Math.random() * -20,
  })), []);

  const butterflies = useMemo(() => Array.from({ length: 4 }).map((_, i) => ({
    id: i,
    top: Math.random() * 70 + 10,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * -20,
  })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map(h => (
        <motion.div
          key={`heart-${h.id}`}
          className="absolute bottom-[-10vh] text-pink-400/30"
          initial={{ y: '10vh', x: `${h.left}vw` }}
          animate={{
            y: '-120vh',
            x: [`${h.left}vw`, `${h.left + 5}vw`, `${h.left - 5}vw`, `${h.left}vw`],
            rotate: [0, 20, -20, 0],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width={h.size} height={h.size}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}

      {butterflies.map(b => (
        <motion.div
          key={`bf-${b.id}`}
          className="absolute text-3xl opacity-70 drop-shadow-md"
          initial={{ x: '-10vw', y: `${b.top}vh` }}
          animate={{
            x: '110vw',
            y: [`${b.top}vh`, `${b.top - 10}vh`, `${b.top + 5}vh`, `${b.top}vh`],
          }}
          transition={{
            x: { duration: b.duration, delay: b.delay, repeat: Infinity, ease: "linear" },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          🦋
        </motion.div>
      ))}
    </div>
  );
}
