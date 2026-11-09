import { Fragment, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useSearchParams } from "react-router";
import { Footer } from "../components/Footer";
import { HeroBackground } from "../components/HeroBackground";
import { LangToggle } from "../components/LangToggle";
import { launchWindowEn, launchWindowEs } from "../config/launch";
import { setMeta, usePageShell } from "../lib/document";
import { playHeroEntrance } from "../lib/heroMotion";
import { messages } from "../lib/i18n/messages";
import { fluidF, fluidU, glassSx } from "../theme";

const stackGap = "clamp(16px, 2.2vh, 28px)";

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const locale = searchParams.get("lang") === "en" ? "en" : "es";
  const copy = messages[locale];
  const stageRef = useRef(null);

  usePageShell("home", locale);

  useEffect(() => {
    document.title = copy.metaTitle;
    setMeta('meta[name="description"]', copy.metaDescription);
    setMeta('meta[property="og:title"]', copy.metaTitle);
    setMeta('meta[property="og:description"]', copy.metaDescription);
    setMeta('meta[property="og:locale"]', locale === "es" ? "es_ES" : "en_GB");
    setMeta('meta[property="og:image"]', new URL("/media/artwork.webp", location.origin).href);
    setMeta('meta[property="og:image:alt"]', copy.ogImageAlt);
  }, [copy, locale]);

  useEffect(() => {
    if (!stageRef.current) return;
    return playHeroEntrance(stageRef.current);
  }, []);

  const windowText = (locale === "en" ? launchWindowEn : launchWindowEs).trim();
  const statusLabel = windowText ? `${copy.status} · ${windowText}` : copy.status;

  const selectLocale = (next) => {
    setSearchParams(next === "en" ? { lang: "en" } : {}, { replace: true });
  };

  return (
    <>
      <Link
        className="skip"
        href="#content"
        sx={{
          position: "absolute",
          left: 12,
          top: 12,
          zIndex: 20,
          display: "inline-flex",
          alignItems: "center",
          minHeight: 44,
          px: 1.5,
          py: 1,
          bgcolor: "#fff",
          color: "#0d0c11",
          textDecoration: "none",
          transform: "translateY(-140%)",
          "&:focus": { transform: "none" },
        }}
      >
        {copy.skip}
      </Link>
      <HeroBackground />
      <Box
        className="stage"
        ref={stageRef}
        sx={{ position: "relative", zIndex: 1, width: "100%", minHeight: "100dvh" }}
      >
        <Box
          className="frame"
          sx={{
            width: "min(1180px, 100%)",
            minHeight: "100dvh",
            mx: "auto",
            px: "clamp(20px, 4vw, 48px)",
            pt: "clamp(12px, 2vh, 20px)",
            pb: "clamp(12px, 2vh, 24px)",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
          }}
        >
          <Stack
            className="header"
            component="header"
            direction="row"
            sx={{ position: "relative", alignItems: "center", justifyContent: "space-between", gap: 2, p: 0, flex: "none" }}
          >
            <Box
              className="hero-logo"
              sx={{
                width: { xs: "min(148px, 42vw)", sm: "min(220px, 42vw)" },
                pointerEvents: "none",
                "& img": { display: "block", width: "100%", height: "auto" },
              }}
            >
              <img src="/media/logo-wordmark.png" alt="Outfox Energía" />
            </Box>
            <LangToggle locale={locale} label={copy.langLabel} onSelect={selectLocale} tone="home" />
          </Stack>

          <Box
            className="hero"
            sx={{
              position: "relative",
              flex: 1,
              display: "grid",
              gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "minmax(0, 1fr) auto" },
              justifyItems: { xs: "center", md: "stretch" },
              alignItems: { xs: "center", md: "stretch" },
              columnGap: "clamp(24px, 4vw, 56px)",
              width: "100%",
              minHeight: 0,
              my: stackGap,
            }}
          >
            <Box
              className="copy"
              component="main"
              id="content"
              sx={{
                order: 1,
                position: "relative",
                zIndex: 2,
                width: { xs: "min(100%, 640px)", md: "min(520px, 100%)" },
                maxWidth: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-start" },
                alignSelf: { xs: "center", md: "start" },
                textAlign: { xs: "center", md: "left" },
                gap: stackGap,
                mt: { xs: 0, md: "clamp(48px, 8vh, 80px)" },
                mx: { xs: "auto", md: 0 },
              }}
            >
              <Box
                className="status pill glass"
                role="status"
                aria-label={statusLabel}
                sx={{
                  ...glassSx,
                  position: "relative",
                  isolation: "isolate",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 30,
                  m: 0,
                  px: "12px",
                  gap: 1,
                  borderRadius: 999,
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                  whiteSpace: "nowrap",
                }}
              >
                <Box
                  className="status-dot"
                  aria-hidden="true"
                  sx={{
                    position: "relative",
                    zIndex: 1,
                    width: 8,
                    height: 8,
                    flex: "none",
                    borderRadius: "50%",
                    bgcolor: "#7100f1",
                  }}
                />
                <Box component="span" className="status-label" sx={{ position: "relative", zIndex: 1 }}>
                  {statusLabel}
                </Box>
              </Box>
              <Typography
                component="h1"
                sx={{
                  m: 0,
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 380,
                  fontSize: `calc(104 * ${fluidU})`,
                  lineHeight: 1.05,
                  letterSpacing: "-0.045em",
                  "@media (max-aspect-ratio: 7/5)": { fontSize: `calc(64 * ${fluidF})` },
                }}
              >
                <Headline line={copy.h1a} />
                <Headline line={copy.h1b} accent />
              </Typography>
              <Typography
                className="lead"
                sx={{
                  m: 0,
                  maxWidth: "100%",
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 380,
                  fontSize: `calc(104 * ${fluidU} * 0.62)`,
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                  color: "#fff",
                  textWrap: "balance",
                  "@media (max-aspect-ratio: 7/5)": { fontSize: `calc(64 * ${fluidF} * 0.62)` },
                }}
              >
                {copy.lead}
              </Typography>
              <Stack
                className="stats"
                direction="row"
                sx={{
                  alignItems: "center",
                  justifyContent: { xs: "center", md: "flex-start" },
                  gap: `calc(28 * ${fluidU})`,
                  m: 0,
                  flexWrap: "wrap",
                  "@media (max-aspect-ratio: 7/5)": { gap: "16px" },
                }}
              >
                {copy.promises.map((promise, index) => (
                  <Fragment key={promise.word}>
                    {index > 0 && (
                      <Box
                        className="hair"
                        aria-hidden="true"
                        sx={{
                          width: "1px",
                          alignSelf: "stretch",
                          bgcolor: "rgba(255, 255, 255, 0.16)",
                          "@media (max-aspect-ratio: 7/5)": { height: 42, alignSelf: "center" },
                        }}
                      />
                    )}
                    <Box className="stat rise" sx={{ display: "flex", flexDirection: "column", gap: `calc(2 * ${fluidU})` }}>
                      <Box
                        component="b"
                        sx={{
                          fontFamily: '"DM Sans", sans-serif',
                          fontWeight: 380,
                          fontSize: `calc(50 * ${fluidU})`,
                          letterSpacing: "-0.04em",
                          fontStyle: "normal",
                          lineHeight: 1,
                          "@media (max-aspect-ratio: 7/5)": { fontSize: `calc(40 * ${fluidF})` },
                        }}
                      >
                        {promise.word}
                      </Box>
                      <Box
                        component="span"
                        sx={{
                          color: "#b9b8bb",
                          fontSize: `calc(22 * ${fluidU})`,
                          fontWeight: 400,
                          maxWidth: "14em",
                          "@media (max-aspect-ratio: 7/5)": { fontSize: `max(14px, calc(18 * ${fluidF}))` },
                        }}
                      >
                        {promise.caption}
                      </Box>
                    </Box>
                  </Fragment>
                ))}
              </Stack>
            </Box>

            <Box
              className="hero-side"
              sx={{
                order: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-end" },
                justifyContent: "flex-end",
                gap: "14px",
                width: { xs: "min(340px, calc(100vw - 40px))", sm: "min(340px, calc(100vw - 48px))", md: "min(256px, 22vw)" },
                minWidth: 0,
                m: { xs: "20px auto 0", md: 0 },
                alignSelf: { xs: "center", md: "end" },
                justifySelf: { xs: "center", md: "auto" },
                transform: { xs: "none", md: "translateY(40px)" },
              }}
            >
              <Paper
                className="card card-b glass rise"
                elevation={0}
                sx={{
                  ...glassSx,
                  position: "relative",
                  zIndex: 4,
                  alignSelf: { xs: "stretch", md: "flex-end" },
                  width: { xs: "100%", md: "min(320px, calc(100% + 80px))" },
                  minHeight: 0,
                  m: 0,
                  p: { xs: "16px 18px", md: "18px" },
                  gap: "14px",
                  borderRadius: "18px",
                  display: "flex",
                  alignItems: "center",
                  textAlign: "left",
                  boxShadow: { xs: "-8px 14px 28px rgba(0, 0, 0, 0.38)", md: "-8px 14px 28px rgba(0, 0, 0, 0.38)" },
                }}
              >
                <Box
                  className="icon"
                  aria-hidden="true"
                  sx={{
                    width: { xs: 40, sm: 44 },
                    height: { xs: 40, sm: 44 },
                    flex: "none",
                    borderRadius: "14px",
                    display: "grid",
                    placeItems: "center",
                    bgcolor: "rgba(159, 240, 236, 0.06)",
                    border: "1px solid rgba(189, 247, 238, 0.28)",
                    "& svg": { width: 24, height: 24, display: "block" },
                  }}
                >
                  <svg viewBox="0 0 32 32" fill="none">
                    <path d="M5.5 15.2 16 6.2l10.5 9v11.2h-21V15.2Z" stroke="#9ff0ec" strokeWidth="1.6" strokeLinejoin="round" />
                    <path d="M16.2 13.2 13.4 18h2.5l-1.1 4.6 4.8-6.2h-2.7l-0.7-3.2Z" fill="#bdf7ee" />
                  </svg>
                </Box>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography className="kicker" sx={{ m: "0 0 6px", color: "#bdf7ee", fontSize: 14, fontWeight: 500, letterSpacing: "0.01em" }}>
                    {copy.cardBottomKicker}
                  </Typography>
                  <Typography
                    component="h2"
                    sx={{
                      m: 0,
                      maxWidth: { xs: "none", md: "18ch" },
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 430,
                      fontSize: { xs: 15, md: 16 },
                      lineHeight: 1.3,
                      letterSpacing: "-0.02em",
                      color: "#fff",
                      textWrap: { xs: "pretty", md: "balance" },
                    }}
                  >
                    {copy.cardBottom}
                  </Typography>
                </Box>
              </Paper>
              <Box
                className="hero-fox"
                aria-hidden="true"
                sx={{
                  position: "relative",
                  zIndex: 2,
                  width: { xs: "min(180px, 56%)", sm: "min(220px, 70%)", md: "100%" },
                  height: "auto",
                  mt: { xs: 0, md: "52px" },
                  top: { xs: 0, md: "32px" },
                  mx: { xs: "auto", md: 0 },
                  overflow: "visible",
                  pointerEvents: "none",
                  "& img": { display: "block", width: "100%", height: "auto" },
                }}
              >
                <img src="/media/fox-blink.webp" alt="" width={512} height={768} />
              </Box>
            </Box>
          </Box>

          <Footer locale={locale} />
        </Box>
      </Box>
    </>
  );
}

function Headline({ line, accent = false }) {
  return (
    <Box
      component="span"
      className="line"
      sx={{
        display: "block",
        overflow: "hidden",
        width: { xs: "100%", md: "max-content" },
        maxWidth: "100%",
        mx: { xs: "auto", md: 0 },
      }}
    >
      <Box
        component="span"
        sx={{
          display: "block",
          whiteSpace: "nowrap",
          ...(accent
            ? { background: "none", color: "#c084fc", WebkitTextFillColor: "#c084fc" }
            : {
                background: "linear-gradient(90deg, #ffffff 0%, #ffffff 38%, #d3d3d7 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }),
        }}
      >
        {line}
      </Box>
    </Box>
  );
}
