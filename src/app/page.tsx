import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Disciplines from "@/components/Disciplines";
import Work from "@/components/Work";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SmoothScrollProvider from "@/components/SmoothScroll";
import PageTransitionProvider from "@/components/PageTransition";
import SectionIndicator from "@/components/SectionIndicator";

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <PageTransitionProvider>
        {/* Subtle Floating Editorial Chapter HUD */}
        <SectionIndicator />

        <main id="main-content" className="portfolio-main">
          <Hero />
          <Marquee />
          <Disciplines />
          <Work />
          <Skills />
          <Experience />
          <Contact />
          <Footer />
        </main>
      </PageTransitionProvider>
    </SmoothScrollProvider>
  );
}
