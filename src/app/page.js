import Image from "next/image";
import HeroSection from "./Components/HeroSection";
import EasyStayReviews from "./Components/EasyStayReviews";
import  EasyStayPartners  from "./Components/EasyStayPartners";
import HowItWorks from "./Components/HowItWorks";
import FAQ from "./Components/FAQ";


export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Do not Code Here */}
      <HeroSection></HeroSection>
      <EasyStayReviews></EasyStayReviews>
      <HowItWorks></HowItWorks>
      <FAQ></FAQ>
      <EasyStayPartners></EasyStayPartners>
      
      
    </main>
  );
}
