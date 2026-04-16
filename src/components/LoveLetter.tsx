import { motion } from "framer-motion";

const LETTER_MESSAGE = `My Dear Mumma,

Every day with you feels like a celebration, but today is extra special because You WERE born for ME! 🎁

You light up every room you walk into, make my heart skip a beat with your smile, and turn the ordinary into something extraordinary.

On this beautiful day, I want you to know — you are my favorite person, my best adventure, and my greatest love story.

Here's to another year of laughing too loud, loving too hard, and making memories we'll never forget.

Happy Birthday, my LOVE! 🎂💕

Forever yours,
With all my love ❤️`;

const LoveLetter = () => {
  return (
    <section className="py-20 px-4 flex items-center justify-center">
      <motion.div
        className="max-w-2xl w-full"
        initial={{ opacity: 0, y: 40, rotateX: 20 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-handwritten text-4xl md:text-5xl text-primary text-center mb-8">
          A Letter For You 💌
        </h2>

        <motion.div
          className="bg-card rounded-2xl p-8 md:p-12 shadow-xl border-2 border-primary/20 relative overflow-hidden"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          {/* Decorative corner hearts */}
          <span className="absolute top-3 left-4 text-2xl opacity-30">💕</span>
          <span className="absolute top-3 right-4 text-2xl opacity-30">💕</span>
          <span className="absolute bottom-3 left-4 text-2xl opacity-30">💗</span>
          <span className="absolute bottom-3 right-4 text-2xl opacity-30">💗</span>

          <p className="font-handwritten text-xl md:text-2xl leading-relaxed text-card-foreground whitespace-pre-line">
            {LETTER_MESSAGE}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LoveLetter;
