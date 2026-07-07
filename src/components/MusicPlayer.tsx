import { useState } from 'react';
import { motion } from 'framer-motion';

export function MusicPlayer() {
  const [muted, setMuted] = useState(true);

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-3 bg-white/30 backdrop-blur-md px-4 py-2 rounded-full border border-pink-200/50 shadow-md">
      <motion.span
        className="text-sm md:text-base font-hand text-pink-700 font-bold tracking-wide"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ♪ Khaab - Akhil ♪
      </motion.span>
      <button
        onClick={() => setMuted(!muted)}
        className="text-xl hover:scale-110 transition-transform focus:outline-none drop-shadow-sm"
        title={muted ? "Unmute Music" : "Mute Music"}
      >
        {muted ? '🔇' : '🎵'}
      </button>
      <iframe
        src={`https://www.youtube.com/embed/0eKLqFMa1t4?autoplay=1&loop=1&playlist=0eKLqFMa1t4&mute=${muted ? 1 : 0}`}
        className="hidden"
        allow="autoplay"
        title="Background Music"
      />
    </div>
  );
}
