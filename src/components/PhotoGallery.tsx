import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

const PHOTOS = [
  { url: "photo1.jpeg", caption: "My Favriote pic 💕", note: "I can see the face all day without blink" },
  { url: "photo2.jpeg", caption: "This pout feels amazing 🌅", note: " I want to eat those cute yummy lips " },
  { url: "photo3.jpeg", caption: "Hot like fire💃", note: "That crop top suits you more than anything else" },
  { url: "photo4.jpeg", caption: "Distant hugs 😂", note: "These hugs make me feel more special whenwver I am sad" },
  { url: "photo5.jpeg", caption: "Such a pretty smile 🗺️", note: "I can see in the eyes and never get bored" },
  { url: "photo6.jpeg", caption: "My loving lips and kissi 😂", note: "Never got enough from your kissu...always want it more and more" },
];

const swipeConfidence = (offset: number, velocity: number) =>
  Math.abs(offset) * velocity;

const PhotoGallery = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const paginate = (dir: number) => {
    setDirection(dir);
    setRevealed(false);
    setCurrent((prev) => {
      const next = prev + dir;
      if (next < 0) return PHOTOS.length - 1;
      if (next >= PHOTOS.length) return 0;
      return next;
    });
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const swipe = swipeConfidence(info.offset.x, info.velocity.x);
    if (swipe > 5000) paginate(-1);
    else if (swipe < -5000) paginate(1);
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0, scale: 0.9 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0, scale: 0.9 }),
  };

  const photo = PHOTOS[current];

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Floating decorations */}
      {["📸", "💝", "🌟", "🦋"].map((e, i) => (
        <motion.span
          key={i}
          className="absolute text-xl opacity-15 select-none pointer-events-none"
          style={{ left: `${8 + i * 22}%`, top: `${8 + (i % 2) * 60}%` }}
          animate={{ y: [0, -25, 0] }}
          transition={{ duration: 3 + i, repeat: Infinity }}
        >
          {e}
        </motion.span>
      ))}

      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-handwritten text-4xl md:text-6xl text-primary mb-3">
          Our Moments Together 📸
        </h2>
        <p className="text-muted-foreground text-lg">
          Swipe or tap arrows to explore • Tap photo to reveal a secret 💌
        </p>
      </motion.div>

      {/* Card carousel */}
      <div className="max-w-md mx-auto relative" style={{ minHeight: 520 }}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="bg-card rounded-2xl shadow-2xl p-4 pb-6 border border-border/50 cursor-grab active:cursor-grabbing"
          >
            {/* Photo with tap-to-reveal */}
            <div
              className="aspect-[3/4] rounded-xl overflow-hidden relative"
              onClick={() => setRevealed((r) => !r)}
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover"
              />
              <AnimatePresence>
                {revealed && (
                  <motion.div
                    className="absolute inset-0 bg-foreground/70 backdrop-blur-sm flex items-center justify-center p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.p
                      className="font-handwritten text-2xl md:text-3xl text-card text-center leading-relaxed"
                      initial={{ scale: 0.8, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      "{photo.note}"
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="text-center mt-4">
              <p className="font-handwritten text-2xl text-primary">{photo.caption}</p>
              <p className="text-muted-foreground text-xs mt-1">
                {revealed ? "Tap again to close" : "Tap the photo 💌"}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-14 w-10 h-10 rounded-full bg-card shadow-lg border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          ‹
        </button>
        <button
          onClick={() => paginate(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-14 w-10 h-10 rounded-full bg-card shadow-lg border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          ›
        </button>
      </div>

      {/* Progress */}
      <div className="flex justify-center gap-2 mt-8">
        {PHOTOS.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setRevealed(false); setCurrent(i); }}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-primary" : "w-2 bg-muted"
            }`}
          />
        ))}
      </div>

      {/* Counter */}
      <p className="text-center text-muted-foreground text-sm mt-3">
        {current + 1} / {PHOTOS.length}
      </p>
    </section>
  );
};

export default PhotoGallery;
