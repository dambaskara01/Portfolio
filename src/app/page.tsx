import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Engineering from "@/components/Engineering";
import UIUX from "@/components/UIUX";
import GraphicDesign from "@/components/GraphicDesign";
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
          <UIUX />
          <GraphicDesign />
        </main>
      </PageTransitionProvider>
    </SmoothScrollProvider>
  );
}
