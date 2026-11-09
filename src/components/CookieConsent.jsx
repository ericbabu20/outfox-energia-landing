import { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { cookies } from "../config/cookies";

const CONSENT_KEY = "outfox-cookie-consent";
const CONSENT_MS = 730 * 24 * 60 * 60 * 1000;

export function hasStoredConsent() {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    if (!parsed.expires || parsed.expires <= Date.now()) {
      localStorage.removeItem(CONSENT_KEY);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

function writeConsent(choice) {
  localStorage.setItem(CONSENT_KEY, JSON.stringify({ ...choice, expires: Date.now() + CONSENT_MS }));
}

const optionalCategories = [...new Set(cookies.map((item) => item.type).filter((type) => type !== "tecnica"))];

const actionSx = {
  minHeight: 44,
  px: 2,
  color: "#fff",
  borderColor: "rgba(255, 255, 255, 0.4)",
  borderRadius: 999,
};

export function CookieConsent({ copy, open, onClose }) {
  const [configuring, setConfiguring] = useState(false);
  const [toggles, setToggles] = useState({});
  const acceptRef = useRef(null);
  const saveRef = useRef(null);

  useEffect(() => {
    if (open) {
      setConfiguring(false);
      acceptRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (configuring) saveRef.current?.focus();
  }, [configuring]);

  if (!open) return null;

  const decide = (choice) => {
    writeConsent(choice);
    onClose();
  };

  const labelFor = (category) =>
    category === "preferencias" ? copy.preferences : category === "analitica" ? copy.analytics : copy.advertising;

  return (
    <Paper
      className="cookie-banner"
      role="dialog"
      aria-label={copy.settingsLabel}
      elevation={8}
      sx={{
        position: "fixed",
        zIndex: 20,
        right: "1rem",
        bottom: "1rem",
        left: "1rem",
        display: "grid",
        gap: 1.5,
        maxWidth: "70ch",
        mx: "auto",
        p: 2,
        color: "#f4f4f5",
        bgcolor: "#17161c",
        border: "1px solid rgba(255, 255, 255, 0.16)",
        borderRadius: "16px",
      }}
    >
      <Typography sx={{ m: 0 }}>{copy.message}</Typography>
      <Stack direction="row" useFlexGap sx={{ flexWrap: "wrap", gap: 1 }}>
        <Button ref={acceptRef} variant="outlined" sx={actionSx} onClick={() => decide({ preferences: true, analytics: true, advertising: true })}>
          {copy.accept}
        </Button>
        <Button variant="outlined" sx={actionSx} onClick={() => decide({ preferences: false, analytics: false, advertising: false })}>
          {copy.reject}
        </Button>
        <Button variant="outlined" sx={actionSx} onClick={() => setConfiguring(true)}>
          {copy.configure}
        </Button>
      </Stack>
      {configuring && (
        <Stack component="form" onSubmit={(event) => event.preventDefault()} sx={{ alignItems: "flex-start", gap: 1 }}>
          {cookies.some((item) => item.type === "tecnica") && (
            <FormControlLabel
              control={<Checkbox checked disabled />}
              label={`${copy.technical} (${copy.technicalNote})`}
            />
          )}
          {optionalCategories.map((category) => (
            <FormControlLabel
              key={category}
              control={
                <Checkbox
                  checked={toggles[category] ?? false}
                  onChange={(event) => setToggles((current) => ({ ...current, [category]: event.target.checked }))}
                />
              }
              label={labelFor(category)}
            />
          ))}
          <Button
            ref={saveRef}
            variant="outlined"
            sx={actionSx}
            onClick={() =>
              decide({
                preferences: toggles.preferencias ?? false,
                analytics: toggles.analitica ?? false,
                advertising: toggles.publicidad ?? false,
              })
            }
          >
            {copy.save}
          </Button>
        </Stack>
      )}
    </Paper>
  );
}
