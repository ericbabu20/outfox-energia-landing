import { useEffect, useState } from "react";

const mobileQuery = "(max-width: 1024px)";

const sources = {
  desktop: {
    webm: "/media/hero_desktop_1920x800.webm",
    mp4: "/media/hero_desktop_1920x800.mp4",
  },
  mobile: {
    webm: "/media/hero_mobile_1080x1080.webm",
    mp4: "/media/hero_mobile_1080x1080.mp4",
  },
};

export function HeroBackground() {
  const [mobile, setMobile] = useState(() => window.matchMedia(mobileQuery).matches);
  const clip = mobile ? sources.mobile : sources.desktop;

  useEffect(() => {
    const query = window.matchMedia(mobileQuery);
    const update = () => setMobile(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <div className="hero-video" aria-hidden="true">
      <video key={clip.mp4} autoPlay muted loop playsInline preload="auto">
        <source src={clip.webm} type="video/webm" />
        <source src={clip.mp4} type="video/mp4" />
      </video>
    </div>
  );
}
