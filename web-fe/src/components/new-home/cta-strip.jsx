"use client";
import Link from "next/link";
import { ROUTES, SECTIONS } from "@/data/site";

// ─── MID-PAGE CTA STRIP ──────────────────────────────────────────────────────

export default function CTAStrip({
  title = "Ready to Source Materials for Your Next Project?",
  subtitle = "Get a competitive quote in under 24 hours — no commitment required.",
  primary = { label: "Enquire Now", href: SECTIONS.contact },
  secondary = { label: "Apply for Credit", href: ROUTES.applyForCredit },
}) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #F95001 0%, #d94401 100%)",
        padding: "32px 24px",
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 26,
              fontWeight: 800,
              color: "#091830",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            {title}
          </div>
          <div
            style={{
              color: "rgba(9,24,48,0.7)",
              fontSize: 14,
              marginTop: 4,
            }}
          >
            {subtitle}
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <CTAButton href={primary.href} filled>
            {primary.label}
          </CTAButton>
          <CTAButton href={secondary.href}>{secondary.label}</CTAButton>
        </div>
      </div>
    </div>
  );
}

function CTAButton({ href, children, filled }) {
  const style = filled
    ? {
        background: "#091830",
        color: "#F95001",
        fontWeight: 800,
        padding: "14px 28px",
        border: "2px solid #091830",
      }
    : {
        background: "transparent",
        color: "#091830",
        fontWeight: 700,
        padding: "12px 24px",
        border: "2px solid #091830",
      };

  const shared = {
    fontFamily: "var(--font-display)",
    fontSize: 15,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    borderRadius: 3,
    whiteSpace: "nowrap",
    transition: "all 0.2s",
    display: "inline-block",
  };

  // Section anchors stay as plain <a>; real routes go through next/link.
  if (href.startsWith("#")) {
    return (
      <a href={href} style={{ ...shared, ...style }}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} style={{ ...shared, ...style }}>
      {children}
    </Link>
  );
}
