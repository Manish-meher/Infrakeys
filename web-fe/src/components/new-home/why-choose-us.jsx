"use client";
import SectionHeader from "./section-header";
import Link from "next/link";
import { IconStar } from "./icons";
import { ROUTES } from "@/data/site";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// ─── WHY CHOOSE US ───────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    quote:
      "Infrakeys delivered 2,400 MT of structural steel two weeks ahead of schedule. Their material quality and logistics coordination are unmatched in the industry.",
    name: "Rajesh Sharma",
    company: "Director, Apex EPC Contractors",
  },
  {
    quote:
      "We've sourced PEB structures for three warehouses through Infrakeys. The technical team's responsiveness and the product quality give us full confidence.",
    name: "Priya Nair",
    company: "Head of Procurement, LogiSpace India",
  },
  {
    quote:
      "From TMT bars to crash barriers — Infrakeys is our single-source vendor for all structural materials. Consistent quality across every dispatch.",
    name: "Arun Mehta",
    company: "Project Manager, NHAI Corridor Team",
  },
];

const CLIENT_LOGOS = [
  "NHAI",
  "RVNL",
  "AAI",
  "CONCOR",
  "L&T",
  "Tata Projects",
  "NLC India",
  "BHEL",
];

export default function WhyChooseUs() {
  return (
    <section
      id="why-us"
      style={{ padding: "96px 24px", background: "#f1f5f9" }}
    >
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <SectionHeader
          tag="Trust"
          title="Trusted by Industry Leaders"
          desc="Partnering with India's premier infrastructure developers, EPC contractors, and government agencies."
        />

        {/* Client logos */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            marginTop: 56,
            justifyContent: "center",
          }}
        >
          {CLIENT_LOGOS.map((logo) => (
            <Link
              href={ROUTES.partners}
              key={logo}
              style={{
                padding: "14px 28px",
                background: "#fff",
                border: "1.5px solid #e2e8f0",
                borderRadius: 4,
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 15,
                color: "#94a3b8",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#0f2444";
                e.currentTarget.style.borderColor = "#0f2444";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#94a3b8";
                e.currentTarget.style.borderColor = "#e2e8f0";
              }}
            >
              {logo}
            </Link>
          ))}
        </div>

        <div
          style={{
            marginTop: 32,
            textAlign: "center",
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href={ROUTES.clientele}
            style={{
              color: "#0f2444",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              borderBottom: "2px solid #F95001",
              paddingBottom: 2,
            }}
          >
            View Our Partners
          </Link>
          {/* <Link
            href={ROUTES.partners}
            style={{ color: "#0f2444", fontWeight: 700, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", borderBottom: "2px solid #F95001", paddingBottom: 2 }}
          >
            Our Partners
          </Link> */}
          <Link
            href={ROUTES.blogs}
            style={{
              color: "#0f2444",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              borderBottom: "2px solid #F95001",
              paddingBottom: 2,
            }}
          >
            Read Our Blogs
          </Link>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
            marginTop: 64,
            textAlign: "center",
          }}
          className="stats-grid"
        >
          {[
            ["15+", "Years of Experience"],
            ["500+", "Projects Completed"],
            ["20+", "States Served"],
            ["1M+ MT", "Steel Tonnage Supplied"],
          ].map(([num, label]) => (
            <div
              key={label}
              style={{
                padding: "32px 24px",
                background: "#0f2444",
                borderRadius: 4,
                borderBottom: "3px solid #F95001",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 48,
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
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginTop: 8,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials carousel */}
        <div
          style={{
            marginTop: 64,
            padding: "0 44px",
            position: "relative",
          }}
          className="testimonial-carousel"
        >
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            loop
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              700: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="testimonial-swiper"
          >
            {TESTIMONIALS.map((t, i) => (
              <SwiperSlide key={i} style={{ height: "auto" }}>
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 4,
                    padding: "32px 28px",
                    border: "1.5px solid #e2e8f0",
                    position: "relative",
                    height: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
                    {[...Array(5)].map((_, j) => (
                      <span key={j} style={{ color: "#F95001" }}>
                        <IconStar />
                      </span>
                    ))}
                  </div>
                  <p
                    style={{
                      color: "#475569",
                      fontSize: 14.5,
                      lineHeight: 1.75,
                      marginBottom: 24,
                      fontStyle: "italic",
                    }}
                  >
                    &quot;{t.quote}&quot;
                  </p>
                  <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 16 }}>
                    <div
                      style={{ fontWeight: 700, color: "#0f2444", fontSize: 14 }}
                    >
                      {t.name}
                    </div>
                    <div style={{ color: "#94a3b8", fontSize: 12.5, marginTop: 2 }}>
                      {t.company}
                    </div>
                  </div>
                  {/* Accent */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: 3,
                      background: "linear-gradient(to right, #F95001, #d94401)",
                      borderRadius: "4px 4px 0 0",
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <style>{`
        .testimonial-carousel .swiper-button-prev,
        .testimonial-carousel .swiper-button-next {
          width: 36px;
          height: 36px;
          color: #0f2444;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(15, 36, 68, 0.08);
        }
        .testimonial-carousel .swiper-button-prev::after,
        .testimonial-carousel .swiper-button-next::after {
          font-size: 14px;
          font-weight: 800;
        }
        .testimonial-carousel .swiper-button-prev:hover,
        .testimonial-carousel .swiper-button-next:hover {
          color: #fff;
          background: #0f2444;
          border-color: #0f2444;
        }
        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .testimonial-carousel { padding: 0 36px !important; }
          .testimonial-carousel .swiper-button-prev,
          .testimonial-carousel .swiper-button-next {
            width: 30px;
            height: 30px;
          }
          .testimonial-carousel .swiper-button-prev::after,
          .testimonial-carousel .swiper-button-next::after {
            font-size: 11px;
          }
        }
      `}</style>
    </section>
  );
}
