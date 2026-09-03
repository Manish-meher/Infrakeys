// ─── SHARED: SECTION HEADER ──────────────────────────────────────────────────

export default function SectionHeader({ tag, title, desc, dark = false }) {
  return (
    <div style={{ maxWidth: 680 }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <div style={{ width: 24, height: 2, background: "#F95001" }} />
        <span className="label-tag" style={{ color: "#F95001" }}>
          {tag}
        </span>
      </div>
      <h2
        className="section-heading"
        style={{ fontSize: "clamp(34px, 4.5vw, 54px)", color: dark ? "#fff" : "#0f2444", lineHeight: 1.0, marginBottom: 16 }}
      >
        {title}
      </h2>
      <p style={{ color: dark ? "#94a3b8" : "#64748b", fontSize: 16, lineHeight: 1.7, maxWidth: 560 }}>{desc}</p>
    </div>
  );
}
