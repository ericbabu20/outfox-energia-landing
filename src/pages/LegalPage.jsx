import { Fragment, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { Link as RouterLink, useNavigate } from "react-router";
import { CookieConsent, hasStoredConsent } from "../components/CookieConsent";
import { Footer } from "../components/Footer";
import { LangToggle } from "../components/LangToggle";
import { nonEssentialCookies } from "../config/cookies";
import { usePageShell, setMeta } from "../lib/document";
import { consentCopy, legalDocument } from "../lib/i18n/legal";
import { messages } from "../lib/i18n/messages";
import { homeHref, legalNoticeHref, privacyHref } from "../lib/routes";
import { fluidU } from "../theme";

const consentEnabled = nonEssentialCookies().length > 0;

const policyLinkSx = {
  color: "#d7ccff",
  textDecoration: "underline",
  textUnderlineOffset: "0.15em",
};

export function LegalPage({ page, locale }) {
  const navigate = useNavigate();
  const copy = messages[locale];
  const doc = legalDocument(page, locale);
  const consent = consentCopy(locale);
  const [consentOpen, setConsentOpen] = useState(() => consentEnabled && !hasStoredConsent());

  usePageShell(page, locale);

  useEffect(() => {
    document.title = doc.documentTitle;
    setMeta('meta[name="description"]', doc.description);
  }, [doc.documentTitle, doc.description]);

  const switchLocale = (next) => {
    const href = page === "privacy" ? privacyHref : legalNoticeHref;
    navigate(href(next));
  };

  return (
    <>
      <Link
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
      <Stack
        className="header"
        component="header"
        direction="row"
        sx={{
          position: "relative",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          px: "clamp(16px, 5vw, 40px)",
          minHeight: `calc(148 * ${fluidU})`,
          boxSizing: "border-box",
        }}
      >
        <Link
          className="brand"
          component={RouterLink}
          to={homeHref(locale)}
          sx={{ display: "flex", alignItems: "center", minHeight: 44, textDecoration: "none" }}
        >
          <Box
            className="logo"
            component="img"
            src="/media/logo.svg"
            alt="Outfox Energía"
            sx={{ display: "block", height: `max(28px, calc(48 * ${fluidU}))`, width: "auto" }}
          />
        </Link>
        <LangToggle locale={locale} label={copy.langLabel} onSelect={switchLocale} />
      </Stack>

      <Box
        className="policy"
        component="main"
        id="content"
        sx={{
          width: "min(70ch, calc(100% - 2rem))",
          my: "2.5rem",
          mb: "4rem",
          mx: "auto",
          color: "#f4f4f5",
          fontSize: "1.0625rem",
          lineHeight: 1.7,
          fontWeight: 400,
        }}
      >
        <Typography
          component="h1"
          sx={{
            m: "0 0 0.75rem",
            color: "#fff",
            fontFamily: '"DM Sans", sans-serif',
            fontSize: "clamp(2rem, 5vw, 2.75rem)",
            fontWeight: 500,
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
          }}
        >
          {doc.title}
        </Typography>
        <Typography className="updated" sx={{ m: "0 0 1.5rem", color: "#d3d3d7" }}>
          {doc.updated}
        </Typography>
        <Box component="nav" className="toc" aria-label={doc.tocLabel} sx={{ mb: "2rem" }}>
          <Typography className="toc-title" sx={{ m: "0 0 0.5rem", color: "#fff", fontSize: "1rem", fontWeight: 600 }}>
            {doc.tocLabel}
          </Typography>
          <Box component="ul" sx={{ m: 0, p: 0, listStyle: "none" }}>
            {doc.sections.map((section) => (
              <Box component="li" key={section.id} sx={{ my: "0.35rem" }}>
                <Link href={`#${section.id}`} sx={policyLinkSx}>
                  {section.heading}
                </Link>
              </Box>
            ))}
          </Box>
        </Box>
        {doc.sections.map((section) => (
          <Box component="section" key={section.id} id={section.id}>
            <Typography
              component="h2"
              sx={{
                m: "2.25rem 0 0.75rem",
                color: "#fff",
                fontSize: "1.35rem",
                fontWeight: 560,
                letterSpacing: "-0.02em",
                lineHeight: 1.3,
              }}
            >
              {section.heading}
            </Typography>
            {section.blocks.map((block, index) => (
              <LegalBlock key={index} block={block} caption={section.heading} />
            ))}
          </Box>
        ))}
      </Box>

      <Footer
        locale={locale}
        cookieSettings={consentEnabled ? { label: consent.footerLink, onOpen: () => setConsentOpen(true) } : undefined}
      />

      {consentEnabled && <CookieConsent copy={consent} open={consentOpen} onClose={() => setConsentOpen(false)} />}
    </>
  );
}

function LegalBlock({ block, caption }) {
  if (block.kind === "p") {
    return (
      <Typography component="p" sx={{ m: "0 0 1rem" }}>
        <InlineParts parts={block.parts} />
      </Typography>
    );
  }
  if (block.kind === "ul") {
    return (
      <Box component="ul" sx={{ m: "0 0 1rem", pl: "1.25rem" }}>
        {block.items.map((parts, index) => (
          <Box component="li" key={index} sx={{ mb: "1rem" }}>
            <InlineParts parts={parts} />
          </Box>
        ))}
      </Box>
    );
  }
  return (
    <TableContainer tabIndex={0} sx={{ maxWidth: "100%", mb: "1.25rem", overflowX: "auto" }}>
      <Table sx={{ minWidth: "40rem", fontSize: "0.95rem" }}>
        <Box
          component="caption"
          sx={{
            position: "absolute",
            width: 1,
            height: 1,
            p: 0,
            m: -1,
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            border: 0,
          }}
        >
          {caption}
        </Box>
        <TableHead>
          <TableRow>
            {block.headers.map((label) => (
              <TableCell key={label} scope="col" sx={{ color: "#fff", fontWeight: 600, borderColor: "rgba(255,255,255,0.16)", verticalAlign: "top" }}>
                {label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {block.rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((value, cellIndex) => (
                <TableCell key={cellIndex} sx={{ borderColor: "rgba(255,255,255,0.16)", verticalAlign: "top", lineHeight: 1.45 }}>
                  {value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function InlineParts({ parts }) {
  return parts.map((part, index) => {
    if (part.kind === "text") return <Fragment key={index}>{part.text}</Fragment>;
    if (part.external) {
      return (
        <Link key={index} href={part.href} target="_blank" rel="noopener noreferrer" sx={policyLinkSx}>
          {part.text}
        </Link>
      );
    }
    return (
      <Link key={index} href={part.href} sx={policyLinkSx}>
        {part.text}
      </Link>
    );
  });
}
