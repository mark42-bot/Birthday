import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WRONG_MESSAGES = [
  "😏 Really? Try again baby...",
  "🙄 You forgot OUR secret?",
  "😂 Not even close!",
  "🤨 Think harder... it's special!",
  "😜 Wow… I'm disappointed!",
  "❤️ Hint: something about us...",
];

const CORRECT_PASSWORD = "iloveyou";

interface LockScreenProps {
  onUnlock: () => void;
}

const LockScreen = ({ onUnlock }: LockScreenProps) => {
  const [password, setPassword] = useState("");
  const [wrongCount, setWrongCount] = useState(0);
  const [shaking, setShaking] = useState(false);
  const [message, setMessage] = useState("Enter our secret password 💕");

  const hearts = useMemo(
    () =>
      [...Array(8)].map((_, i) => ({
        left: `${Math.random() * 90 + 5}%`,
        top: `${Math.random() * 90 + 5}%`,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
        emoji: ["💕", "💖", "🌸", "✨", "🎀", "💗", "💘", "💝"][i % 8],
      })),
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase().replace(/\s/g, "") === CORRECT_PASSWORD) {
      onUnlock();
    } else {
      setShaking(true);
      setMessage(WRONG_MESSAGES[wrongCount % WRONG_MESSAGES.length]);
      setWrongCount((c) => c + 1);
      setPassword("");
      setTimeout(() => setShaking(false), 500);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-background overflow-hidden"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5 }}
    >
      {hearts.map((h, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl md:text-3xl select-none opacity-40"
          style={{ left: h.left, top: h.top }}
          animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: h.duration, repeat: Infinity, delay: h.delay }}
        >
          {h.emoji}
        </motion.span>
      ))}

      <motion.div
        className="text-7xl md:text-8xl mb-6"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        🔐
      </motion.div>

      <motion.h1
        className="font-handwritten text-3xl md:text-5xl text-primary mb-4 text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        This is locked! 💗
      </motion.h1>

      <AnimatePresence mode="wait">
        <motion.p
          key={message}
          className="text-muted-foreground text-lg md:text-xl mb-8 text-center px-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {message}
        </motion.p>
      </AnimatePresence>

      <motion.form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 w-full max-w-xs px-4"
        animate={shaking ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Type the password..."
          className="w-full px-4 py-3 rounded-xl border-2 border-primary/30 bg-card text-center text-lg font-handwritten focus:outline-none focus:border-primary transition-colors"
          autoFocus
        />
        <motion.button
          type="submit"
          className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-handwritten text-xl hover:bg-primary/90 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Unlock 💌
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default LockScreen;
