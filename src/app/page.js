import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import SocialProof from "@/components/SocialProof";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = 'force-dynamic';

async function getHeroImages() {
  if (!supabaseAdmin) return [];
  try {
    const { data, error } = await supabaseAdmin.storage
      .from("gallery-images")
      .list("hero", {
        limit: 10,
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
      return `${publicUrl}?t=${new Date(file.created_at || Date.now()).getTime()}`;
    });
  } catch {
    return [];
  }
}

export default async function Home() {
  const heroImages = await getHeroImages();

  return (
    <div className="flex flex-col w-full">
      <Hero initialImages={heroImages} />
      <Services />
      <Gallery />
      <SocialProof />
      <Pricing />
      <About />
      <FloatingContactButtons />
    </div>
  );
}
