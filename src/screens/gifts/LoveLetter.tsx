import { motion } from 'framer-motion';
import { useState } from 'react';

const letterText = `Dear Rashail ❤️,

If you're reading this, it means you opened the little surprise I made just for you. I wanted to create something that would make you smile, even if only for a few moments, because your smile has a way of making everything around me feel brighter.

Meeting you has been one of the most beautiful parts of my life. Thank you for being yourself—for your kindness, your laughter, your care, and for all the little moments that mean more to me than words can describe.

No matter how busy life gets or how many days pass, I hope you always remember how special you are. You make ordinary moments feel unforgettable, and I'm grateful for every memory we've created together and every new one that's still waiting for us.

Whenever you're happy, I want to celebrate with you. Whenever you're feeling down, I hope I can remind you that you're stronger, kinder, and more amazing than you sometimes believe.

You are someone I'll always appreciate, respect, and care for deeply. Thank you for being part of my life and for making it more colorful just by being in it.

I don't know what the future holds, but I do know this: every moment spent with you is a memory I'll treasure. I hope we continue making each other laugh, supporting one another, and creating beautiful stories together.

So here's one more reminder, just in case you ever forget:

You are loved. You are appreciated. You are beautiful just the way you are. And you mean more to me than words could ever fully express.

I love you today, tomorrow, and every day that follows. ❤️

Forever yours,
Abdurehman 🌹`;

export function LoveLetter({ onClose }: { onClose: () => void }) {
  const [opened, setOpened] = useState(false);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Falling petals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="petal"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 5 + 8}s`,
              width: `${Math.random() * 15 + 10}px`,
              height: `${Math.random() * 15 + 10}px`,
              background: `hsl(${340 + Math.random() * 20}deg, 70%, ${70 + Math.random() * 20}%)`,
            }}
          />
        ))}
      </div>

      {!opened ? (
        <motion.div
          onClick={() => setOpened(true)}
          className="relative cursor-pointer w-72 h-56 md:w-96 md:h-64 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg shadow-2xl flex items-center justify-center border border-pink-200 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Envelope flap */}
          <div
            className="absolute top-0 left-0 right-0 h-28 md:h-32 bg-pink-200 origin-top rounded-t-lg shadow-sm border-b border-pink-300"
            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
          />
          {/* Wax seal */}
          <div className="z-10 mt-12 w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg border-2 border-red-700">
            <span className="text-white text-3xl font-hand drop-shadow-sm">❤️</span>
          </div>
          <p className="absolute bottom-6 text-pink-800 font-serif text-lg animate-pulse-soft">Tap to open</p>
        </motion.div>
      ) : (
        <motion.div
          className="relative w-full max-w-2xl bg-white/95 backdrop-blur-xl p-8 md:p-14 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-pink-100 max-h-[85vh] overflow-y-auto custom-scrollbar"
          initial={{ y: 200, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 25, stiffness: 100 }}
        >
          <div className="prose prose-pink prose-lg max-w-none font-serif text-gray-800 leading-relaxed whitespace-pre-wrap">
            <TypewriterText text={letterText} />
          </div>

          <div className="mt-12 flex justify-center sticky bottom-0 pt-8 pb-4 bg-gradient-to-t from-white/95 to-transparent">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-8 py-3 bg-pink-100 text-pink-800 rounded-full font-serif text-lg shadow-md hover:bg-pink-200 border border-pink-300 transition-colors"
            >
              Fold Letter & Close
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function TypewriterText({ text }: { text: string }) {
  const paragraphs = text.split('\n\n');
  return (
    <>
      {paragraphs.map((p, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 1.5, duration: 1.2, ease: "easeOut" }}
          className="mb-6 first-letter:text-4xl first-letter:font-hand first-letter:text-pink-600 first-letter:mr-1"
        >
          {p}
        </motion.p>
      ))}
    </>
  );
}
