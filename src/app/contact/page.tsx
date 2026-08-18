import { CommunicationSection } from "@/components/contact/CommunicationSection";
import { EndSection } from "@/components/contact/EndSection";
import { Hero } from "@/components/Hero";

export default function Contact() {
  return (
    <div >
       {/* <Hero
      smallText="contact"
        page="contact"
        title={<p>Premium <span className="text-[#5B8CFF]">solutions</span> crafted<br></br> around your vision</p>}
        pra={
          <span>
           From architectural visualization to immersive experiences, we transform ideas into compelling visual realities.
          </span>
        }
      /> */}
      <CommunicationSection />
      <EndSection />
    </div>
  );
}
