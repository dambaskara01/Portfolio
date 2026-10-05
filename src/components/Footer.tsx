"use client";

import { personal } from "@/data/portfolioData";
import { usePageTransition } from "./PageTransition";

export default function Footer() {
  const { navigate } = usePageTransition();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <p className="footer__copy">
            &copy; {year} <em>{personal.name}</em>. Built with Next.js, animated with GSAP.
          </p>

          <a
            href="#hero"
            className="footer__back-top"
            onClick={(e) => {
              e.preventDefault();
              navigate("#hero", "00 // COVER & IDENTITY");
            }}
            aria-label="Return to top of page"
          >
            <span>Back to top</span>
            <span aria-hidden="true">&uarr;</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
