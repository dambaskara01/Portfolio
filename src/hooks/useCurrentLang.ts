"use client";

import { useState, useEffect } from "react";

function getInitialLang(): "en" | "id" {
  if (typeof document !== "undefined") {
    return document.documentElement.lang === "id" ? "id" : "en";
  }
  return "en";
}

export function useCurrentLang(): "en" | "id" {
  const [lang, setLang] = useState<"en" | "id">(getInitialLang);

  useEffect(() => {
    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<"en" | "id">;
      if (customEvent.detail) {
        setLang(customEvent.detail);
      } else if (typeof document !== "undefined") {
        setLang(document.documentElement.lang === "id" ? "id" : "en");
      }
    };

    window.addEventListener("langchange", handleLangChange);

    const observer = new MutationObserver(() => {
      if (typeof document !== "undefined") {
        setLang(document.documentElement.lang === "id" ? "id" : "en");
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });

    return () => {
      window.removeEventListener("langchange", handleLangChange);
      observer.disconnect();
    };
  }, []);

  return lang;
}
