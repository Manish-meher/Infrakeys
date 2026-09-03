"use client";
import { useState } from "react";
import SectionHeader from "./section-header";
import Link from "next/link";
import { IconChevronRight } from "./icons";
import { ROUTES } from "@/data/site";

// ─── PROJECTS ────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    img: "/new-home/NHAI.avif",
    name: "NHAI Expressway Barrier Supply",
    location: "Rajasthan · Road Infrastructure",
    desc: "Supplied 4,200 MT of W-beam crash barriers for a 340 km greenfield expressway corridor.",
    status: "Completed",
  },
  {
    img: "/new-home/RAILWAY.avif",
    name: "Railway Bridge Steel Fabrication",
    location: "Uttar Pradesh · Railway",
    desc: "Designed and fabricated 820 MT of structural steel girder assemblies for rail bridge crossings.",
    status: "Completed",
  },
  {
    img: "/new-home/PORT.avif",
    name: "Port Logistics Warehouse PEB",
    location: "Gujarat · Ports & Logistics",
    desc: "Erected a 12,000 sqm PEB warehouse complex at a major Gujarat port for cargo storage.",
    status: "Ongoing",
  },
  {
    img: "/new-home/ship.avif",
    name: "Shipyard Ground Infrastructure",
    location: "Maharashtra · Port",
    desc: "Structural steel and scaffolding supply for terminal expansion at a regional Shipyard.",
    status: "Ongoing",
  },
];

export default function Projects() {
  const [active, setActive] = useState(0);
  return (
    <section
      id="projects"
      style={{ padding: "96px 24px", background: "#0f2444" }}
    >
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <SectionHeader
          tag="Portfolio"
          title="Our Projects"
          desc="Infrastructure projects delivered across highways, railways, airports, ports, and warehouses — nationwide."
          dark
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 24,
            marginTop: 56,
          }}
          className="projects-grid"
        >
          {PROJECTS.map((p, i) => (
            <ProjectCard
              key={p.name}
              {...p}
              featured={i === active}
              onClick={() => setActive(i)}
            />
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            marginTop: 40,
          }}
        >
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: i === active ? 28 : 8,
                height: 8,
                borderRadius: 4,
                background: i === active ? "#F95001" : "rgba(255,255,255,0.2)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function ProjectCard({ img, name, location, desc, status, featured, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 4,
        overflow: "hidden",
        cursor: "pointer",
        border: `2px solid ${featured || hov ? "#F95001" : "transparent"}`,
        transition: "all 0.3s",
        transform: hov ? "translateY(-3px)" : "none",
        boxShadow: hov
          ? "0 16px 48px rgba(0,0,0,0.4)"
          : "0 4px 12px rgba(0,0,0,0.2)",
      }}
    >
      <div
        style={{
          position: "relative",
          height: 220,
          background: "#162d54",
          overflow: "hidden",
        }}
      >
        <img
          src={img}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s",
            transform: hov ? "scale(1.05)" : "scale(1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(9,24,48,0.8), transparent)",
          }}
        />
        <div style={{ position: "absolute", top: 16, right: 16 }}>
          <span
            style={{
              background:
                status === "Ongoing" ? "#F95001" : "rgba(34,197,94,0.85)",
              color: status === "Ongoing" ? "#091830" : "#fff",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "4px 10px",
              borderRadius: 2,
            }}
          >
            {status}
          </span>
        </div>
      </div>
      <div style={{ padding: "24px 28px", background: "#162d54" }}>
        <div
          style={{
            color: "#F95001",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          {location}
        </div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 20,
            fontWeight: 700,
            color: "#fff",
            textTransform: "uppercase",
            letterSpacing: "0.03em",
            marginBottom: 10,
          }}
        >
          {name}
        </h3>
        <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.65 }}>
          {desc}
        </p>
        <Link
          href={ROUTES.clientele}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            color: "#F95001",
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            textDecoration: "none",
            marginTop: 16,
          }}
        >
          View Details <IconChevronRight />
        </Link>
      </div>
    </div>
  );
}
