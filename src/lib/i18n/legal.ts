import { cookies, nonEssentialCookies, type CookieParty, type CookieType } from "../../config/cookies.js";
import { legal, legalMarker, legalText } from "../../config/legal.js";
import { cookiesHref } from "../routes.js";
import type { Locale } from "./messages.js";

export type Inline =
  | { kind: "text"; text: string }
  | { kind: "link"; text: string; href: string; external?: boolean };

export type Block =
  | { kind: "p"; parts: Inline[] }
  | { kind: "ul"; items: Inline[][] }
  | { kind: "table"; headers: string[]; rows: string[][] };

export interface LegalSection {
  id: string;
  heading: string;
  blocks: Block[];
}

export interface LegalDocument {
  title: string;
  documentTitle: string;
  description: string;
  updated: string;
  tocLabel: string;
  sections: LegalSection[];
}

export interface ConsentCopy {
  message: string;
  accept: string;
  reject: string;
  configure: string;
  save: string;
  settingsLabel: string;
  technical: string;
  technicalNote: string;
  preferences: string;
  analytics: string;
  advertising: string;
  footerLink: string;
}

const typeLabels: Record<Locale, Record<CookieType, string>> = {
  es: { tecnica: "Técnica", preferencias: "Preferencias", analitica: "Analítica", publicidad: "Publicidad" },
  en: { tecnica: "Technical", preferencias: "Preferences", analitica: "Analytics", publicidad: "Advertising" },
};

const partyLabels: Record<Locale, Record<CookieParty, string>> = {
  es: { propia: "Propia", terceros: "De terceros" },
  en: { propia: "First-party", terceros: "Third-party" },
};

function text(value: string): Inline {
  return { kind: "text", text: value };
}

function link(label: string, href: string, external = false): Inline {
  return { kind: "link", text: label, href, external };
}

function paragraph(...parts: Inline[]): Block {
  return { kind: "p", parts };
}

function contact(value: string, locale: Locale): Inline {
  const shown = legalText(value, locale);
  if (shown.includes("@") && !shown.startsWith("[")) return link(shown, `mailto:${shown}`);
  return text(shown);
}

