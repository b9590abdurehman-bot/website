import { motion } from 'framer-motion';
import { TeddyBear } from '../components/TeddyBear';

export function LoadingScreen() {
  return (
    <motion.div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center gradient-bg overflow-hidden"
      exit={{ opacity: 0, transition: { duration: 1 } }}
    >
      <div className="relative">
        <TeddyBear className="w-48 h-48 drop-shadow-xl" huggingHeart={true} />

        {/* Floating sparkles around bear */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-300 rounded-full shadow-[0_0_10px_#fde047]"
            style={{
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.p
        className="mt-8 text-3xl font-hand text-pink-700 drop-shadow-sm font-bold"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        Loading your surprise... 💝
      </motion.p>

      <div className="w-64 h-2 bg-white/40 rounded-full mt-6 overflow-hidden shadow-inner border border-white/50">
        <motion.div
          className="h-full bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.8)]"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
