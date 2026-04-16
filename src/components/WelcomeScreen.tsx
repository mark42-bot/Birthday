import { motion } from "framer-motion";

interface WelcomeScreenProps {
  onOpen: () => void;
}

const WelcomeScreen = ({ onOpen }: WelcomeScreenProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background cursor-pointer overflow-hidden"
      onClick={onOpen}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Floating hearts background */}
      {[...Array(12)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl md:text-4xl select-none"
          style={{
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 90 + 5}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          {["💕", "💖", "🌸", "✨", "🎀", "💗"][i % 6]}
        </motion.span>
      ))}

      {/* Gift box */}
      <motion.div
        className="relative"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="text-8xl md:text-9xl"
          whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.4 }}
        >
          🎁
        </motion.div>
      </motion.div>

      <motion.h1
        className="font-handwritten text-4xl md:text-6xl text-primary mt-8 text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        You have a surprise!
      </motion.h1>

      <motion.p
        className="text-muted-foreground mt-4 text-lg md:text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.6, 1] }}
        transition={{ delay: 0.8, duration: 2, repeat: Infinity }}
      >
        Tap anywhere to open 💌
      </motion.p>
    </motion.div>
  );
};

export default WelcomeScreen;
