export interface ViewportActivityOptions {
  rootMargin?: string;
}

/**
 * Observe l'activité visible réelle d'un conteneur animé (`IntersectionObserver`, `document.hidden`,
 * et `contentvisibilityautostatechange` directement sur l'élément) afin de suspendre les boucles
 * `requestAnimationFrame` hors-écran ou lorsque l'onglet est masqué.
 */
export function observeRenderActivity(
  element: Element | null,
  onActiveChange: (isActive: boolean) => void,
  options: ViewportActivityOptions = {}
): () => void {
  if (typeof window === "undefined" || !element) {
    return () => {};
  }

  let isIntersecting = true;
  let isContentSkipped = false;
  let lastNotified: boolean | null = null;

  const notify = () => {
    const nextActive = !document.hidden && isIntersecting && !isContentSkipped;
    if (nextActive !== lastNotified) {
      lastNotified = nextActive;
      onActiveChange(nextActive);
    }
  };

  const handleVisibilityChange = () => notify();

  const handleContentVisibility = (event: Event) => {
    const cvEvent = event as Event & { skipped?: boolean };
    if (typeof cvEvent.skipped === "boolean") {
      isContentSkipped = cvEvent.skipped;
      notify();
    }
  };

  let observer: IntersectionObserver | null = null;
  if ("IntersectionObserver" in window) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === element) {
            isIntersecting = entry.isIntersecting;
          }
        }
        notify();
      },
      { rootMargin: options.rootMargin ?? "200px 0px" }
    );
    observer.observe(element);
  }

  document.addEventListener("visibilitychange", handleVisibilityChange);
  element.addEventListener("contentvisibilityautostatechange", handleContentVisibility);
  notify();

  return () => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    element.removeEventListener("contentvisibilityautostatechange", handleContentVisibility);
    observer?.disconnect();
  };
}
