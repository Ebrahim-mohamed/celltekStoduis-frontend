"use client";
import { MostUsedHeader } from "../MostUsedHeader";
import { WhyBox } from "./WhyBox";
const whys=[{head:"Photorealistic Quality",pra:"Delivering high-end cinematic visuals and realistic rendering quality."},
  {head:"Architectural-backed Workflow",pra:"Combining technical architectural understanding with visualization workflows."},
  {head:"Scalable Production",pra:"Building workflows that support consistent, scalable output across industries and project sizes."},
]
export function WhySection() {
  return (
    <div
      className="p-[var(--sectionPadding)] bg-[#0A0A0A] overflow-hidden items-start flex gap-[2rem]"
  
    >
  <MostUsedHeader isStart  smallText="Why Celtek" mainHeader={<p className="text-[6.5rem] leading-[100%]">More Than<br></br> <span className="text-[#5B8CFF]">Visualization</span></p>} />
  <div className="flex flex-col gap-4 w-full">
    {whys.map(why=><WhyBox head={why.head} pra={why.pra} key={why.head} />)}
  </div>
    </div>
  );
}
