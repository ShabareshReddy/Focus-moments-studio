import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import SocialProof from "@/components/SocialProof";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import FloatingContactButtons from "@/components/FloatingContactButtons";

export default function Home() {

  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Services />
      <Gallery />
      <SocialProof />
      <Pricing />
      <About />
      <FloatingContactButtons />
    </div>
  );
}
