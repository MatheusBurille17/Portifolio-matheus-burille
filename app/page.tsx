import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Capability from "@/components/Capability";
import Process from "@/components/Process";
import WhyWebsite from "@/components/WhyWebsite";
import About from "@/components/About";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingCta from "@/components/FloatingCta";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Header />

      <main id="conteudo">
        <Hero />
        <Services />
        <Portfolio />
        <Capability />
        <Process />
        <WhyWebsite />
        <About />
        <CTA />
        <Contact />
      </main>

      <Footer />
      <FloatingCta />
    </>
  );
}
