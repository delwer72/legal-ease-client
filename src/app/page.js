import HeroSection from "@/components/HeroSection";
import FeaturedLawyers from "@/components/FeaturedLawyers";
import TopLawyers from "@/components/TopLawyers";
import LegalCategories from "@/components/LegalCategories";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedLawyers />
      <LegalCategories />
      <TopLawyers />
      {/* <Footer/> */}
    </div>
  );
}