import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoveLetter } from './gifts/LoveLetter';
import { MemoriesGallery } from './gifts/MemoriesGallery';
import { ILoveYou } from './gifts/ILoveYou';

export function GiftBoxScreen({ openedGifts, onGiftOpened }: { openedGifts: string[]; onGiftOpened: (id: string) => void }) {
  const [boxOpen, setBoxOpen] = useState(false);
  const [activeGift, setActiveGift] = useState<string | null>(null);

  const handleOpenGift = (id: string) => {
    setActiveGift(id);
    onGiftOpened(id);
  };

  return (
    <motion.div
      className="absolute inset-0 gradient-bg flex flex-col items-center justify-center p-4 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {!boxOpen ? (
        <motion.div
          className="relative cursor-pointer group flex flex-col items-center"
          onClick={() => setBoxOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
        >
          <div className="w-56 h-56 md:w-72 md:h-72 bg-pink-500 rounded-lg shadow-2xl relative border-b-4 border-r-4 border-pink-700">
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-10 bg-red-400" />
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-10 bg-red-400" />
          </div>
          <motion.div
            className="absolute top-[-1rem] md:top-[-1.5rem] left-[-0.75rem] right-[-0.75rem] h-20 md:h-24 bg-pink-400 rounded-md border-b-4 border-pink-600 shadow-lg z-10 origin-bottom"
            animate={{ rotate: [0, -2, 2, -2, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-10 bg-red-400" />
            <div className="absolute -top-12 md:-top-16 left-1/2 -translate-x-1/2 flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-red-400 rounded-full opacity-90 -mr-6 md:-mr-8 border border-red-500 shadow-md" />
              <div className="w-16 h-16 md:w-20 md:h-20 bg-red-400 rounded-full opacity-90 -ml-6 md:-ml-8 border border-red-500 shadow-md" />
            </div>
          </motion.div>
          <p className="text-center mt-12 font-hand text-3xl md:text-4xl text-pink-700 font-bold animate-pulse-soft drop-shadow-sm bg-white/40 px-6 py-2 rounded-full border border-white/50 backdrop-blur-sm">
            Tap to open...
          </p>
        </motion.div>
      ) : (
        <motion.div
          className="w-full max-w-5xl px-4 flex flex-col items-center relative z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-5xl md:text-7xl font-hand text-pink-800 mb-12 md:mb-16 text-center drop-shadow-md bg-white/30 px-8 py-3 rounded-full backdrop-blur-sm border border-white/40">
            Pick a present! 🎁
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-10 w-full">
            <GiftCard id="letter" label="💌 Love Letter" delay={0.5} onClick={() => handleOpenGift('letter')} opened={openedGifts.includes('letter')} />
            <GiftCard id="memories" label="📸 Our Memories" delay={0.7} onClick={() => handleOpenGift('memories')} opened={openedGifts.includes('memories')} />
            <GiftCard id="iloveyou" label="❤️ I Love You" delay={0.9} onClick={() => handleOpenGift('iloveyou')} opened={openedGifts.includes('iloveyou')} />
          </div>
        </motion.div>
      )}

      {boxOpen && (
        <div className="absolute top-1/2 left-1/2 pointer-events-none z-10">
          {Array.from({ length: 30 }).map((_, i) => {
            const angle = (i * 12) * (Math.PI / 180);
            const dist = Math.random() * 300 + 100;
            return (
              <motion.div
                key={`burst-${i}`}
                className="absolute text-pink-500 text-3xl drop-shadow-md"
                initial={{ x: 0, y: 0, scale: 0 }}
                animate={{
                  x: Math.cos(angle) * dist,
                  y: Math.sin(angle) * dist + (Math.random() * -200),
                  scale: [0, 1.5, 0],
                  opacity: [1, 1, 0],
                }}
                transition={{ duration: 1.5 + Math.random(), ease: "easeOut" }}
              >
                ❤️
              </motion.div>
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {activeGift === 'letter' && <LoveLetter onClose={() => setActiveGift(null)} />}
        {activeGift === 'memories' && <MemoriesGallery onClose={() => setActiveGift(null)} />}
        {activeGift === 'iloveyou' && <ILoveYou onClose={() => setActiveGift(null)} />}
      </AnimatePresence>
    </motion.div>
  );
}

function GiftCard({ label, delay, onClick, opened }: { id: string; label: string; delay: number; onClick: () => void; opened: boolean }) {
  return (
    <motion.button
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, type: "spring", stiffness: 100 }}
      whileHover={{ y: -10, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-6 py-10 md:py-16 rounded-[2rem] shadow-2xl backdrop-blur-md transition-all border w-full md:w-72 flex flex-col items-center justify-center gap-6 relative overflow-hidden group
        ${opened
          ? 'bg-white/50 text-pink-800 border-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.1)]'
          : 'bg-gradient-to-br from-pink-200 to-pink-100 text-pink-900 border-pink-300 shadow-[0_20px_40px_rgba(236,72,153,0.3)] hover:shadow-[0_20px_50px_rgba(236,72,153,0.5)]'
        }`}
    >
      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="text-3xl md:text-4xl font-serif font-medium text-center relative z-10 drop-shadow-sm">{label}</span>
      {opened && (
        <motion.span
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          className="text-lg font-hand text-pink-700 bg-white/70 px-4 py-1.5 rounded-full relative z-10 border border-pink-200 shadow-sm"
        >
          Opened ✓
        </motion.span>
      )}
    </motion.button>
  );
}