function updatedLine(locale: Locale): string {
  const raw = legal.lastUpdated.trim();
  if (!raw) return locale === "es" ? `Última actualización: ${legalMarker(locale)}` : `Last updated: ${legalMarker(locale)}`;
  const date = new Date(`${raw}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return locale === "es" ? `Última actualización: ${legalMarker(locale)}` : `Last updated: ${legalMarker(locale)}`;
  }
  const formatted = new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
  return locale === "es" ? `Última actualización: ${formatted}` : `Last updated: ${formatted}`;
}

function cookieRows(locale: Locale): string[][] {
  return cookies.map((item) => [
    item.name,
    item.provider,
    locale === "es" ? item.purposeEs : item.purposeEn,
    typeLabels[locale][item.type],
    partyLabels[locale][item.party],
    item.duration,
  ]);
}

function privacyEs(): LegalDocument {
  // TODO: legal review
  const company = legalText(legal.companyName, "es");
  const nif = legalText(legal.nif, "es");
  const address = legalText(legal.address, "es");
  const who: Block[] = [
    paragraph(
      text(`El responsable del tratamiento de tus datos es ${company}, con NIF ${nif} y domicilio en ${address} ("Outfox Energía"). Puedes escribirnos sobre cualquier tema de privacidad a `),
      contact(legal.privacyEmail, "es"),
      text("."),
    ),
  ];
  if (legal.dpoName.trim()) {
    who.push(paragraph(
      text("Hemos nombrado un delegado de protección de datos, al que puedes contactar en "),
      contact(legal.dpoEmail, "es"),
      text("."),
    ));
  }
  return {
    title: "Política de privacidad",
    documentTitle: "Política de privacidad | Outfox Energía",
    description: "Política de privacidad de Outfox Energía.",
    updated: updatedLine("es"),
    tocLabel: "En esta página",
    sections: [
      { id: "responsable", heading: "1. Quién es el responsable del tratamiento", blocks: who },
      {
        id: "datos",
        heading: "2. Qué datos tratamos",
        blocks: [
          paragraph(
            text("Esta web no pide ni guarda datos personales a través de formularios. El uso de cookies se explica en nuestra "),
            link("Política de cookies", cookiesHref("es")),
            text("."),
          ),
        ],
      },
      {
        id: "derechos",
        heading: "3. Tus derechos",
        blocks: [
          paragraph(text("Puedes pedirnos en cualquier momento:")),
          {
            kind: "ul",
            items: [
              [text("acceder a tus datos;")],
              [text("rectificarlos si son inexactos;")],
              [text("suprimirlos;")],
              [text("oponerte a su tratamiento;")],
              [text("limitar su tratamiento;")],
              [text("recibirlos en un formato estructurado (portabilidad);")],
              [text("retirar tu consentimiento.")],
            ],
          },
          paragraph(
            text("Para ejercer tus derechos, escríbenos a "),
            contact(legal.privacyEmail, "es"),
            text(". Es gratuito y te responderemos en un plazo máximo de un mes. Si es necesario, te pediremos información para confirmar tu identidad."),
          ),
          paragraph(
            text("Si crees que no hemos tratado bien tus datos, puedes presentar una reclamación ante la Agencia Española de Protección de Datos ("),
            link("www.aepd.es", "https://www.aepd.es", true),
            text(")."),
          ),
        ],
      },
      {
        id: "seguridad",
        heading: "4. Cómo protegemos tus datos",
        blocks: [
          paragraph(text("Aplicamos medidas técnicas y organizativas adecuadas para proteger tus datos frente a pérdidas, accesos no autorizados o usos indebidos.")),
        ],
      },
      {
        id: "cambios",
        heading: "5. Cambios en esta política",
        blocks: [
          paragraph(text("Si cambiamos esta política, publicaremos la nueva versión en esta página con su fecha de actualización. Si el cambio es importante, te lo comunicaremos.")),
        ],
      },
    ],
  };
}

function privacyEn(): LegalDocument {
  // TODO: legal review
  const company = legalText(legal.companyName, "en");
  const nif = legalText(legal.nif, "en");
  const address = legalText(legal.address, "en");
  const who: Block[] = [
    paragraph(
      text(`The controller of your personal data is ${company}, with tax identification number ${nif} and its registered office at ${address} ("Outfox Energía"). You can write to us about any privacy matter at `),
      contact(legal.privacyEmail, "en"),
      text("."),
    ),
  ];
  if (legal.dpoName.trim()) {
    who.push(paragraph(
      text("We have appointed a data protection officer, whom you can contact at "),
      contact(legal.dpoEmail, "en"),
      text("."),
    ));
  }
  return {
    title: "Privacy policy",
    documentTitle: "Privacy policy | Outfox Energía",
    description: "Privacy policy for Outfox Energía.",
    updated: updatedLine("en"),
    tocLabel: "On this page",
    sections: [
      { id: "controller", heading: "1. Who is the controller", blocks: who },
      {
        id: "data",
        heading: "2. What data we process",
        blocks: [
          paragraph(
            text("This website does not ask for or store personal data through forms. Cookie use is explained in our "),
            link("Cookie policy", cookiesHref("en")),
            text("."),
          ),
        ],
      },
      {
        id: "rights",
        heading: "3. Your rights",
        blocks: [
          paragraph(text("You can ask us at any time:")),
          {
            kind: "ul",
            items: [
              [text("to access your data;")],
              [text("to correct it if it is inaccurate;")],
              [text("to delete it;")],
              [text("to object to its processing;")],
              [text("to restrict its processing;")],
              [text("to receive it in a structured format (portability);")],
              [text("to withdraw your consent.")],
            ],
          },
          paragraph(
            text("To exercise your rights, write to us at "),
            contact(legal.privacyEmail, "en"),
            text(". This is free of charge and we will reply within one month at most. If we need to, we will ask you for information to confirm your identity."),
          ),
          paragraph(
            text("If you believe we have not handled your data properly, you can lodge a complaint with the Spanish Data Protection Agency ("),
            link("www.aepd.es", "https://www.aepd.es", true),
            text(")."),
          ),
        ],
      },
      {
        id: "security",
        heading: "4. How we protect your data",
        blocks: [
          paragraph(text("We apply appropriate technical and organisational measures to protect your data against loss, unauthorised access or misuse.")),
        ],
      },
      {
        id: "changes",
        heading: "5. Changes to this policy",
        blocks: [
          paragraph(text("If we change this policy, we will publish the new version on this page with its update date. If the change is important, we will tell you.")),
        ],
      },
    ],
  };
}

function cookiesEs(): LegalDocument {
  // TODO: legal review
  const company = legalText(legal.companyName, "es");
  const rows = cookieRows("es");
  const which: Block[] = rows.length > 0
    ? [{ kind: "table", headers: ["Nombre", "Proveedor", "Finalidad", "Tipo", "Propia o de terceros", "Duración"], rows }]
    : [paragraph(text("En este momento esta web no instala cookies ni guarda datos en el almacenamiento local o de sesión del navegador."))];
  const manage: Block[] = [];
  if (nonEssentialCookies().length > 0) {
    manage.push(paragraph(
      text("Puedes aceptar, rechazar o configurar las cookies en cualquier momento desde "),
      link("Configurar cookies", "#cookie-settings"),
      text("."),
    ));
  }
  manage.push(paragraph(text("También puedes bloquear o borrar las cookies desde la configuración de tu navegador. Si bloqueas las cookies técnicas, es posible que algunas partes de la web no funcionen bien.")));
  return {
    title: "Política de cookies",
    documentTitle: "Política de cookies | Outfox Energía",
    description: "Política de cookies de Outfox Energía.",
    updated: updatedLine("es"),
    tocLabel: "En esta página",
    sections: [
      {
        id: "que-son",
        heading: "1. Qué son las cookies",
        blocks: [paragraph(text("Las cookies son pequeños archivos que una web guarda en tu navegador cuando la visitas. Sirven, por ejemplo, para que la web funcione o para recordar tus preferencias. Esta política también cubre tecnologías parecidas, como el almacenamiento local del navegador."))],
      },
      {
        id: "quien",
        heading: "2. Quién las utiliza",
        blocks: [paragraph(text(`Las cookies de esta web las gestiona ${company} ("Outfox Energía"). Si en el futuro usamos cookies de otras empresas, lo indicaremos en la tabla de abajo.`))],
      },
      { id: "cuales", heading: "3. Qué cookies usamos", blocks: which },
      {
        id: "consentimiento",
        heading: "4. Cuándo necesitamos tu consentimiento",
        blocks: [paragraph(text("Las cookies técnicas, necesarias para que la web funcione o para darte un servicio que has pedido, no necesitan tu consentimiento (artículo 22.2 de la LSSI-CE). Cualquier otra cookie, como las de análisis o publicidad, solo se instalará si la aceptas."))],
      },
      { id: "gestionar", heading: "5. Cómo gestionar las cookies", blocks: manage },
      {
        id: "cambios",
        heading: "6. Cambios en esta política",
        blocks: [paragraph(text("Si cambiamos las cookies que usamos, actualizaremos esta página y su fecha de actualización."))],
      },
    ],
  };
}

function cookiesEn(): LegalDocument {
  // TODO: legal review
  const company = legalText(legal.companyName, "en");
  const rows = cookieRows("en");
  const which: Block[] = rows.length > 0
    ? [{ kind: "table", headers: ["Name", "Provider", "Purpose", "Type", "First or third party", "Duration"], rows }]
    : [paragraph(text("This site does not currently set cookies or store data in the browser's local or session storage."))];
  const manage: Block[] = [];
  if (nonEssentialCookies().length > 0) {
    manage.push(paragraph(
      text("You can accept, reject or set cookies at any time from "),
      link("Cookie settings", "#cookie-settings"),
      text("."),
    ));
  }
  manage.push(paragraph(text("You can also block or delete cookies in your browser settings. If you block technical cookies, some parts of the site may not work properly.")));
  return {
    title: "Cookie policy",
    documentTitle: "Cookie policy | Outfox Energía",
    description: "Outfox Energía cookie policy.",
    updated: updatedLine("en"),
    tocLabel: "On this page",
    sections: [
      {
        id: "what",
        heading: "1. What cookies are",
        blocks: [paragraph(text("Cookies are small files that a website stores on your browser when you visit it. They are used, for example, to make the site work or to remember your preferences. This policy also covers similar technologies, such as the browser's local storage."))],
      },
      {
        id: "who",
        heading: "2. Who uses them",
        blocks: [paragraph(text(`Cookies on this site are managed by ${company} ("Outfox Energía"). If we use cookies from other companies in the future, we will say so in the table below.`))],
      },
      { id: "which", heading: "3. Which cookies we use", blocks: which },
      {
        id: "consent",
        heading: "4. When we need your consent",
        blocks: [paragraph(text("Technical cookies, which are needed for the site to work or to provide a service you have asked for, do not need your consent (Article 22(2) of the Spanish Information Society Services Law, LSSI-CE). Any other cookie, such as analytics or advertising cookies, will be set only if you accept it."))],
      },
      { id: "manage", heading: "5. How to manage cookies", blocks: manage },
      {
        id: "changes",
        heading: "6. Changes to this policy",
        blocks: [paragraph(text("If we change the cookies we use, we will update this page and its update date."))],
      },
    ],
  };
}

export function legalDocument(page: "privacy" | "cookies", locale: Locale): LegalDocument {
  if (page === "privacy") return locale === "en" ? privacyEn() : privacyEs();
  return locale === "en" ? cookiesEn() : cookiesEs();
}

export function consentCopy(locale: Locale): ConsentCopy {
  // TODO: legal review
  if (locale === "en") {
    return {
      message: "We use technical cookies that the site needs in order to work. Any others are set only if you accept them.",
      accept: "Accept",
      reject: "Reject",
      configure: "Settings",
      save: "Save",
      settingsLabel: "Cookie settings",
      technical: "Technical",
      technicalNote: "Always on",
      preferences: "Preferences",
      analytics: "Analytics",
      advertising: "Advertising",
      footerLink: "Cookie settings",
    };
  }
  return {
    message: "Usamos cookies técnicas necesarias para que la web funcione. Las demás solo se instalan si las aceptas.",
    accept: "Aceptar",
    reject: "Rechazar",
    configure: "Configurar",
    save: "Guardar",
    settingsLabel: "Configurar cookies",
    technical: "Técnicas",
    technicalNote: "Siempre activas",
    preferences: "Preferencias",
    analytics: "Analítica",
    advertising: "Publicidad",
    footerLink: "Configurar cookies",
  };
}
