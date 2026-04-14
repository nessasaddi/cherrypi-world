import StickyHeader from "@/components/layout/StickyHeader";
import TopoHero from "@/components/hero/TopoHero";
import HomeChat from "@/components/sections/HomeChat";

export default function Home() {
  return (
    <main>
      <StickyHeader />
      <TopoHero />
      <HomeChat />
    </main>
  );
}
