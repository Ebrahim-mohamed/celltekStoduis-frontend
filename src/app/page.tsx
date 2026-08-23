import { WhoSection } from "@/components/homePage/WhoSection";
import { Hero } from "../components/Hero";
import { ServicesSection } from "@/components/homePage/ServicesSection";
import { ClientsSection } from "@/components/ClientsSection";
import { FeedbacksSection } from "@/components/homePage/FeedbacksSection";
import { WhySection } from "@/components/homePage/Why";
import { ProccesSection } from "@/components/homePage/Procces";
import { SectorsSection } from "@/components/homePage/Sectors";
import { EndSection } from "@/components/contact/EndSection";



export default function Home() {
  return (
    <div className="bg-[#0A0A0A]">
      <Hero
      smallText=""
        page="home"
        title={
          <span>
            Built Beyond Your  <br /> Imagination
          </span>
        }
        pra={<span>Visualize. Impress. Bring your vision to life.</span>}
      />
      <WhoSection />
      {/* <ServicesSection /> */}
      <ClientsSection />
      <WhySection />
      <FeedbacksSection />
      <ProccesSection/>
      <SectorsSection/>
      <EndSection/>
    </div>
  );
}
