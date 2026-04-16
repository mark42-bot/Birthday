import { useState, useCallback } from "react";
import { motion } from "framer-motion";

interface ClickMeTrapProps {
  onComplete: () => void;
}

const ClickMeTrap = ({ onComplete }: ClickMeTrapProps) => {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [yesClicked, setYesClicked] = useState(false);

  const moveButton = useCallback(() => {
    const x = (Math.random() - 0.5) * (window.innerWidth - 150);
    const y = (Math.random() - 0.5) * (window.innerHeight - 80);
    setNoPos({ x, y });
  }, []);

  const handleYes = () => {
    setYesClicked(true);
    setTimeout(onComplete, 1200);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {yesClicked && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.5, 1] }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-9xl">💖</span>
        </motion.div>
      )}

      {!yesClicked && (
        <>
          <motion.div
            className="text-7xl md:text-8xl mb-6"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            🥺
          </motion.div>

          <motion.h1
            className="font-handwritten text-4xl md:text-6xl text-primary mb-12 text-center px-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            Do you love me? 💕
          </motion.h1>

          <div className="relative flex gap-8">
            <motion.button
              className="px-10 py-4 rounded-2xl bg-primary text-primary-foreground font-handwritten text-2xl shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleYes}
            >
              No! 😢
            </motion.button>

            <motion.button
              className="px-10 py-4 rounded-2xl bg-muted text-muted-foreground font-handwritten text-2xl shadow-lg"
              animate={{ x: noPos.x, y: noPos.y }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onHoverStart={moveButton}
              onClick={moveButton}
              onTouchStart={moveButton}
            >
              Yes 💖
            </motion.button>
          </div>

          <motion.p
            className="text-muted-foreground mt-8 text-lg"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Choose wisely... 😏
          </motion.p>
        </>
      )}
    </motion.div>
  );
};

export default ClickMeTrap;
