import ScrollProgress from "@/components/ui/ScrollProgress";
import ParticleHero from "@/components/hero/ParticleHero";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import Connect from "@/components/sections/Connect";
import Footer from "@/components/sections/Footer";

export default function Studio() {
  return (
    <>
      <main>
        <ScrollProgress />
        <ParticleHero />
        <About />
        <Work />
        <Connect />
      </main>
      <Footer />
    </>
  );
}
