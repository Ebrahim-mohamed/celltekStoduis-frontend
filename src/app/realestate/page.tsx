import { Hero } from "@/components/Hero";
import { ClientsSection } from "@/components/realestatePage/ClientsSection";
import { FeaturesSection } from "@/components/realestatePage/FeaturesSection";

export default function Realestate(){
    return <div className="bg-[#0A0A0A]">
          <Hero
          smallText=""
            page="realEstate"
            title={
              <span>
                Our core <br /> Solution
              </span>
            }
            pra={<span>Visualize. Impress. Bring your vision to life.</span>}
          />
          <FeaturesSection/>
          <ClientsSection/>
          </div>
}