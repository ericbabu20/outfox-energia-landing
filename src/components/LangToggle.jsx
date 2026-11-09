import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { fluidU, glassSx } from "../theme";

const options = ["es", "en"];

export function LangToggle({ locale, label, onSelect, tone = "legal" }) {
  return (
    <Box
      className="lang pill glass rise"
      role="group"
      aria-label={label}
      sx={{
        ...glassSx,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: `max(48px, calc(63 * ${fluidU}))`,
        p: "2px",
        gap: "2px",
        borderRadius: 999,
        ml: tone === "home" ? "auto" : 0,
        flex: "none",
      }}
    >
      {options.map((option) => {
        const selected = option === locale;
        const selectedBg = tone === "home" ? "#7100f1" : "rgba(255, 255, 255, 0.08)";
        return (
          <Button
            key={option}
            className="lang-btn"
            type="button"
            aria-pressed={selected}
            disableRipple
            onClick={() => {
              if (!selected) onSelect(option);
            }}
            sx={{
              minWidth: 44,
              minHeight: 44,
              height: "100%",
              px: "12px",
              borderRadius: 999,
              color: selected ? "#fff" : "#b9b8bb",
              bgcolor: selected ? selectedBg : "transparent",
              fontSize: `calc(18 * ${fluidU})`,
              fontWeight: 500,
              "&:hover": { bgcolor: selected ? selectedBg : "rgba(255, 255, 255, 0.05)" },
            }}
          >
            {option.toUpperCase()}
          </Button>
        );
      })}
    </Box>
  );
}
