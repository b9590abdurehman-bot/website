import { motion } from 'framer-motion';
import { useState } from 'react';
import { TeddyBear } from '../components/TeddyBear';

export function FinalScreen() {
  const [answer, setAnswer] = useState<'yes' | 'no' | null>(null);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  const handleNoHover = () => {
    const newX = (Math.random() - 0.5) * 250;
    const newY = (Math.random() - 0.5) * 250;
    setNoPosition({ x: newX, y: newY });
  };

  if (answer === 'yes') {
    return (
      <motion.div
        className="absolute inset-0 gradient-bg flex flex-col items-center justify-center p-4 text-center overflow-hidden z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Fireworks />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="relative z-10 flex flex-col items-center"
        >
          <TeddyBear className="w-64 h-64 md:w-80 md:h-80 mb-8 drop-shadow-2xl" huggingHeart={true} />
          <h1 className="text-4xl md:text-6xl font-hand text-pink-700 drop-shadow-lg bg-white/70 p-8 rounded-3xl backdrop-blur-md border border-white/60 shadow-[0_20px_50px_rgba(236,72,153,0.3)] max-w-3xl leading-relaxed">
            Yay!! You just made me the happiest person ❤️
          </h1>
        </motion.div>
      </motion.div>
    );
  }

  if (answer === 'no') {
    return (
      <motion.div
        className="absolute inset-0 bg-slate-100 flex flex-col items-center justify-center p-4 text-center z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="text-8xl md:text-9xl mb-8 drop-shadow-2xl"
        >
          😼🔫
        </motion.div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-3xl md:text-5xl font-serif text-slate-800 mb-12 max-w-2xl leading-tight drop-shadow-sm"
        >
          Hmm... I think that was an accidental click! 😼💕
        </motion.h1>
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={() => setAnswer(null)}
          className="px-8 py-4 bg-pink-500 text-white rounded-full font-serif text-xl md:text-2xl shadow-xl hover:bg-pink-600 hover:shadow-2xl hover:-translate-y-1 transition-all"
        >
          Let me choose again 💖
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="absolute inset-0 gradient-bg flex flex-col items-center justify-center p-4 z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h1
        className="text-5xl md:text-7xl font-serif text-pink-900 mb-20 text-center leading-tight drop-shadow-md bg-white/30 p-8 rounded-3xl backdrop-blur-sm border border-white/40"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
      >
        Will you keep loving me forever? ❤️
      </motion.h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-24 relative w-full max-w-3xl h-48">
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
          onClick={() => setAnswer('yes')}
          className="px-14 py-6 bg-pink-500 text-white rounded-full font-serif text-4xl shadow-[0_0_40px_rgba(236,72,153,0.7)] animate-pulse-soft z-10 border-2 border-pink-300"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          💖 Yes
        </motion.button>

        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1, x: noPosition.x, y: noPosition.y }}
          transition={{
            scale: { delay: 0.8, type: "spring" },
            x: { type: "spring", stiffness: 200, damping: 15 },
            y: { type: "spring", stiffness: 200, damping: 15 },
          }}
          onMouseEnter={handleNoHover}
          onClick={handleNoHover}
          className="px-10 py-5 bg-slate-400 text-white rounded-full font-serif text-2xl shadow-lg z-30 relative border border-slate-300"
        >
          🙈 No
        </motion.button>
      </div>
    </motion.div>
  );
}

function Fireworks() {
  const particles = Array.from({ length: 100 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    color: ['#ff9a9e', '#fecfef', '#a1c4fd', '#fbc2eb', '#fdcbf1', '#f6e05e', '#68d391'][Math.floor(Math.random() * 7)],
    delay: Math.random() * 2,
    duration: Math.random() * 1.5 + 1,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute w-4 h-4 rounded-full shadow-lg"
          style={{ left: `${p.x}%`, top: `${p.y}%`, backgroundColor: p.color }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0], y: [0, -200] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
