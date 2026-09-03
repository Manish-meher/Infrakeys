"use client";
import { useState } from "react";
import Link from "next/link";
import SectionHeader from "./section-header";
import {
  IconTrain,
  IconPlane,
  IconShip,
  IconWarehouse,
  IconConstruction,
} from "./icons";
import { ROUTES } from "@/data/site";

// Each sector points to a real product detail route (/products/[slug]) and
// also exposes the broader category that contains related products.
// Keep these slugs in one place so they can be replaced with a more specific
// SKU later without changing the component UI.
const INDUSTRIES = [
  {
    Icon: IconTrain,
    name: "Railway",
    desc: "Structural steel for bridges, stations, rail infrastructure and fabrication.",
    productSlug: "shs-100x100x4",
    productLabel: "Structural SHS",
    categoryHref: "/category/steel",
    categoryLabel: "Steel",
  },
  {
    Icon: IconPlane,
    name: "Airports",
    desc: "Structural sections for terminals, hangars, canopies and ground-support facilities.",
    productSlug: "rhs-80x40x5",
    productLabel: "Structural RHS",
    categoryHref: "/category/steel",
    categoryLabel: "Steel",
  },
  {
    Icon: IconShip,
    name: "Ports & Logistics",
    desc: "Heavy structural sections for warehouses, handling facilities and logistics infrastructure.",
    productSlug: "rhs-80x40x5",
    productLabel: "Structural RHS",
    categoryHref: "/category/steel",
    categoryLabel: "Steel",
  },
  {
    Icon: IconWarehouse,
    name: "Warehousing",
    desc: "Steel sections and building components for industrial sheds and logistics parks.",
    productSlug: "shs-60x60x4",
    productLabel: "Structural SHS",
    categoryHref: "/category/steel",
    categoryLabel: "Steel",
  },
  {
    Icon: IconConstruction,
    name: "Commercial & Real Estate",
    desc: "Structural steel for commercial complexes, mixed-use developments and fabrication.",
    productSlug: "shs-100x100x4",
    productLabel: "Structural SHS",
    categoryHref: "/category/steel",
    categoryLabel: "Steel",
  },
];

export default function Industries() {
  return (
    <section id="industries" style={{ padding: "96px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <SectionHeader
          tag="Sectors"
          title="Industries We Serve"
          desc="Our materials and structures power projects across India's most strategic infrastructure sectors."
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 20,
            marginTop: 56,
          }}
          className="industry-grid"
        >
          {INDUSTRIES.map((industry) => (
            <IndustryTile key={industry.name} {...industry} />
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 1000px) {
          .industry-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .industry-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}

function IndustryTile({
  Icon,
  name,
  desc,
  productSlug,
  productLabel,
  categoryHref,
  categoryLabel,
}) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "32px 20px 24px",
        textAlign: "center",
        borderRadius: 4,
        background: hov ? "#0f2444" : "#f8fafc",
        border: `1.5px solid ${hov ? "#F95001" : "#e2e8f0"}`,
        transition: "all 0.25s",
        transform: hov ? "translateY(-4px)" : "none",
        boxShadow: hov ? "0 12px 32px rgba(15,36,68,0.2)" : "none",
      }}
    >
      <div
        style={{
          color: hov ? "#F95001" : "#0f2444",
          marginBottom: 16,
          display: "flex",
          justifyContent: "center",
          transition: "color 0.25s",
        }}
      >
        <Icon />
      </div>

      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 17,
          fontWeight: 700,
          color: hov ? "#fff" : "#0f2444",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          marginBottom: 8,
          transition: "color 0.25s",
        }}
      >
        {name}
      </div>

      <div
        style={{
          color: hov ? "#94a3b8" : "#64748b",
          fontSize: 12.5,
          lineHeight: 1.6,
          transition: "color 0.25s",
          minHeight: 60,
        }}
      >
        {desc}
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 8,
          marginTop: 18,
        }}
      >
        <Link
          href={ROUTES.product(productSlug)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "8px 11px",
            borderRadius: 3,
            background: hov ? "#F95001" : "#0f2444",
            color: "#fff",
            fontSize: 10.5,
            fontWeight: 700,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          {productLabel}
        </Link>
        <Link
          href={categoryHref}
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "8px 11px",
            borderRadius: 3,
            border: `1px solid ${hov ? "rgba(255,255,255,0.35)" : "#cbd5e1"}`,
            color: hov ? "#fff" : "#475569",
            fontSize: 10.5,
            fontWeight: 700,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          {categoryLabel} Category
        </Link>
      </div>
    </div>
  );
}
