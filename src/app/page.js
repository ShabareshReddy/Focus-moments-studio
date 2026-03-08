import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import Services from "@/components/Services";
import SocialProof from "@/components/SocialProof";
import ShootFormats from "@/components/ShootFormats";
import About from "@/components/About";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Gallery />
      {/* <Services /> */}
      <SocialProof />
      <ShootFormats />
      <About />
    </div>
  );
}
