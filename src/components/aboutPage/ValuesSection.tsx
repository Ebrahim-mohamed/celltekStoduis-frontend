import { MostUsedHeader } from "../MostUsedHeader";
import { SecondTextPattern } from "../SecondTextPattern";
import { ValueBox } from "./ValueBox";

const values = [
  {
    title: "Celltek Studios",
    pra: "Architectural Visualization, 3D renders, product renders and 360° Virtual Tours & Animation that bring architectural concepts, interiors, spaces and products to life.Concept & Marketing Assets: Creative visual assets that translate ideas into compelling content for campaigns, presentations, launches, and brand communication.",
    icon:"arc"
  },
  {
    title: "Marketing Service",
    pra: "Digital Marketing: End-to-end digital solutions including websites, Shopify websites, social media management, and media buying. Marketing Plans & Execution: Strategic marketing planning combined with hands-on execution to turn business objectives into effective campaigns and measurable results.",
    icon:"market"
  },
  {
    title: "Omnichannel Services",
    pra: "Contact Center: Integrated inbound and outbound customer engagement services, including telesales, telemarketing, bookings and reservations, surveys, and WhatsApp communication. Trade Activations: On-ground activations and customer engagement solutions designed to strengthen brand presence, generate interaction, and support sales across physical touchpoints.",
    icon:"omn"
  },
  
];
export function ValuesSection() {
  return (
    <div className="p-[var(--sectionPadding)] bg-[#050606]">
      <MostUsedHeader smallText="What We Do Best" mainHeader={<p>Who <span className="text-[#5B8CFF]">We Are</span> & What We<br></br> Stand For</p>} />
      <p className="mb-[4rem] mt-[-4rem] text-[1rem] font-normal text-white text-center">Celltek Studios is the creative visualization arm of Celltek, transforming ideas, spaces, and products into photorealistic visual experiences that communicate concepts with <br></br> clarity and impact. From architectural environments to product visuals and immersive experiences, we create realistic renders and creative assets that bring ideas to life.</p>
      <p className="mb-[4rem] mt-[-2rem] text-[1rem]  font-normal text-white text-center">Celltek is a consulting services company delivering creative visualization, integrated marketing and omnichannel solutions that help businesses build stronger brands,<br></br> reach their audiences, and drive measurable growth. Through specialized business units, we combine technology, creativity, and execution to deliver end-to-end solutions.<br></br>
Celltek was established in 2003 and has a track record of 20 years in the market. Founded by an experienced group of business, finance and technology executives. Offices <br></br> in Egypt and the UK.</p>
      <div className="flex items-stretch justify-between gap-4 max-[800px]:flex-col max-[800px]:w-full">
        {values.map((value) => (
          <ValueBox pra={value.pra} title={value.title} key={value.title} icon={value.icon}/>
        ))}
      </div>
    </div>
  );
}
