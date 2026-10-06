"use client";

import { useEffect, useRef, type ReactNode } from "react";

export type ProjectModalVariant = "drawer" | "fullscreen" | "lightbox";

interface ProjectModalProps {
  open: boolean;
  onClose: () => void;
  variant: ProjectModalVariant;
  labelledBy: string;
  children: ReactNode;
}

/*
 * Wraps the native <dialog> so focus trap, Escape and background inerting
 * come from the browser. Enter/exit motion lives in projects.css.
 */
export default function ProjectModal({
  open,
  onClose,
  variant,
  labelledBy,
  children,
}: ProjectModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Lenis listens on window, so it has to be paused while the dialog owns the scroll.
  useEffect(() => {
    if (!open) return;
    window.__lenis?.stop();
    document.body.style.overflow = "hidden";
    return () => {
      window.__lenis?.start();
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className={`pm pm--${variant}`}
      aria-labelledby={labelledBy}
      onClose={onClose}
      onClick={(event) => {
        // Only the backdrop reports the dialog itself as target with coordinates outside its box.
        if (event.target !== event.currentTarget) return;
        const box = event.currentTarget.getBoundingClientRect();
        const inside =
          event.clientX >= box.left &&
          event.clientX <= box.right &&
          event.clientY >= box.top &&
          event.clientY <= box.bottom;
        if (!inside) onClose();
      }}
    >
      <button type="button" className="pm__close" onClick={onClose}>
        Close
      </button>
      <div className="pm__scroll" data-lenis-prevent>
        {children}
      </div>
    </dialog>
  );
}
