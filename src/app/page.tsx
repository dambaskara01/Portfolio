import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Engineering from "@/components/Engineering";
import UiUx from "@/components/UiUx";
import Branding from "@/components/Branding";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
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
          <UiUx />
          <Branding />
          <Skills />
          <Experience />
          <Contact />
          <Footer />
        </main>
      </PageTransitionProvider>
    </SmoothScrollProvider>
  );
}
