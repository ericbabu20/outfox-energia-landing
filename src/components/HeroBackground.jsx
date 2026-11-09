import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

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
    <Box
      className="hero-video"
      aria-hidden="true"
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        bgcolor: "#120c1c",
        "& video": {
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: { xs: "right center", md: "center center" },
        },
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(8, 5, 16, 0.5) 0%, rgba(8, 5, 16, 0.18) 46%, rgba(8, 5, 16, 0.08) 100%), linear-gradient(180deg, rgba(8, 5, 16, 0.28) 0%, rgba(8, 5, 16, 0) 24%)",
        },
      }}
    >
      <video key={clip.mp4} autoPlay muted loop playsInline preload="auto">
        <source src={clip.webm} type="video/webm" />
        <source src={clip.mp4} type="video/mp4" />
      </video>
    </Box>
  );
}
