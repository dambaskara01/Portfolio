import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Development from "@/components/Development";
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
          <Development />
        </main>
      </PageTransitionProvider>
    </SmoothScrollProvider>
  );
}
