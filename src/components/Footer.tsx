import { Link } from "react-router";
import { messages, type Locale } from "../lib/i18n/messages";
import { cookiesHref, privacyHref } from "../lib/routes";

interface FooterProps {
  locale: Locale;
  cookieSettings?: { label: string; onOpen: () => void };
}

export function Footer({ locale, cookieSettings }: FooterProps) {
  const copy = messages[locale];
  return (
    <footer className="footer">
      <span>{copy.footerRights}</span>
      <Link to={privacyHref(locale)}>{copy.privacy}</Link>
      <Link to={cookiesHref(locale)}>{copy.cookies}</Link>
      {cookieSettings && (
        <a
          href="#cookie-settings"
          onClick={(event) => {
            event.preventDefault();
            cookieSettings.onOpen();
          }}
        >
          {cookieSettings.label}
        </a>
      )}
    </footer>
  );
}
