import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const photos = [
  { id: 1, src: '/photo1.png', alt: 'A beautiful memory' },
  { id: 2, src: '/photo2.png', alt: 'A special moment' },
  { id: 3, src: '/photo3.png', alt: 'Together' },
  { id: 4, src: '/photo4.png', alt: 'Unforgettable time' },
  { id: 5, src: '/photo5.png', alt: 'Cherished memory' },
];

export function MemoriesGallery({ onClose }: { onClose: () => void }) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xl overflow-y-auto p-4 md:p-12 flex flex-col items-center custom-scrollbar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-full max-w-6xl relative min-h-screen flex flex-col pt-12 pb-24">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="fixed top-6 right-6 md:top-12 md:right-12 z-40 w-14 h-14 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white text-2xl backdrop-blur-md shadow-lg border border-white/30 transition-colors"
        >
          ✕
        </motion.button>

        <motion.h2
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-hand text-pink-200 mb-16 text-center drop-shadow-2xl"
        >
          Our Memories 📸
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14 px-4 md:px-8">
          {photos.map((photo, i) => {
            const rotate = (i % 2 === 0 ? 1 : -1) * (Math.random() * 3 + 1);
            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.8, rotate: rotate * 2 }}
                animate={{ opacity: 1, scale: 1, rotate }}
                transition={{ delay: i * 0.2, type: "spring" }}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 30, transition: { duration: 0.2 } }}
                className="bg-white p-4 pb-16 rounded-sm shadow-[0_15px_35px_rgba(0,0,0,0.3)] cursor-pointer relative group"
                onClick={() => setSelectedPhoto(photo.src)}
              >
                <div className="aspect-square overflow-hidden bg-gray-100 mb-4 border border-gray-200">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute bottom-6 left-0 right-0 text-center text-gray-500 font-hand text-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                  ❤️
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-5xl w-full flex justify-center"
            >
              <img
                src={selectedPhoto}
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl border border-white/20"
                alt="Enlarged memory"
              />
              <p className="absolute -bottom-12 text-white/50 font-serif">Click anywhere to close</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
