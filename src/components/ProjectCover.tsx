import type { CSSProperties } from "react";

interface ProjectCoverProps {
  title: string;
  kicker: string;
  background: string;
  foreground: string;
  className?: string;
}

/*
 * Stand-in until real screenshots exist. The label says so on purpose,
 * so it never passes as a finished asset.
 */
export default function ProjectCover({
  title,
  kicker,
  background,
  foreground,
  className = "",
}: ProjectCoverProps) {
  const style = {
    "--cover-bg": background,
    "--cover-fg": foreground,
  } as CSSProperties;

  return (
    <span
      className={`pcover ${className}`.trim()}
      style={style}
      role="img"
      aria-label={`${title}, screenshot placeholder`}
    >
      <span className="pcover__label">{kicker}</span>
      <span className="pcover__title">{title}</span>
      <span className="pcover__note">Screenshot soon</span>
    </span>
  );
}
