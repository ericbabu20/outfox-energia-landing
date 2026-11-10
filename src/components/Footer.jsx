import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { Link as RouterLink } from "react-router";
import { messages } from "../lib/i18n/messages";
import { cookiesHref, legalNoticeHref, privacyHref } from "../lib/routes";
import { fluidU } from "../theme";

const footerLinkSx = {
  display: "inline-flex",
  alignItems: "center",
  minHeight: 44,
  px: 1,
  color: "#d3d3d7",
  textDecoration: "underline",
  textUnderlineOffset: "2px",
};

export function Footer({ locale, cookieSettings }) {
  const copy = messages[locale];
  return (
    <Stack
      className="footer"
      component="footer"
      direction="row"
      sx={{
        position: "relative",
        zIndex: 3,
        justifyContent: "center",
        alignItems: "center",
        gap: `calc(8 * ${fluidU})`,
        m: 0,
        width: "100%",
        flex: "none",
        color: "#b9b8bb",
        fontSize: `calc(18 * ${fluidU})`,
        flexWrap: { xs: "wrap", sm: "nowrap" },
        rowGap: "4px",
      }}
    >
      <span>{copy.footerRights}</span>
      <Link component={RouterLink} to={legalNoticeHref(locale)} sx={footerLinkSx}>
        {copy.legalNotice}
      </Link>
      <Link component={RouterLink} to={privacyHref(locale)} sx={footerLinkSx}>
        {copy.privacy}
      </Link>
      <Link component={RouterLink} to={cookiesHref(locale)} sx={footerLinkSx}>
        {copy.cookies}
      </Link>
      {cookieSettings && (
        <Link
          href="#cookie-settings"
          onClick={(event) => {
            event.preventDefault();
            cookieSettings.onOpen();
          }}
          sx={footerLinkSx}
        >
          {cookieSettings.label}
        </Link>
      )}
    </Stack>
  );
}
