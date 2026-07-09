import { MostUsedHeader } from "../MostUsedHeader";
import { SecondTextPattern } from "../SecondTextPattern";
import { ValueBox } from "./ValueBox";

const values = [
  {
    title: "Architectural Visualization",
    pra: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniamLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut e",
    icon:"arc"
  },
  {
    title: "Marketing Service",
    pra: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniamLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut e",
    icon:"market"
  },
  {
    title: "Omnichannel Services",
    pra: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniamLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut e",
    icon:"omn"
  },
  
];
export function ValuesSection() {
  return (
    <div className="p-[var(--sectionPadding)] bg-[#050606]">
      <MostUsedHeader smallText="What We Do Best" mainHeader={<p>Who <span className="text-[#5B8CFF]">We Are</span> & What We<br></br> Stand For</p>} />
      <div className="flex items-center justify-between gap-4 max-[800px]:flex-col max-[800px]:w-full">
        {values.map((value) => (
          <ValueBox pra={value.pra} title={value.title} key={value.title} icon={value.icon}/>
        ))}
      </div>
    </div>
  );
}
