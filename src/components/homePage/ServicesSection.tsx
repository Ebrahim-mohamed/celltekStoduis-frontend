import Link from "next/link";

import { ServiceBox } from "./ServiceBox";
import { MostUsedHeader } from "../MostUsedHeader";
const servicesAbove = [
  {
    title: "Turnkey Projects",
    link: "services/#turnkeyProjects",
    img: "ser1",
  },
  {
    title: "Concrete Flooring",
    
    link: "services/#concreteFlooring",
    img: "ser2",

  },
  {
    title: "Turnkey Projects",
    link: "services/#turnkeyProjects",
    img: "ser3",
  },
  {
    title: "Concrete Flooring",
    
    link: "services/#concreteFlooring",
    img: "ser4",

  },
];
export function ServicesSection() {
  return (
    <div className="p-[var(--sectionPadding)] bg-[#0A0A0A] ">
      <MostUsedHeader smallText="Featured Work" mainHeader={<p>Built to <span className="text-[#5B8CFF]">Impress</span></p>} />
      <div className="flex flex-col gap-4 w-full">
        <div className="grid grid-cols-2 gap-4 max-[900px]:grid-cols-1">
          {servicesAbove.map((ser) => (
            <ServiceBox
              img={ser.img}
              link={ser.link}
              title={ser.title}
              key={ser.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
