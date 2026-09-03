"use client";
import { useState } from "react";
import Link from "next/link";
import BusinessWheel, { BIZ_SEGMENTS } from "./business-wheel";
import { ROUTES } from "@/data/site";

// ─── HOW WE WORK ─────────────────────────────────────────────────────────────

export default function HowWeWork() {
  const [activeId, setActiveId] = useState(null);

  return (
    <section id="how-we-work" style={{ padding: "96px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <div style={{ width: 24, height: 2, background: "#F95001" }} />
            <span className="label-tag" style={{ color: "#F95001" }}>
              Business Model
            </span>
            <div style={{ width: 24, height: 2, background: "#F95001" }} />
          </div>
          <h2 className="section-heading" style={{ fontSize: "clamp(34px, 4.5vw, 52px)", color: "#0f2444", lineHeight: 1.0, marginBottom: 16 }}>
            Our Business Model
          </h2>
          <p style={{ color: "#64748b", fontSize: 16, lineHeight: 1.7, maxWidth: 620, margin: "0 auto" }}>
            A diversified infrastructure supply portfolio spanning four core product categories — supporting every stage of a project lifecycle.
          </p>
        </div>

        {/* Wheel + legend */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", marginBottom: 72 }} className="biz-model-grid">
          <BusinessWheel activeId={activeId} onHover={setActiveId} />

          {/* Right: segment legend */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {BIZ_SEGMENTS.map((seg) => (
              <div
                key={seg.id}
                onMouseEnter={() => setActiveId(seg.id)}
                onMouseLeave={() => setActiveId(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "16px 20px",
                  borderRadius: 6,
                  border: `1.5px solid ${activeId === seg.id ? seg.color : "#e2e8f0"}`,
                  background: activeId === seg.id ? seg.bg : "#fafafa",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  transform: activeId === seg.id ? "translateX(4px)" : "none",
                }}
              >
                <div style={{ width: 12, height: 44, borderRadius: 6, background: seg.color, flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700, color: "#0f2444", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    {seg.label.replace("\n", " ")}
                  </div>
                  <div style={{ color: "#64748b", fontSize: 13, marginTop: 2 }}>{seg.products.map((p) => p.name).join(" · ")}</div>
                </div>
                <div style={{ marginLeft: "auto", color: seg.color, fontWeight: 700, fontSize: 18 }}>›</div>
              </div>
            ))}
          </div>
        </div>

        {/* Product grid rows — one row per segment */}
        <div style={{ borderTop: "1.5px solid #e2e8f0", paddingTop: 56 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800, color: "#0f2444", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 36, textAlign: "center" }}>
            Products by Category
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {BIZ_SEGMENTS.map((seg) => (
              <div key={seg.id} style={{ display: "flex", alignItems: "stretch", borderBottom: "1px solid #f1f5f9", padding: "28px 0", gap: 32 }} className="product-row">
                {/* Category label */}
                <div style={{ width: 140, flexShrink: 0, display: "flex", alignItems: "center" }}>
                  <div>
                    <div style={{ width: 4, height: 32, background: seg.color, borderRadius: 2, marginBottom: 8 }} />
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 800, color: seg.color, textTransform: "uppercase", letterSpacing: "0.08em", lineHeight: 1.3 }}>
                      {seg.label.replace("\n", "\n")}
                    </span>
                  </div>
                </div>
                {/* Product tiles */}
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap", flex: 1 }}>
                  {seg.products.map((prod) => (
                    <Link
                      href={ROUTES.products}
                      key={prod.name}
                      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer", textDecoration: "none" }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
                    >
                      {/* Hexagon clip */}
                      <div
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: "50%",
                          overflow: "hidden",
                          border: `2.5px solid ${seg.color}`,
                          background: seg.bg,
                          flexShrink: 0,
                          transition: "transform 0.2s",
                        }}
                      >
                        <img src={prod.img} alt={prod.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: "#475569", textAlign: "center", maxWidth: 80, lineHeight: 1.4 }}>{prod.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .biz-model-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 600px) {
          .product-row { flex-direction: column !important; }
        }
      `}</style>
    </section>
  );
}
