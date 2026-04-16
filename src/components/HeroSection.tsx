import { motion } from "framer-motion";
import { useEffect } from "react";
import confetti from "canvas-confetti";

const BIRTHDAY_NAME = "My Love"; // ← Change this name!

const HeroSection = () => {
  useEffect(() => {
    // Confetti burst on mount
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#f472b6", "#c084fc", "#fb923c", "#fbbf24"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#f472b6", "#c084fc", "#fb923c", "#fbbf24"],
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-4 py-20 overflow-hidden">
      {/* Floating emojis */}
      {["🎂", "🎈", "🎉", "💖", "🧁", "🎊", "💐", "🥳"].map((emoji, i) => (
        <motion.span
          key={i}
          className="absolute text-3xl md:text-5xl select-none pointer-events-none"
          style={{
            left: `${10 + i * 11}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 3 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        >
          {emoji}
        </motion.span>
      ))}

      <motion.div
        className="text-center z-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
      >
        <motion.div
          className="text-7xl md:text-8xl mb-4"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🎂
        </motion.div>

        <h1 className="font-handwritten text-5xl md:text-7xl lg:text-8xl text-primary mb-4 leading-tight">
          Happy Birthday
        </h1>

        <motion.p
          className="font-handwritten text-4xl md:text-6xl text-love"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {BIRTHDAY_NAME}! 🥳
        </motion.p>

        <motion.p
          className="text-muted-foreground text-lg md:text-xl mt-8 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Today is all about celebrating the most amazing person in my life — YOU! 💕
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 text-muted-foreground text-sm flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span>Scroll down</span>
        <span>↓</span>
      </motion.div>
    </section>
  );
};

export default HeroSection;
