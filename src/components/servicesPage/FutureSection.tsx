"use client";

import { useRef, useState, useEffect } from "react";

import { NumberComponent } from "../NumberComponent";
import { FutureImage } from "./FutureImage";

const numbers = [
  { number: 10, icon: "+", title: "YEARS OF EXPERIENCE" },
  { number: 100, icon: "+", title: "COMPLETED PROJECTS" },
  { number: 775, icon: "K", title: "SQUARE METERS BUILT" },
  { number: 500, icon: "M", title: "REVENUE" },
];

export function FutureSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [startCounting, setStartCounting] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCounting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="p-[var(--sectionPadding)] flex max-[900px]:flex-col gap-14 items-start justify-between bg-[#0A0A0A]"
      id="first"
    >
      <div>

        <div className="w-full flex items-center justify-between gap-4 mt-8">
          {numbers.map((item) => (
            <NumberComponent
              key={item.title}
              number={item.number}
              icon={item.icon}
              title={item.title}
              isSmall
              start={startCounting}
              duration={1500}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-4 items-center max-[900px]:flex-col max-[900px]:w-full">
        <FutureImage img="protectiveCoating" title="Protective Coating" />
        <div className="flex flex-col gap-4 max-[900px]:w-full">
          <FutureImage img="turnkeyProjects" title="Turnkey Projects" />
          <FutureImage img="concreteFlooring" title="Concrete Flooring" />
        </div>
      </div>
    </div>
  );
}
