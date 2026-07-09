import { WhoSection } from "@/components/homePage/WhoSection";
import { Hero } from "../components/Hero";
import { ServicesSection } from "@/components/homePage/ServicesSection";
import { ClientsSection } from "@/components/ClientsSection";
import { FeedbacksSection } from "@/components/homePage/FeedbacksSection";
import { WhySection } from "@/components/homePage/Why";
import { ProccesSection } from "@/components/homePage/Procces";
import { SectorsSection } from "@/components/homePage/Sectors";



export default function Home() {
  return (
    <div className="bg-[#0A0A0A]">
      <Hero
        page="home"
        title={
          <span>
            Building The Future <br /> With Precision
          </span>
        }
        pra={<span>EGYSMART where vision meets exactness</span>}
      />
      <WhoSection />
      <ServicesSection />
      <ClientsSection />
      <WhySection />
      <FeedbacksSection />
      <ProccesSection/>
      <SectorsSection/>
    </div>
  );
}
