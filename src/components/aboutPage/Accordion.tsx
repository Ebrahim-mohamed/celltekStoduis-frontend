"use client";

import { ReactNode, useState } from "react";

interface AccordionItem {
  question: string;
  answer: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpenIndex?: number | null;
}

export function Accordion({
  items,
  defaultOpenIndex = 0,
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(
    defaultOpenIndex
  );

  const toggleItem = (index: number) => {
    setOpenIndex((currentIndex) =>
      currentIndex === index ? null : index
    );
  };

  return (
    <div className="w-full border-t border-white/15">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={item.question}
            className="border-b border-white/15"
          >
            <button
              type="button"
              onClick={() => toggleItem(index)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-5 py-5 md:py-6 text-left group"
            >
              <div className="flex items-start gap-4 md:gap-5">
                {/* Number */}
                <span className="text-[#5B8CFF] text-xs md:text-sm font-medium min-w-[1.5rem] pt-1">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Question */}
                <span className="text-white text-base md:text-lg lg:text-xl leading-[130%] font-medium transition-opacity duration-300 group-hover:opacity-70">
                  {item.question}
                </span>
              </div>

              {/* Arrow */}
              <span
                className={`flex-shrink-0 w-8 h-8 md:w-9 md:h-9 rounded-full border border-white/25 flex items-center justify-center transition-all duration-300 ${
                  isOpen
                    ? "bg-[#5B8CFF] border-[#5B8CFF] rotate-180"
                    : "group-hover:border-white/60"
                }`}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.5 6.75L9 11.25L13.5 6.75"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>

            {/* Answer */}
            <div
              className={`grid transition-all duration-500 ease-in-out ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="pb-6 pl-[3.5rem] md:pl-[4rem] pr-8 md:pr-12">
                  <div className="text-white/55 text-sm md:text-base leading-[160%] max-w-[750px]">
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}