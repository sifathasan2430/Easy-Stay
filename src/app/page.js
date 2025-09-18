import Image from "next/image";
import HeroSection from "./Components/HeroSection";
import EasyStayReviews from "./Components/EasyStayReviews";
import  EasyStayPartners  from "./Components/EasyStayPartners";


export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Do not Code Here */}
      <HeroSection></HeroSection>
      <EasyStayReviews></EasyStayReviews>
      <EasyStayPartners></EasyStayPartners>
      
      
    </main>
  );
}
