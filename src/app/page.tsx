import Nav from '@/components/resume/Nav';
import Hero from '@/components/resume/Hero';
import Fit from '@/components/resume/Fit';
import Work from '@/components/resume/Work';
import Tools from '@/components/resume/Tools';
import Experience from '@/components/resume/Experience';
import Contact from '@/components/resume/Contact';

export default function Home() {
  return (
    <>
      <Nav />
      <main className="with-rail">
        <Hero />
        <Fit />
        <Work />
        <Tools />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
