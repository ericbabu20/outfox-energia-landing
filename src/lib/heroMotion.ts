const easing = "cubic-bezier(0.16, 1, 0.3, 1)";

const rise: Keyframe[] = [
  { opacity: 0, transform: "translateY(16px)" },
  { opacity: 1, transform: "translateY(0)" },
];

/** Plays the hero entrance and returns a cleanup that cancels it. */
export function playHeroEntrance(root: HTMLElement): () => void {
  const html = document.documentElement;
  if (!html.classList.contains("motion")) return () => {};

  const running: Animation[] = [];
  const play = (element: Element | null, keyframes: Keyframe[], delay: number, duration = 760) => {
    const animation = element?.animate(keyframes, { duration, delay, easing, fill: "both" });
    if (animation) running.push(animation);
  };
  const all = (selector: string) => root.querySelectorAll(selector);

  try {
    root.querySelector(".status")?.classList.add("is-in");
    all(".header .rise").forEach((element, index) => play(element, rise, 60 + index * 70, 720));
    all(".line span").forEach((element, index) =>
      play(
        element,
        [
          { opacity: 0, transform: "translateY(108%)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        420 + index * 120,
        880,
      ),
    );
    play(
      root.querySelector(".lead"),
      [
        { opacity: 0, transform: "translateY(12px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      700,
      700,
    );
    play(root.querySelector(".hero-logo"), [{ opacity: 0 }, { opacity: 1 }], 280, 800);
    // Keyframes replace any CSS transform on .hero-fox, so position it with margins, not transforms.
    play(
      root.querySelector(".hero-fox"),
      [
        { opacity: 0, transform: "translateY(18px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      480,
      900,
    );
    all(".stat").forEach((element, index) => play(element, rise, 1160 + index * 110, 700));
    all(".hair").forEach((element) => play(element, [{ opacity: 0 }, { opacity: 1 }], 1160, 700));
    all(".card").forEach((element, index) => play(element, [{ opacity: 0 }, { opacity: 1 }], 1480 + index * 140, 800));
  } catch {
    html.classList.remove("motion");
  }

  return () => running.forEach((animation) => animation.cancel());
}
