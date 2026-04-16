import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Replace with your own audio URL or file path
const MUSIC_URL = "Tere Naal - Rahat fateh ali khan  Anay Official.mp3";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} src={MUSIC_URL} loop preload="none" />
      <motion.button
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl flex items-center justify-center text-2xl border-2 border-primary-foreground/20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={isPlaying ? { rotate: [0, 10, -10, 0] } : {}}
        transition={isPlaying ? { duration: 1, repeat: Infinity } : {}}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={isPlaying ? "playing" : "paused"}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            {isPlaying ? "🎵" : "🔇"}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </>
  );
};

export default MusicPlayer;
