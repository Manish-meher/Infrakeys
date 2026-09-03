"use client";
import { IconPhone } from "./icons";
import { CONTACT } from "@/data/site";

// ─── FLOATING BUTTONS ────────────────────────────────────────────────────────

export default function FloatingButtons() {
  return (
    <div style={{ position: "fixed", bottom: 28, right: 24, zIndex: 200, display: "flex", flexDirection: "column", gap: 12 }}>
      <a
        href={CONTACT.phoneHref}
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: "#0f2444",
          border: "2px solid #F95001",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#F95001",
          textDecoration: "none",
          boxShadow: "0 4px 16px rgba(15,36,68,0.4)",
          transition: "all 0.2s",
        }}
        title="Call Us"
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#F95001";
          e.currentTarget.style.color = "#091830";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#0f2444";
          e.currentTarget.style.color = "#F95001";
        }}
      >
        <IconPhone />
      </a>

    </div>
  );
}
