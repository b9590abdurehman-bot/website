import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function ILoveYou({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 3000);
    const t2 = setTimeout(() => setStep(2), 6500);
    const t3 = setTimeout(() => setStep(3), 11000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background glowing particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/50 blur-xl"
            style={{
              width: Math.random() * 150 + 50,
              height: Math.random() * 150 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -100 - 50, 0],
              x: [0, Math.random() * 60 - 30, 0],
              scale: [1, Math.random() * 0.5 + 1.2, 1],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4">
        {/* Large animated pulsing heart */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          className="mb-8 text-pink-500 drop-shadow-[0_0_40px_rgba(255,255,255,0.8)]"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-48 h-48 md:w-64 md:h-64">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="mb-10"
        >
          <h1 className="text-7xl md:text-[8rem] font-serif font-bold text-white drop-shadow-[0_0_30px_rgba(255,255,255,1)] text-center leading-none">
            I Love You
          </h1>
        </motion.div>

        <div className="h-48 flex flex-col items-center justify-center space-y-6">
          {step >= 1 && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-hand text-pink-800 drop-shadow-sm text-center"
            >
              More than yesterday...
            </motion.p>
          )}
          {step >= 2 && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-hand text-pink-800 drop-shadow-sm text-center"
            >
              Less than tomorrow.
            </motion.p>
          )}
        </div>

        {step >= 3 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            onClick={onClose}
            className="mt-12 px-10 py-4 bg-white/30 backdrop-blur-md text-pink-900 border border-white/60 rounded-full font-serif text-xl md:text-2xl hover:bg-white/50 hover:scale-105 transition-all shadow-lg"
          >
            Return to Gifts
          </motion.button>
        )}
      </div>

      {/* Bubbling hearts from bottom */}
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={`bubble-${i}`}
          className="absolute bottom-[-10%] text-pink-500/70 text-2xl md:text-4xl"
          initial={{ x: `${Math.random() * 100}vw`, y: 0, scale: Math.random() * 0.5 + 0.5 }}
          animate={{
            y: '-120vh',
            x: `${Math.random() * 100}vw`,
          }}
          transition={{
            duration: Math.random() * 6 + 6,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        >
          ❤️
        </motion.div>
      ))}
    </motion.div>
  );
}
