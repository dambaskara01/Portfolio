import { Fragment } from "react";

interface SplitTextProps {
  text: string;
  className?: string;
  /** Words rendered in the ember italic accent style (exact match). */
  accentWords?: string[];
}

/**
 * Server-rendered word masks: each word sits inside its own overflow-hidden
 * line, so the GSAP mountWordReveal utility can rise them into view one by
 * one. Real text nodes stay in the DOM — screen readers read the heading
 * normally, and content is visible before any animation binds.
 */
export default function SplitText({ text, className = "", accentWords = [] }: SplitTextProps) {
  const words = text.split(" ");
  return (
    <span className={`split ${className}`.trim()}>
      {words.map((word, i) => (
        /* The separating space must sit OUTSIDE the overflow-hidden mask —
           a lone space inside an inline-block collapses and the words run together. */
        <Fragment key={`${word}-${i}`}>
          <span className="word-mask">
            <span className="split-word">
              {accentWords.includes(word) ? <span className="accent-word">{word}</span> : word}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
