import { navigate } from "astro:transitions/client";

export function initSwipeNavigation(
  selector: string,
  scope: Document | Element | string = document,
  axis: "x" | "y" = "x",
): () => void {
  const container: Document | Element | null =
    typeof scope === "string" ? document.querySelector(scope) : scope;

  if (!container) return () => {};

  const links = Array.from(
    container.querySelectorAll<HTMLAnchorElement>(selector),
  );
  const currentIndex = links.findIndex((link) =>
    link.hasAttribute("aria-current"),
  );

  let start = 0;
  let end = 0;

  function getCoord(event: PointerEvent) {
    return axis === "x" ? event.clientX : event.clientY;
  }

  function handleSwipe() {
    const swipeDistance = end - start;
    const threshold = 50;

    if (Math.abs(swipeDistance) < threshold) return;

    if (swipeDistance < 0 && currentIndex < links.length - 1) {
      navigate(links[currentIndex + 1].href);
    } else if (swipeDistance > 0 && currentIndex > 0) {
      navigate(links[currentIndex - 1].href);
    }
  }

  function handlePointerStart(event: Event) {
    start = getCoord(event as PointerEvent);
  }

  function handlePointerEnd(event: Event) {
    end = getCoord(event as PointerEvent);
    handleSwipe();
  }

  container.addEventListener("pointerdown", handlePointerStart, {
    passive: true,
  });
  container.addEventListener("pointerup", handlePointerEnd, {
    passive: true,
  });

  return () => {
    container.removeEventListener("pointerdown", handlePointerStart);
    container.removeEventListener("pointerup", handlePointerEnd);
  };
}
