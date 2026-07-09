"use client";
import { MostUsedHeader } from "../MostUsedHeader";

export function QandASection() {
  return (
    <div
      className="p-[var(--sectionPadding)] bg-[#0A0A0A] overflow-hidden items-start flex gap-[2rem]"
  
    >
  <MostUsedHeader isStart  smallText="FAQs" mainHeader={<p className="text-[6.5rem] leading-[100%]"><span className="text-[#5B8CFF]">Everything</span> You<br></br>Need to Know </p>} />

    </div>
  );
}
