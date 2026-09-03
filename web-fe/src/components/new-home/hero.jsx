"use client";
import { IconArrowRight, IconPhone } from "./icons";
import { CONTACT, SECTIONS } from "@/data/site";

// ─── HERO ────────────────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section
      id="about"
      style={{
        position: "relative",
        minHeight: "calc(100vh - 76px)",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "#091830",
      }}
    >
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src="/new-home/infrakeys-hero-video.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay for text visibility */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(9,24,48,0.88) 0%, rgba(15,36,68,0.72) 55%, rgba(9,24,48,0.80) 100%)",
        }}
      />
      {/* Amber accent bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 5,
          background: "linear-gradient(to bottom, #F95001, #d94401)",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: 1320,
          margin: "0 auto",
          padding: "40px 24px 40px",
          width: "100%",
        }}
      >
        <div style={{ maxWidth: 760 }}>
          {/* Label */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 24,
            }}
          >
            <div style={{ width: 32, height: 2, background: "#F95001" }} />
            <span className="label-tag" style={{ color: "#F95001" }}>
              Steel · PEB · Scaffolding · Infrastructure
            </span>
          </div>

          {/* H1 */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(48px, 7vw, 70px)",
              fontWeight: 800,
              lineHeight: 1.0,
              color: "#fff",
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              marginBottom: 24,
            }}
          >
            Powering
            <br />
            <span style={{ color: "#F95001" }}>Infrastructure</span>
            <br />
            With Smart Solutions
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: 18,
              lineHeight: 1.7,
              maxWidth: 560,
              marginBottom: 40,
              fontWeight: 400,
            }}
          >
            End-to-end material supply, precision manufacturing, and structured
            financing for India&apos;s most ambitious infrastructure projects.
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a
              href={SECTIONS.contact}
              style={{
                background: "#F95001",
                color: "#091830",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 16,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "16px 36px",
                borderRadius: 3,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#d94401";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#F95001";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Request a Quote <IconArrowRight />
            </a>
            <a
              href={CONTACT.phoneHref}
              style={{
                border: "2px solid rgba(255,255,255,0.3)",
                color: "#fff",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 16,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "14px 32px",
                borderRadius: 3,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#F95001";
                e.currentTarget.style.color = "#F95001";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                e.currentTarget.style.color = "#fff";
              }}
            >
              <IconPhone /> Talk to Our Expert
            </a>
          </div>

          {/* Quick stats */}
          <div
            style={{
              display: "flex",
              gap: 40,
              marginTop: 64,
              flexWrap: "wrap",
            }}
          >
            {[
              ["15+", "Years Experience"],
              ["500+", "Projects Delivered"],
              ["20+", "States Served"],
              ["1M+ MT", "Steel Supplied"],
            ].map(([num, label]) => (
              <div key={label}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 34,
                    fontWeight: 800,
                    color: "#F95001",
                    lineHeight: 1,
                  }}
                >
                  {num}
                </div>
                <div
                  style={{
                    color: "#94a3b8",
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginTop: 4,
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      {/* <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            color: "#64748b",
            fontSize: 10,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 40,
            background: "linear-gradient(to bottom, #F95001, transparent)",
          }}
        />
      </div> */}
    </section>
  );
}
