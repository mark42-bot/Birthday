import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LockScreen from "@/components/LockScreen";
import WelcomeScreen from "@/components/WelcomeScreen";
import HeroSection from "@/components/HeroSection";
import ClickMeTrap from "@/components/ClickMeTrap";
import GiftBoxAnimation from "@/components/GiftBoxAnimation";
import LoveLetter from "@/components/LoveLetter";
import PhotoGallery from "@/components/PhotoGallery";
import Timeline from "@/components/Timeline";
import MusicPlayer from "@/components/MusicPlayer";
import Footer from "@/components/Footer";

type Stage = "locked" | "welcome" | "hero" | "clicktrap" | "giftbox" | "content";

const Index = () => {
  const [stage, setStage] = useState<Stage>("locked");

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence>
        {stage === "locked" && (
          <LockScreen onUnlock={() => setStage("welcome")} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage === "welcome" && (
          <WelcomeScreen onOpen={() => setStage("hero")} />
        )}
      </AnimatePresence>

      {stage === "hero" && (
        <>
          <MusicPlayer />
          <HeroSection />
          <div className="flex justify-center py-12">
            <button
              onClick={() => setStage("clicktrap")}
              className="font-handwritten text-2xl px-8 py-4 rounded-2xl bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors animate-bounce-soft"
            >
              Continue to your surprise! 🎁
            </button>
          </div>
        </>
      )}

      <AnimatePresence>
        {stage === "clicktrap" && (
          <ClickMeTrap onComplete={() => setStage("giftbox")} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage === "giftbox" && (
          <GiftBoxAnimation onComplete={() => setStage("content")} />
        )}
      </AnimatePresence>

      {stage === "content" && (
        <>
          <MusicPlayer />
          <HeroSection />
          <Timeline />
          <LoveLetter />
          <PhotoGallery />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
