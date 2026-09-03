/**
 * Home page.
 *
 * This is the design that used to live at /new-home. It now renders at "/".
 * The site-wide <Header /> and <Footer /> come from src/components/layout, so
 * this file only composes the page sections.
 */
import "@/components/new-home/new-home.css";

import Hero from "@/components/new-home/hero";
import Products from "@/components/new-home/products";
import CTAStrip from "@/components/new-home/cta-strip";
import HowWeWork from "@/components/new-home/how-we-work";
import Projects from "@/components/new-home/projects";
import Industries from "@/components/new-home/industries";
import WhyChooseUs from "@/components/new-home/why-choose-us";
import Quote from "@/components/new-home/quote";
import FloatingButtons from "@/components/new-home/floating-buttons";
import Partners from "@/components/our-partners";

export default function Home() {
  return (
    <div className="new-home-root">
      <Hero />
      <Products />
      <CTAStrip />
      <HowWeWork />
      <Projects />
      <Industries />
      <CTAStrip />
      <WhyChooseUs />
      <Quote />
      <Partners />
    </div>
  );
}
