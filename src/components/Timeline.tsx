import { motion } from "framer-motion";

const MILESTONES = [
  { date: "June 27, 2022", emoji: "💕", title: "The Day We Met", description: "The universe brought us together and nothing was ever the same" },
  { date: "October 13, 2022", emoji: "🌹", title: "First Birthday together", description: "First time ever I celebrated My happiest Birthday" },
  { date: "December 2022", emoji: "❄️", title: "First Winter Together", description: "Cuddles, hot chocolate, and our first holiday season" },
  { date: "June 27, 2023", emoji: "🎉", title: "One Year Anniversary", description: "365 days of loving you — and it only got better" },
  { date: "May 17, 2024", emoji: "✈️", title: "Our First Trip: Delhi", description: "Adventures, memories, and falling deeper in love" },
  { date: "June 27, 2024", emoji: "💍", title: "Two Years of Us", description: "Two years and my heart still skips a beat for you" },
  { date: "February 17, 2025", emoji: "🏠", title: "Secodn and first long stay: Delhi", description: "Every day with you Feels like Heaven" },
  { date: "July 19, 2025", emoji: "🎉", title: "Our Third meet: Supportive And Special", description: "Those hugs, I still crave for them" },
  { date: "February 2, 2026", emoji: "✈️", title: "Most Recent Trip", description: "Always memorable day - 5 rounds non-stop" },
  { date: "April 2026", emoji: "💖", title: "Still Falling For You", description: "Almost 4 years and I love you more than ever" },
];

const Timeline = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Floating decorations */}
      {["💫", "🌸", "💗", "✨"].map((e, i) => (
        <motion.span
          key={i}
          className="absolute text-xl opacity-15 select-none pointer-events-none"
          style={{ right: `${5 + i * 20}%`, top: `${10 + i * 20}%` }}
          animate={{ y: [0, -20, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.4 }}
        >
          {e}
        </motion.span>
      ))}

      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-handwritten text-4xl md:text-6xl text-primary mb-3">
          Our Love Story 💕
        </h2>
        <p className="text-muted-foreground text-lg">
          From June 27, 2022 — to forever
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto relative">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 md:-translate-x-px" />

        {MILESTONES.map((m, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={i}
              className={`relative flex items-start mb-12 md:mb-16 ${
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Dot on the line */}
              <motion.div
                className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 z-10 mt-1"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
              />

              {/* Content card */}
              <div
                className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${
                  isLeft ? "md:pr-4 md:text-right" : "md:pl-4 md:text-left"
                }`}
              >
                <motion.div
                  className="bg-card rounded-2xl p-5 shadow-lg border border-border/50"
                  whileHover={{ scale: 1.03, y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-3xl mb-2 block">{m.emoji}</span>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
                    {m.date}
                  </p>
                  <h3 className="font-handwritten text-xl md:text-2xl text-primary mb-1">
                    {m.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{m.description}</p>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Timeline;
