import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface GiftBoxAnimationProps {
  onComplete: () => void;
}

const BOX_COLORS = ["🎁", "🎀", "🎁", "🎀", "🎁"];
const BOX_SIZES = [160, 130, 100, 75, 55];
const BOX_MESSAGES = [
  "Open me! 🤭",
  "Keep going! 😆",
  "Almost there! 🥳",
  "One more! 💕",
  "I love you! ❤️",
];

const fireConfetti = (intensity: number) => {
  const colors = ["#f472b6", "#c084fc", "#fb923c", "#fbbf24", "#f43f5e", "#a78bfa"];
  confetti({
    particleCount: 40 + intensity * 20,
    spread: 60 + intensity * 15,
    origin: { y: 0.5 },
    colors,
    startVelocity: 25 + intensity * 5,
  });
  confetti({
    particleCount: 30 + intensity * 15,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 0.5 },
    colors,
  });
  confetti({
    particleCount: 30 + intensity * 15,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 0.5 },
    colors,
  });
};

const fireFinalConfetti = () => {
  const duration = 3000;
  const end = Date.now() + duration;
  const colors = ["#f472b6", "#c084fc", "#fb923c", "#fbbf24", "#f43f5e", "#ec4899"];

  const frame = () => {
    confetti({ particleCount: 5, angle: 60, spread: 80, origin: { x: 0 }, colors });
    confetti({ particleCount: 5, angle: 120, spread: 80, origin: { x: 1 }, colors });
    confetti({ particleCount: 3, spread: 120, origin: { y: 0.3 }, colors, startVelocity: 40 });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
};

const GiftBoxAnimation = ({ onComplete }: GiftBoxAnimationProps) => {
  const [currentBox, setCurrentBox] = useState(0);
  const [isOpening, setIsOpening] = useState(false);
  const isLastBox = currentBox === 4;

  const openBox = () => {
    if (isOpening) return;
    setIsOpening(true);

    if (isLastBox) {
      fireFinalConfetti();
      setTimeout(onComplete, 3000);
    } else {
      fireConfetti(currentBox);
      setTimeout(() => {
        setCurrentBox((c) => c + 1);
        setIsOpening(false);
      }, 600);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Sparkles */}
      {[...Array(6)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl select-none"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          ✨
        </motion.span>
      ))}

      <motion.p
        className="font-handwritten text-2xl md:text-3xl text-primary mb-8"
        key={`msg-${currentBox}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {BOX_MESSAGES[currentBox]}
      </motion.p>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentBox}
          className="cursor-pointer select-none"
          style={{ fontSize: BOX_SIZES[currentBox] }}
          initial={{ scale: 0, rotate: -180 }}
          animate={
            isOpening && isLastBox
              ? { scale: [1, 1.3, 0], rotate: [0, 10, -10, 0] }
              : isOpening
              ? { scale: [1, 1.2, 0], rotate: [0, 15, -15, 360] }
              : { scale: 1, rotate: 0 }
          }
          transition={
            isOpening ? { duration: 0.5 } : { type: "spring", stiffness: 200 }
          }
          whileHover={!isOpening ? { scale: 1.1, rotate: [0, -5, 5, 0] } : {}}
          onClick={openBox}
        >
          {BOX_COLORS[currentBox]}
        </motion.div>
      </AnimatePresence>

      {isLastBox && isOpening && (
        <motion.h1
          className="font-handwritten text-5xl md:text-7xl text-primary mt-8"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: [0, 1.2, 1] }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          I Love You! 💖
        </motion.h1>
      )}

      {!isLastBox && (
        <motion.p
          className="text-muted-foreground mt-6 text-lg"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Tap the gift! 🎁
        </motion.p>
      )}

      {/* Progress dots */}
      <div className="flex gap-2 mt-8">
        {BOX_SIZES.map((_, i) => (
          <motion.div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i <= currentBox ? "bg-primary" : "bg-muted"
            }`}
            animate={i === currentBox ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default GiftBoxAnimation;
