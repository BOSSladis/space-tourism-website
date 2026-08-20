export function preventSamePageNavigation(
  selector: string,
  root: ParentNode = document,
) {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  root.querySelectorAll<HTMLAnchorElement>(selector).forEach((link) => {
    link.addEventListener("click", (event) => {
      if (link.getAttribute("aria-current") === "page") {
        event.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
      }
    });
  });
}
