import StickyHeader from "@/components/layout/StickyHeader";
import TopoHero from "@/components/hero/TopoHero";
// import WhatWeBuild from "@/components/sections/WhatWeBuild"; // temporarily hidden — revisit
import TheStack from "@/components/sections/TheStack";
import HomeChat from "@/components/sections/HomeChat";

export default function Home() {
  return (
    <main>
      <StickyHeader />
      <TopoHero />
      {/* <WhatWeBuild /> */}
      <TheStack />
      <HomeChat />
    </main>
  );
}
