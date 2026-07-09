import { SecondSection } from "@/components/aboutPage/SecondSection";
import { Hero } from "../../components/Hero";
import { ValuesSection } from "@/components/aboutPage/ValuesSection";
import { ClientsSection } from "@/components/ClientsSection";


import { SegSection } from "@/components/aboutPage/SegSection";
import { FeedbacksSection } from "@/components/homePage/FeedbacksSection";
import { QandASection } from "@/components/aboutPage/QandA";

export default function About() {
  return (
    <div>
      <Hero
      smallText="About Us"
        page="services"
        title={<p>Exceptional Work Built<br></br> Around <span className="text-[#5B8CFF]">Your Vision</span></p>}
        pra={
          <span>
           Combining technology, architectural expertise, and creative storytelling to bring ideas to life through exceptional visual experiences.
          </span>
        }
      />
      <SecondSection />
      <ClientsSection/>
      <SegSection />
      <ValuesSection />
      <FeedbacksSection/>
      <QandASection/>
    </div>
  );
}
