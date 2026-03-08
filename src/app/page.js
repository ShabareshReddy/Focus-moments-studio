import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import SocialProof from "@/components/SocialProof";
import About from "@/components/About";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Gallery />
      <SocialProof />
      <About />
    </div>
  );
}
