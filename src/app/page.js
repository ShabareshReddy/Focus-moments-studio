import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import SocialProof from "@/components/SocialProof";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// Runs on the SERVER before the page is sent to the browser.
// Image URLs are baked into the HTML — no client-side waiting.
async function getHeroImages() {
  if (!supabaseAdmin) return [];
  try {
    const { data, error } = await supabaseAdmin.storage
      .from("gallery-images")
      .list("hero", {
        limit: 20,
        offset: 0,
        sortBy: { column: "created_at", order: "desc" },
      });

    if (error || !data) return [];

    const validFiles = data.filter(
      (file) =>
        file.name !== ".emptyFolderPlaceholder" && file.name !== "hero"
    );

    return validFiles.map((file) => {
      const { data: { publicUrl } } = supabaseAdmin.storage
        .from("gallery-images")
        .getPublicUrl(`hero/${file.name}`);
      return publicUrl;
    });
  } catch {
    return [];
  }
}

export default async function Home() {
  const heroImages = await getHeroImages();

  return (
    <div className="flex flex-col w-full">
      <Hero images={heroImages} />
      <Services />
      <Gallery />
      <SocialProof />
      <Pricing />
      <About />
      <FloatingContactButtons />
    </div>
  );
}
