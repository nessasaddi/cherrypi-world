import LeftRail from "@/components/nav/LeftRail";
import MobileTopBar from "@/components/nav/MobileTopBar";
import StudioOSHero from "@/components/hero/StudioOSHero";
import Operator from "@/components/sections/Operator";
import Stack from "@/components/sections/Stack";
import WorkLog from "@/components/sections/WorkLog";
import Lab from "@/components/sections/Lab";
import Newsletter from "@/components/sections/Newsletter";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <LeftRail />
      <MobileTopBar />
      <main className="cp-main-with-rail">
        <StudioOSHero />
        <Operator />
        <Stack />
        <WorkLog />
        <Lab />
        <Newsletter />
        <Footer />
      </main>
    </>
  );
}
