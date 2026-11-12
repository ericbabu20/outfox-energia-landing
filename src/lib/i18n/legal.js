import { legal, legalMarker, legalRegistry, legalText } from "../../config/legal.js";
import { privacyHref } from "../routes.js";

function text(value) {
  return { kind: "text", text: value };
}

function link(label, href, external = false) {
  return { kind: "link", text: label, href, external };
}

function paragraph(...parts) {
  return { kind: "p", parts };
}

function contact(value, locale) {
  const shown = legalText(value, locale);
  if (shown.includes("@") && !shown.startsWith("[")) return link(shown, `mailto:${shown}`);
  return text(shown);
}

function updatedLine(locale, isoDate = legal.lastUpdated) {
  const raw = isoDate.trim();
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

function privacyEs() {
  // TODO: legal review
  const company = legalText(legal.companyName, "es");
  const nif = legalText(legal.nif, "es");
  const address = legalText(legal.address, "es");
  const who = [
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
          paragraph(text("Esta web no tiene formularios, no instala cookies y no guarda nada en tu navegador. Aun así, tratamos algunos datos personales.")),
          paragraph(text("Datos de tu visita. Al entrar en la web, tu navegador envía tu dirección IP y datos técnicos de la conexión a Netlify, la empresa que aloja la web. Se usan solo para que la web funcione y esté protegida. La base legal es nuestro interés legítimo en tener una web segura y disponible (art. 6.1.f del RGPD). Según sus condiciones, Netlify guarda sus registros 90 días y, archivados, hasta un año.")),
          paragraph(text("Correos que nos envías. Si nos escribes, usamos tu nombre, tu email y lo que nos cuentes solo para responderte. La base legal es nuestro interés legítimo en atender tu consulta. Guardamos el correo mientras la atendemos y, después, solo el tiempo que exija la ley.")),
          paragraph(text("Quién recibe tus datos. Nuestros proveedores de alojamiento web y de correo electrónico, que los tratan por cuenta nuestra y siguiendo nuestras instrucciones. No vendemos tus datos ni los cedemos a nadie, salvo obligación legal.")),
          paragraph(text("Transferencias fuera de la Unión Europea. Netlify, Inc. tiene su sede en Estados Unidos. La transferencia se ampara en el Marco de Privacidad de Datos UE-EE. UU., que cuenta con una decisión de adecuación de la Comisión Europea.")),
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
              [text("limitar su tratamiento.")],
            ],
          },
          paragraph(
            text("Para ejercer tus derechos, escríbenos a "),
            contact(legal.privacyEmail, "es"),
            text(". Es gratuito. Te responderemos en el plazo de un mes. Si la petición es compleja, podemos ampliarlo dos meses más y te avisaremos dentro del primer mes. Si es necesario, te pediremos información para confirmar tu identidad."),
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

function privacyEn() {
  // TODO: legal review
  const company = legalText(legal.companyName, "en");
  const nif = legalText(legal.nif, "en");
  const address = legalText(legal.address, "en");
  const who = [
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
          paragraph(text("This website has no forms, sets no cookies and stores nothing in your browser. We still process some personal data.")),
          paragraph(text("Visit data. When you open the website, your browser sends your IP address and technical connection data to Netlify, the company that hosts it. This data is used only to run the website and keep it secure. Our legal basis is our legitimate interest in a secure, available website (GDPR art. 6(1)(f)). Under its terms, Netlify keeps its logs for 90 days, and archived copies for up to one year.")),
          paragraph(text("Emails you send us. If you write to us, we use your name, email address and message only to reply. Our legal basis is our legitimate interest in answering you. We keep the email while we deal with your query, then only as long as the law requires.")),
          paragraph(text("Who receives your data. Our web hosting and email providers, which process it on our behalf and on our instructions. We don't sell your data or share it with anyone else unless the law requires it.")),
          paragraph(text("Transfers outside the European Union. Netlify, Inc. is based in the United States. The transfer relies on the EU-U.S. Data Privacy Framework, which has an adequacy decision from the European Commission.")),
        ],
      },
      {
        id: "rights",
        heading: "3. Your rights",
        blocks: [
          paragraph(text("You can ask us at any time to:")),
          {
            kind: "ul",
            items: [
              [text("access your data;")],
              [text("correct it if it is inaccurate;")],
              [text("delete it;")],
              [text("object to its processing;")],
              [text("restrict its processing.")],
            ],
          },
          paragraph(
            text("To exercise your rights, write to us at "),
            contact(legal.privacyEmail, "en"),
            text(". This is free of charge. We will reply within one month. If your request is complex, we may extend this by two months, and we will tell you within the first month. If we need to, we will ask you for information to confirm your identity."),
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

function noticeFields(locale) {
  return {
    company: legalText(legal.companyName, locale),
    nif: legalText(legal.nif, locale),
    address: legalText(legal.address, locale),
    registry: legalRegistry(locale),
    soleDirector: legalText(legal.soleDirector, locale),
  };
}

function noticeEs() {
  const fields = noticeFields("es");
  return {
    title: "Aviso legal",
    documentTitle: "Aviso legal | Outfox Energía",
    description: "Aviso legal de Outfox Energía.",
    updated: updatedLine("es", legal.noticePublished),
    tocLabel: "En esta página",
    sections: [
      {
        id: "titular",
        heading: "Titular de esta web",
        blocks: [
          paragraph(text(`Esta web pertenece a ${fields.company} ("Outfox Energía").`)),
          paragraph(text(`Domicilio social: ${fields.address}.`)),
          paragraph(text(`NIF: ${fields.nif}.`)),
          paragraph(text(`Inscrita en el Registro Mercantil de ${fields.registry}.`)),
          paragraph(text(`Administrador único: ${fields.soleDirector}.`)),
        ],
      },
      {
        id: "sobre",
        heading: "Sobre esta web",
        blocks: [
          paragraph(text("Esta web informa de nuestro próximo lanzamiento en España. Todavía no ofrecemos ni contratamos suministro de energía.")),
        ],
      },
      {
        id: "privacidad",
        heading: "Privacidad",
        blocks: [
          paragraph(
            text("Cómo tratamos tus datos se explica en la "),
            link("Política de privacidad", privacyHref("es")),
            text(". Esta web no instala cookies."),
          ),
        ],
      },
    ],
  };
}

function noticeEn() {
  const fields = noticeFields("en");
  return {
    title: "Legal notice",
    documentTitle: "Legal notice | Outfox Energía",
    description: "Legal notice for Outfox Energía.",
    updated: updatedLine("en", legal.noticePublished),
    tocLabel: "On this page",
    sections: [
      {
        id: "owner",
        heading: "Who owns this website",
        blocks: [
          paragraph(text(`This website belongs to ${fields.company} ("Outfox Energía").`)),
          paragraph(text(`Registered office: ${fields.address}.`)),
          paragraph(text(`Tax ID (NIF): ${fields.nif}.`)),
          paragraph(text(`Registered in the Mercantile Registry of ${fields.registry}.`)),
          paragraph(text(`Sole director: ${fields.soleDirector}.`)),
        ],
      },
      {
        id: "about",
        heading: "About this website",
        blocks: [
          paragraph(text("This website announces our upcoming launch in Spain. We don't yet supply energy or take sign-ups.")),
        ],
      },
      {
        id: "privacy",
        heading: "Privacy",
        blocks: [
          paragraph(
            text("How we handle your data is explained in our "),
            link("Privacy policy", privacyHref("en")),
            text(". This website does not set cookies."),
          ),
        ],
      },
    ],
  };
}

export function legalDocument(page, locale) {
  if (page === "privacy") return locale === "en" ? privacyEn() : privacyEs();
  return locale === "en" ? noticeEn() : noticeEs();
}

export function consentCopy(locale) {
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
