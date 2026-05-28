import { useEffect } from "react";

/**
 * Unified scroll-reveal hook — watches .sr and .expand-bar elements,
 * adds "visible" class when they enter the viewport.
 * Mirrors the same logic used on the home page.
 */
export function useScrollReveal() {
  useEffect(() => {
    const reveal = (el: Element) => {
      el.classList.add("visible");
      obs.unobserve(el);
    };

    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) reveal(e.target); }),
      { threshold: 0.02, rootMargin: "0px 0px 60px 0px" }
    );

    const els = document.querySelectorAll<Element>(".sr, .expand-bar");
    els.forEach((el) => obs.observe(el));

    // Immediate pass — reveal anything already in the viewport on mount
    const immediate = setTimeout(() => {
      document.querySelectorAll<Element>(".sr:not(.visible), .expand-bar:not(.visible)")
        .forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) reveal(el);
        });
    }, 80);

    return () => { obs.disconnect(); clearTimeout(immediate); };
  }, []);
}
