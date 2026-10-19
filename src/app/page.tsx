import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Engineering from "@/components/Engineering";
import UIUXSection from "@/components/UIUXSection";
import SmoothScrollProvider from "@/components/SmoothScroll";
import PageTransitionProvider from "@/components/PageTransition";
import ContextualBadgeCursor from "@/components/ContextualBadgeCursor";

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <PageTransitionProvider>
        {/* Contextual Badge Cursor */}
        <ContextualBadgeCursor />

        <main id="main-content" className="portfolio-main">
          <Hero />
          <Marquee />
          <Engineering />
          <UIUXSection />
        </main>
      </PageTransitionProvider>
    </SmoothScrollProvider>
  );
}
