import { createTheme } from "@mui/material/styles";

/** Viewport-height unit used by the hero type scale. */
export const fluidU = "max(0.468px, 100dvh / 1455)";
/** Slightly smaller unit used when the screen is tall and narrow. */
export const fluidF = "clamp(0.55px, 0.449px + 0.0284vw, 0.76px)";

export const glassSx = {
  bgcolor: "rgba(255, 255, 255, 0.02)",
  border: "1px solid rgba(255, 255, 255, 0.16)",
  backdropFilter: "blur(8px) brightness(1.15) saturate(0.8)",
  boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.42), inset 0 0 18px rgba(255, 255, 255, 0.04)",
};

const globalCss = `
  @font-face {
    font-family: "DM Sans";
    src: url("/fonts/dm-sans-latin.woff2") format("woff2");
    font-weight: 100 900;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "DM Sans";
    src: url("/fonts/dm-sans-italic-latin.woff2") format("woff2");
    font-weight: 700;
    font-style: italic;
    font-display: swap;
  }
  @font-face {
    font-family: "Inter";
    src: url("/fonts/inter-latin.woff2") format("woff2");
    font-weight: 300 560;
    font-style: normal;
    font-display: swap;
  }
  html { color-scheme: dark; }
  body {
    min-height: 100dvh;
    background-color: #15111e;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
    background-size: calc(64 * ${fluidU}) calc(64 * ${fluidU});
    background-position: center top;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  body[data-page="home"] {
    background-color: #120c1c;
    background-image: none;
  }
  @media (prefers-reduced-motion: no-preference) {
    html.motion .rise,
    html.motion .line span,
    html.motion .lead,
    html.motion .hero-fox,
    html.motion .hero-logo,
    html.motion .hair,
    html.motion .status {
      opacity: 0;
    }
    html.motion .line span { transform: translateY(108%); }
    html.motion .status.is-in {
      animation: status-in 480ms cubic-bezier(0.16, 1, 0.3, 1) 570ms both;
    }
    html.motion .status::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: 0;
      border-radius: inherit;
      pointer-events: none;
      background-image: linear-gradient(
        105deg,
        transparent 38%,
        rgba(113, 0, 241, 0.05) 46%,
        rgba(196, 160, 255, 0.42) 50%,
        rgba(113, 0, 241, 0.05) 54%,
        transparent 62%
      );
      background-size: 240% 100%;
      background-repeat: no-repeat;
      animation: status-shimmer 4s linear infinite;
    }
    html.motion .status-dot::after {
      content: "";
      position: absolute;
      inset: -1px;
      border-radius: inherit;
      border: 1.5px solid #7100f1;
      animation: status-ring 2s ease-out infinite;
    }
  }
  @keyframes status-in {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes status-ring {
    0% { opacity: 0.7; transform: scale(1); }
    70%, 100% { opacity: 0; transform: scale(2.6); }
  }
  @keyframes status-shimmer {
    0% { background-position: 130% 0; }
    42% { background-position: -40% 0; }
    100% { background-position: -40% 0; }
  }
`;

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#7100f1" },
    secondary: { main: "#9ff0ec" },
    background: { default: "#15111e", paper: "#17161c" },
    text: { primary: "#ffffff", secondary: "#b9b8bb" },
    divider: "rgba(255, 255, 255, 0.16)",
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    h1: {
      fontFamily: '"DM Sans", sans-serif',
      fontWeight: 380,
      letterSpacing: "-0.045em",
      lineHeight: 1.05,
    },
    h2: {
      fontFamily: "Inter, sans-serif",
      fontWeight: 430,
      letterSpacing: "-0.02em",
      lineHeight: 1.22,
    },
    button: { textTransform: "none" },
  },
  shape: { borderRadius: 16 },
  breakpoints: {
    values: { xs: 0, sm: 768, md: 1025, lg: 1200, xl: 1536 },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { textTransform: "none" },
      },
    },
    MuiCssBaseline: {
      styleOverrides: globalCss,
    },
  },
});
