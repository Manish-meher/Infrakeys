"use client";

// ── Business Model data ──────────────────────────────────────────────────────

export const BIZ_SEGMENTS = [
  {
    id: "steel",
    label: "Steel & Raw\nMaterials",
    color: "#2563eb",
    bg: "#dbeafe",
    // top segment (12 o'clock)
    products: [
      { name: "HR Coils", img: "/new-home/hr-coil.avif" },
      {
        name: "Steel Plates",
        img: "/new-home/steel-plates.avif",
      },
      {
        name: "TMT Bars",
        img: "/new-home/tmt-bar.avif",
      },
      {
        name: "Structural Sections",
        img: "/new-home/stucture.avif",
      },
    ],
  },
  {
    id: "peb",
    label: "PEB &\nStructures",
    color: "#F95001",
    bg: "#fff0e8",
    // right segment (3 o'clock)
    products: [
      {
        name: "Pre-Eng. Buildings",
        img: "/new-home/pre-eng.avif",
      },
      {
        name: "Roofing Sheets",
        img: "/new-home/roof-sheet.avif",
      },
      {
        name: "Mezzanine Floors",
        img: "/new-home/Mezzanine.avif",
      },
    ],
  },
  {
    id: "scaffolding",
    label: "Scaffolding\n& Safety",
    color: "#16a34a",
    bg: "#dcfce7",
    // bottom segment (6 o'clock)
    products: [
      {
        name: "Frame Scaffolding",
        img: "/new-home/frame.avif",
      },
      {
        name: "Crash Barriers",
        img: "/new-home/Barriers.avif",
      },
      {
        name: "Safety Nets",
        img: "/new-home/nets.avif",
      },
    ],
  },
  {
    id: "building",
    label: "Building\nMaterials",
    color: "#7c3aed",
    bg: "#ede9fe",
    // left segment (9 o'clock)
    products: [
      {
        name: "Paints & Coatings",
        img: "/new-home/Coatings.avif",
      },
      {
        name: "Cement",
        img: "/new-home/cement.avif",
      },
      {
        name: "Aggregates",
        img: "/new-home/Aggregates.avif",
      },
      {
        name: "Waterproofing",
        img: "/new-home/Waterproofing.avif",
      },
    ],
  },
];

// Circular wheel SVG — 4 arc segments, each 90° with a 4° gap
export default function BusinessWheel({ activeId, onHover }) {
  const cx = 200,
    cy = 200,
    r = 160,
    innerR = 72;

  // Build arc path for a segment
  function arcPath(startDeg, endDeg, outerR, iR) {
    const toRad = (d) => ((d - 90) * Math.PI) / 180;
    const s = toRad(startDeg),
      e = toRad(endDeg);
    const x1 = cx + outerR * Math.cos(s),
      y1 = cy + outerR * Math.sin(s);
    const x2 = cx + outerR * Math.cos(e),
      y2 = cy + outerR * Math.sin(e);
    const ix1 = cx + iR * Math.cos(e),
      iy1 = cy + iR * Math.sin(e);
    const ix2 = cx + iR * Math.cos(s),
      iy2 = cy + iR * Math.sin(s);
    return `M ${x1} ${y1} A ${outerR} ${outerR} 0 0 1 ${x2} ${y2} L ${ix1} ${iy1} A ${iR} ${iR} 0 0 0 ${ix2} ${iy2} Z`;
  }

  // Label midpoint
  function labelPos(startDeg, endDeg, dist) {
    const mid = ((startDeg + endDeg) / 2 - 90) * (Math.PI / 180);
    return { x: cx + dist * Math.cos(mid), y: cy + dist * Math.sin(mid) };
  }

  const gap = 5;
  const segs = [
    { ...BIZ_SEGMENTS[0], start: 0 + gap, end: 90 - gap }, // top
    { ...BIZ_SEGMENTS[1], start: 90 + gap, end: 180 - gap }, // right
    { ...BIZ_SEGMENTS[2], start: 180 + gap, end: 270 - gap }, // bottom
    { ...BIZ_SEGMENTS[3], start: 270 + gap, end: 360 - gap }, // left
  ];

  return (
    <svg
      viewBox="0 0 400 400"
      style={{
        width: "100%",
        maxWidth: 400,
        display: "block",
        margin: "0 auto",
      }}
    >
      {/* Outer decorative ring */}
      <circle
        cx={cx}
        cy={cy}
        r={r + 14}
        fill="none"
        stroke="#e2e8f0"
        strokeWidth="2"
        strokeDasharray="4 6"
      />

      {segs.map((seg) => {
        const isActive = activeId === seg.id;
        const lp = labelPos(seg.start, seg.end, (r + innerR) / 2);
        const lines = seg.label.split("\n");
        return (
          <g
            key={seg.id}
            onMouseEnter={() => onHover(seg.id)}
            onMouseLeave={() => onHover(null)}
            style={{ cursor: "pointer", transition: "opacity 0.2s" }}
            opacity={activeId && !isActive ? 0.55 : 1}
          >
            <path
              d={arcPath(seg.start, seg.end, r, innerR)}
              fill={isActive ? seg.color : seg.bg}
              stroke="#fff"
              strokeWidth="3"
              style={{ transition: "fill 0.25s" }}
            />
            {lines.map((line, li) => (
              <text
                key={li}
                x={lp.x}
                y={lp.y + (li - (lines.length - 1) / 2) * 14}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="11"
                fontWeight="700"
                fontFamily="Inter, sans-serif"
                fill={isActive ? "#fff" : seg.color}
                style={{ transition: "fill 0.25s", pointerEvents: "none" }}
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}

      {/* Rotating arrows on the outer ring */}
      {[45, 135, 225, 315].map((deg) => {
        const rad = ((deg - 90) * Math.PI) / 180;
        const px = cx + (r + 8) * Math.cos(rad);
        const py = cy + (r + 8) * Math.sin(rad);
        return (
          <text
            key={deg}
            x={px}
            y={py}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="14"
            fill="#F95001"
            transform={`rotate(${deg}, ${px}, ${py})`}
            style={{ pointerEvents: "none" }}
          >
            ▶
          </text>
        );
      })}

      {/* Centre circle */}
      <circle cx={cx} cy={cy} r={innerR - 4} fill="#0f2444" />
      <text
        x={cx}
        y={cy - 10}
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fontFamily="'Barlow Condensed', sans-serif"
        fill="#F95001"
        letterSpacing="1"
      >
        PROJECT
      </text>
      <text
        x={cx}
        y={cy + 6}
        textAnchor="middle"
        fontSize="14"
        fontWeight="800"
        fontFamily="'Barlow Condensed', sans-serif"
        fill="#fff"
        letterSpacing="1"
      >
        LIFECYCLE
      </text>
      <circle
        cx={cx}
        cy={cy}
        r={innerR - 4}
        fill="none"
        stroke="#F95001"
        strokeWidth="1.5"
      />
    </svg>
  );
}
