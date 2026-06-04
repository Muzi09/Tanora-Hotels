import Header from "@/components/section/Header";
import Hero from "@/components/section/Hero";
import Suites from "@/components/section/Suites";
import Dining from "@/components/section/Dining";
import Banquets from "@/components/section/Banquets";
import EstateGlance from "@/components/section/EstateGlance";
import Footer from "@/components/section/Footer";
import BottomNav from "@/components/section/BottomNav";
import RevealObserver from "@/components/RevealObserver";

export default function Home() {
  return (
    <>
      <RevealObserver />
      <Header />
      <main>
        <Hero />
        <Suites />
        <Dining />
        <Banquets />
        <EstateGlance />
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
