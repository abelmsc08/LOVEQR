import dynamic from "next/dynamic";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { HowItWorks } from "@/components/sections/how-it-works";
import { ResumeDraftModal } from "@/components/ui/resume-draft-modal";

// Seções abaixo da dobra: code-split para reduzir JS inicial
const Pricing = dynamic(() =>
  import("@/components/sections/pricing").then((m) => ({ default: m.Pricing }))
);
const Gallery = dynamic(() =>
  import("@/components/sections/gallery").then((m) => ({ default: m.Gallery }))
);
const Testimonials = dynamic(() =>
  import("@/components/sections/testimonials").then((m) => ({ default: m.Testimonials }))
);
const FAQ = dynamic(() =>
  import("@/components/sections/faq").then((m) => ({ default: m.FAQ }))
);
const FinalCTA = dynamic(() =>
  import("@/components/sections/final-cta").then((m) => ({ default: m.FinalCTA }))
);
const Footer = dynamic(() =>
  import("@/components/sections/footer").then((m) => ({ default: m.Footer }))
);

export default function Home() {
  return (
    <>
      <ResumeDraftModal />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Stats />
        <HowItWorks />
        <Pricing />
        <Gallery />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
