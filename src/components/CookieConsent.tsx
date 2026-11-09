import { useEffect, useRef, useState } from "react";
import { cookies, type CookieType } from "../config/cookies";
import type { ConsentCopy } from "../lib/i18n/legal";

const CONSENT_KEY = "outfox-cookie-consent";
const CONSENT_MS = 730 * 24 * 60 * 60 * 1000;

interface Choice {
  preferences: boolean;
  analytics: boolean;
  advertising: boolean;
}

interface StoredConsent extends Choice {
  expires: number;
}

export function hasStoredConsent(): boolean {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (!parsed.expires || parsed.expires <= Date.now()) {
      localStorage.removeItem(CONSENT_KEY);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

function writeConsent(choice: Choice) {
  const record: StoredConsent = { ...choice, expires: Date.now() + CONSENT_MS };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
}

const optionalCategories: CookieType[] = [
  ...new Set(cookies.map((item) => item.type).filter((type) => type !== "tecnica")),
];

interface CookieConsentProps {
  copy: ConsentCopy;
  open: boolean;
  onClose: () => void;
}

export function CookieConsent({ copy, open, onClose }: CookieConsentProps) {
  const [configuring, setConfiguring] = useState(false);
  const [toggles, setToggles] = useState<Partial<Record<CookieType, boolean>>>({});
  const acceptRef = useRef<HTMLButtonElement>(null);
  const saveRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      setConfiguring(false);
      acceptRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (configuring) saveRef.current?.focus();
  }, [configuring]);

  const decide = (choice: Choice) => {
    writeConsent(choice);
    onClose();
  };

  const labelFor = (category: CookieType) =>
    category === "preferencias" ? copy.preferences : category === "analitica" ? copy.analytics : copy.advertising;

  return (
    <div className="cookie-banner" role="dialog" aria-label={copy.settingsLabel} hidden={!open}>
      <p>{copy.message}</p>
      <div className="cookie-actions">
        <button ref={acceptRef} type="button" onClick={() => decide({ preferences: true, analytics: true, advertising: true })}>
          {copy.accept}
        </button>
        <button type="button" onClick={() => decide({ preferences: false, analytics: false, advertising: false })}>
          {copy.reject}
        </button>
        <button type="button" onClick={() => setConfiguring(true)}>
          {copy.configure}
        </button>
      </div>
      <form className="cookie-panel" hidden={!configuring} onSubmit={(event) => event.preventDefault()}>
        {cookies.some((item) => item.type === "tecnica") && (
          <label>
            <input type="checkbox" checked disabled /> {copy.technical} ({copy.technicalNote})
          </label>
        )}
        {optionalCategories.map((category) => (
          <label key={category}>
            <input
              type="checkbox"
              checked={toggles[category] ?? false}
              onChange={(event) => setToggles((current) => ({ ...current, [category]: event.target.checked }))}
            />{" "}
            {labelFor(category)}
          </label>
        ))}
        <button
          ref={saveRef}
          type="button"
          onClick={() =>
            decide({
              preferences: toggles.preferencias ?? false,
              analytics: toggles.analitica ?? false,
              advertising: toggles.publicidad ?? false,
            })
          }
        >
          {copy.save}
        </button>
      </form>
    </div>
  );
}
