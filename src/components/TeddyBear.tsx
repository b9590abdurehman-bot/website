import { motion } from 'framer-motion';

interface TeddyBearProps {
  className?: string;
  onClick?: () => void;
  clickCount?: number;
  huggingHeart?: boolean;
}

export function TeddyBear({ className = "", onClick, clickCount = 0, huggingHeart = false }: TeddyBearProps) {
  const isSpinning = clickCount >= 5;

  return (
    <motion.svg
      className={className}
      viewBox="0 0 200 200"
      onClick={onClick}
      animate={isSpinning ? { rotate: 360 } : { y: [0, -10, 0] }}
      transition={isSpinning ? { duration: 0.8, type: "spring" } : { repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      whileHover={onClick ? { scale: 1.05 } : {}}
      whileTap={onClick ? { scale: 0.95 } : {}}
    >
      {/* Bear body */}
      <circle cx="100" cy="120" r="50" fill="#d4a373" />
      {/* Ears */}
      <circle cx="65" cy="55" r="20" fill="#d4a373" />
      <circle cx="65" cy="55" r="10" fill="#faedcd" />
      <circle cx="135" cy="55" r="20" fill="#d4a373" />
      <circle cx="135" cy="55" r="10" fill="#faedcd" />
      {/* Head */}
      <circle cx="100" cy="80" r="45" fill="#d4a373" />
      {/* Snout */}
      <ellipse cx="100" cy="95" rx="18" ry="14" fill="#faedcd" />
      <circle cx="100" cy="90" r="5" fill="#5c4033" />
      <path d="M 100 95 Q 100 105 105 102 M 100 95 Q 100 105 95 102" stroke="#5c4033" fill="none" strokeWidth="2" />
      {/* Eyes */}
      <motion.circle
        cx="85" cy="75" r="5" fill="#5c4033"
        animate={{ scaleY: [1, 0.1, 1] }}
        transition={{ repeat: Infinity, duration: 3, times: [0, 0.9, 1] }}
      />
      <motion.circle
        cx="115" cy="75" r="5" fill="#5c4033"
        animate={{ scaleY: [1, 0.1, 1] }}
        transition={{ repeat: Infinity, duration: 3, times: [0, 0.9, 1] }}
      />
      {/* Arms */}
      {!huggingHeart ? (
        <motion.g
          animate={{ rotate: [0, -40, 0] }}
          style={{ originX: '70px', originY: '110px' }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ellipse cx="60" cy="115" rx="15" ry="30" fill="#d4a373" transform="rotate(30 60 115)" />
        </motion.g>
      ) : (
        <ellipse cx="60" cy="115" rx="15" ry="30" fill="#d4a373" transform="rotate(45 60 115)" />
      )}

      {huggingHeart && (
        <path d="M 100 145 L 75 120 A 18 18 0 0 1 100 95 A 18 18 0 0 1 125 120 Z" fill="#ff6b81" />
      )}

      {/* Right Arm */}
      {huggingHeart ? (
        <ellipse cx="140" cy="115" rx="15" ry="30" fill="#d4a373" transform="rotate(-45 140 115)" />
      ) : (
        <ellipse cx="140" cy="115" rx="15" ry="30" fill="#d4a373" transform="rotate(-30 140 115)" />
      )}

      {/* Legs */}
      <ellipse cx="75" cy="160" rx="18" ry="25" fill="#d4a373" transform="rotate(20 75 160)" />
      <ellipse cx="125" cy="160" rx="18" ry="25" fill="#d4a373" transform="rotate(-20 125 160)" />
    </motion.svg>
  );
}
