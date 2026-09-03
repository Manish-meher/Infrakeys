"use client";
import { useState } from "react";
import Link from "next/link";
import SectionHeader from "./section-header";
import {
  IconSteel,
  IconBuilding,
  IconScaffold,
  IconBarrier,
  IconRebar,
  IconPaint,
  IconCement,
  IconChevronRight,
} from "./icons";
import { useFetchCategories } from "@/hooks/useFetchCategories";
import { PRODUCT_FALLBACKS, ROUTES } from "@/data/site";

// ─── PRODUCTS ────────────────────────────────────────────────────────────────

const ICONS = [
  IconSteel,
  IconBuilding,
  IconScaffold,
  IconBarrier,
  IconRebar,
  IconPaint,
  IconCement,
];

const PRODUCTS = [
  {
    Link: "steel",
    name: "Steel Raw Materials",
    desc: "HR coils, sheets, plates, and structural sections for all construction grades.",
  },
  {
    Link: "steel",
    name: "PEB Structures",
    desc: "Pre-engineered buildings for industrial, commercial, and warehouse applications.",
  },
  {
    Link: "steel",
    name: "Scaffolding Systems",
    desc: "Certified modular and frame scaffolding for safe elevated construction work.",
  },
  {
    Link: "steel",
    name: "Crash Barriers",
    desc: "W-beam and thrie-beam road safety barriers meeting IRC standards.",
  },
  {
    Link: "steel",
    name: "TMT Bars",
    desc: "Fe-500 and Fe-550 grade thermomechanically treated rebars for structural use.",
  },
  {
    Link: "steel",
    name: "Paints & Coatings",
    desc: "Epoxy, PU, and protective coatings for structural steel corrosion protection.",
  },
  {
    Link: "steel",
    name: "Building Materials",
    desc: "Cement, aggregates, and allied construction materials from leading brands.",
  },
];

/**
 * Resolve each showcase card to a real /category/<slug> route when the
 * categories API returns a matching category; otherwise fall back to /products.
 */
function resolveHref(name, categories) {
  if (!categories?.length) return ROUTES.products;

  const keywords =
    PRODUCT_FALLBACKS.find((p) => p.name === name)?.match ??
    name.toLowerCase().split(/\s+/);

  const match = categories.find((cat) => {
    const catName = String(cat?.name ?? "").toLowerCase();
    return keywords.some((k) => catName.includes(k));
  });

  return match?.slug ? ROUTES.category(match.slug) : ROUTES.products;
}

export default function Products() {
  const { data: categories } = useFetchCategories();

  return (
    <section id="products" style={{ padding: "96px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <SectionHeader
          tag="Our Portfolio"
          title="What We Offer"
          desc="Comprehensive infrastructure supply spanning seven core product categories — from raw steel to finished structures."
        />

        <div 
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 24,
            marginTop: 56,
          }}
        >
          {PRODUCTS.map(({ name, desc }, i) => (
            <ProductCard
              key={name}
              Icon={ICONS[i % ICONS.length]}
              name={name}
              desc={desc}
              href={resolveHref(name, categories)}
            />
          ))}
        </div>

        <div style={{ marginTop: 48, textAlign: "center" }}>
          <Link
            href={ROUTES.products}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              border: "2px solid #0f2444",
              color: "#0f2444",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 15,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "13px 32px",
              borderRadius: 3,
            }}
          >
            Browse All Categories <IconChevronRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ Icon, name, desc, href }) {
  const [hov, setHov] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "block",
        border: `1.5px solid ${hov ? "#F95001" : "#e2e8f0"}`,
        borderRadius: 4,
        padding: "32px 28px",
        background: hov ? "#fffbf0" : "#fff",
        transition: "all 0.25s ease",
        transform: hov ? "translateY(-4px)" : "none",
        boxShadow: hov
          ? "0 12px 40px rgba(249,80,1,0.12)"
          : "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <div
        style={{
          color: hov ? "#d94401" : "#0f2444",
          marginBottom: 16,
          transition: "color 0.25s",
        }}
      >
        <Icon />
      </div>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 20,
          fontWeight: 700,
          color: "#0f2444",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          marginBottom: 10,
        }}
      >
        {name}
      </h3>
      <p
        style={{
          color: "#64748b",
          fontSize: 14,
          lineHeight: 1.65,
          marginBottom: 20,
        }}
      >
        {desc}
      </p>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          color: "#F95001",
          fontWeight: 600,
          fontSize: 13,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        View Products <IconChevronRight />
      </span>
    </Link>
  );
}
