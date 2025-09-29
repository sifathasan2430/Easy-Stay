import Image from "next/image";
import HeroSection from "./Components/HeroSection";
import EasyStayReviews from "./Components/EasyStayReviews";
import EasyStayPartners from "./Components/EasyStayPartners";
import HowItWorks from "./Components/HowItWorks";
import FAQ from "./Components/FAQ";
import LatestStaysInHome from "./Components/LatestStaysInHome";
import Stats from "./Components/Stats";

export default function Home() {
  return (
    <main className="min-h-screen  md:pt-16">
      {/* Do not Code Here */}
      <HeroSection></HeroSection>
      <div className="mx-auto w-11/12">
        <LatestStaysInHome></LatestStaysInHome>
        <EasyStayReviews></EasyStayReviews>
        <HowItWorks></HowItWorks>
        <Stats></Stats>
        <FAQ></FAQ>
        <EasyStayPartners></EasyStayPartners>
      </div>
    </main>
  );
}
