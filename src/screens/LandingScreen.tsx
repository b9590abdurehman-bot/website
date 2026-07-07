import { motion } from 'framer-motion';
import { TeddyBear } from '../components/TeddyBear';
import { useState } from 'react';

export function LandingScreen({ onNext }: { onNext: () => void }) {
  const [clickCount, setClickCount] = useState(0);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center gradient-bg z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
    >
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        className="text-center z-10"
      >
        <h1 className="text-6xl md:text-8xl font-hand text-pink-700 mb-2 drop-shadow-md">
          Hey Princess 💖
        </h1>
      </motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: "spring", bounce: 0.5 }}
        className="z-10"
      >
        <TeddyBear
          className="w-64 h-64 md:w-80 md:h-80 my-8 cursor-pointer drop-shadow-2xl relative z-10"
          onClick={() => setClickCount(c => c + 1)}
          clickCount={clickCount}
        />
      </motion.div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-center z-10 flex flex-col items-center"
      >
        <p className="text-2xl md:text-3xl font-serif text-pink-800 mb-10 italic drop-shadow-sm bg-white/30 px-6 py-2 rounded-full backdrop-blur-sm border border-white/40">
          I made a little surprise just for you...
        </p>

        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative overflow-hidden px-10 py-5 bg-pink-500 text-white rounded-full font-serif text-2xl shadow-[0_10px_30px_rgba(236,72,153,0.5)] border border-pink-400 group"
        >
          <motion.div
            className="absolute inset-0 bg-white/20"
            initial={{ x: '-100%', skewX: -20 }}
            animate={{ x: '200%' }}
            transition={{ repeat: Infinity, duration: 2.5, delay: 1 }}
          />
          <span className="relative z-10 font-medium group-hover:text-pink-50 transition-colors">
            Open Your Gift 🎁
          </span>
        </motion.button>
      </motion.div>

      {/* Floating teddy bear corner easter egg */}
      <motion.div
        className="absolute bottom-4 left-4 text-4xl cursor-pointer z-10"
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        whileHover={{ scale: 1.2, rotate: 10 }}
      >
        🧸
      </motion.div>
    </motion.div>
  );
}
