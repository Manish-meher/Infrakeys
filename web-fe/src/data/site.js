/**
 * Single source of truth for contact details and the routes that already exist
 * in this project. Sections on the home page link through these constants so a
 * change here updates every CTA at once.
 */

export const CONTACT = {
  phone: "+91 8130376622",
  phoneHref: "tel:+918130376622",
  email: "info@infrakeys.com",
  emailHref: "mailto:info@infrakeys.com",
  address:
    "519-521, 5th Floor, The Business Hub, Sector-81, Greater Faridabad, 121007, Haryana",
  hours: "Mon–Sat: 9:00 AM – 7:00 PM IST",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_ENQ_NUMBER || "918130376622",
};

export const whatsappHref = (
  text = "Hi Infrakeys, I would like to enquire about your products.",
) =>
  `https://api.whatsapp.com/send/?phone=${CONTACT.whatsappNumber}&text=${encodeURIComponent(text)}`;

/** Routes that exist under src/app — used by the home page CTAs. */
export const ROUTES = {
  home: "/",
  about: "/about",
  products: "/products",
  product: (slug) => `/products/${slug}`,
  pricing: "/pricing",
  blogs: "/blogs",
  news: "/news",
  clientele: "/clientele",
  partners: "/our-partners",
  contact: "/contact",
  applyForCredit: "/apply-for-credit",
  cart: "/cart",
  login: "/auth/login",
  category: (slug) => `/category/${slug}`,
};

/** In-page anchors for the home page sections. */
export const SECTIONS = {
  about: "#about",
  products: "#products",
  howWeWork: "#how-we-work",
  projects: "#projects",
  industries: "#industries",
  whyUs: "#why-us",
  contact: "#contact",
};

/** Nav shown on the home page — mixes section anchors with real routes. */
export const HOME_SECTION_LINKS = [
  { label: "About", href: SECTIONS.about },
  { label: "Products", href: SECTIONS.products },
  { label: "How We Work", href: SECTIONS.howWeWork },
  { label: "Projects", href: SECTIONS.projects },
  { label: "Industries", href: SECTIONS.industries },
  { label: "Why Us", href: SECTIONS.whyUs },
  { label: "Contact", href: SECTIONS.contact },
];

export const SOCIALS = {
  facebook: "https://www.facebook.com/profile.php?id=61555145229580",
  instagram: "https://www.instagram.com/infrakeys_technologies/",
  linkedin: "https://www.linkedin.com/company/infrakeys-technologies/",
  youtube: "https://www.youtube.com/@infrakeystechnologies",
};

/**
 * Fallback product categories, used when the categories API is unreachable.
 * `match` is compared against the category names coming back from the API so a
 * real `/category/<slug>` link can be used whenever one exists.
 */
export const PRODUCT_FALLBACKS = [
  { name: "Steel Raw Materials", match: ["steel", "coil", "sheet", "plate"] },
  { name: "PEB Structures", match: ["peb", "pre-engineered", "structure"] },
  { name: "Scaffolding Systems", match: ["scaffold"] },
  { name: "Crash Barriers", match: ["crash", "barrier"] },
  { name: "TMT Bars", match: ["tmt", "rebar", "bar"] },
  { name: "Paints & Coatings", match: ["paint", "coating"] },
  { name: "Building Materials", match: ["cement", "building", "aggregate"] },
];
