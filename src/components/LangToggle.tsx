import type { Locale } from "../lib/i18n/messages";

interface LangToggleProps {
  locale: Locale;
  label: string;
  onSelect: (next: Locale) => void;
  className?: string;
}

const options: Locale[] = ["es", "en"];

export function LangToggle({ locale, label, onSelect, className = "lang pill glass" }: LangToggleProps) {
  return (
    <div className={className} role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option}
          className="lang-btn"
          type="button"
          aria-pressed={option === locale}
          onClick={() => {
            if (option !== locale) onSelect(option);
          }}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
