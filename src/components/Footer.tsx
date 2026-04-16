import { motion } from "framer-motion";

const Footer = () => (
  <footer className="py-16 px-4 text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <p className="font-handwritten text-3xl md:text-5xl text-primary mb-4">
        Here's to another amazing year! 🥂
      </p>
      <p className="text-muted-foreground text-lg">
        Made with all my love, just for you 💖
      </p>
      <div className="mt-8 text-4xl">
        🎂 🎁 🎈 💕 🎉
      </div>
    </motion.div>
  </footer>
);

export default Footer;
