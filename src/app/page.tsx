import StickyHeader from "@/components/layout/StickyHeader";
import TopoHero from "@/components/hero/TopoHero";
// import WhatWeBuild from "@/components/sections/WhatWeBuild"; // temporarily hidden — revisit
import TheStack from "@/components/sections/TheStack";
// import Founder from "@/components/sections/Founder"; // hidden — revisit after tweaks
import HomeChat from "@/components/sections/HomeChat";
import Connect from "@/components/sections/Connect";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <StickyHeader />
      <TopoHero />
      {/* <WhatWeBuild /> */}
      <TheStack />
      {/* <Founder /> */}
      <HomeChat />
      <Connect />
      <Footer />
    </main>
  );
}
