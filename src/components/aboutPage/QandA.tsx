"use client";

import { MostUsedHeader } from "../MostUsedHeader";
import { Accordion } from "./Accordion";

const faqs = [
  {
    question: "What is included in a 360° virtual tour?",
    answer:
      "A seamless, self-guided walkthrough of a property, accessible on any device, 24/7. Virtual tours increase engagement and time-on-property and help qualify leads by giving viewers a true sense of space — great for remote buyers, international investors, and boosting online listings.",
  },
  {
    question: "Who are these services ideal for?",
    answer:
      "Developers, architects, real estate marketers, and investors — anyone who needs to sell, present, or plan a space before it's physically built.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "Primarily real estate and architecture, but our broader client base spans ICT, energy, healthcare, e-commerce, BFSI, training & consulting, education, and government sectors.",
  },
  {
    question: "Who are some of your clients?",
    answer:
      "We've worked with organizations including Etisalat, Huawei, Vodafone, Nokia, stc, Ericsson, ExxonMobil, Visa, Hilton, and many others across telecom, energy, and real estate.",
  },
  {
    question: "How do I get a quote or start a project?",
    answer: (
      <>
        Contact us at{" "}
        <a
          href="mailto:info@celltek.com.eg"
          className="text-[#5B8CFF] hover:underline transition-all"
        >
          info@celltek.com.eg
        </a>{" "}
        or reach out directly to our Executive Chairman, Amr Gohar (
        <a
          href="mailto:agohar@celltek.uk.com"
          className="text-[#5B8CFF] hover:underline transition-all"
        >
          agohar@celltek.uk.com
        </a>
        ), or Managing Director, Ahmed Al Basiouni (
        <a
          href="mailto:aalbasiouni@celltek.com.eg"
          className="text-[#5B8CFF] hover:underline transition-all"
        >
          aalbasiouni@celltek.com.eg
        </a>
        ).
      </>
    ),
  },
];

export function QandASection() {
  return (
    <section className="p-[var(--sectionPadding)] bg-[#0A0A0A] overflow-hidden">
      <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
        {/* Left - Header */}
        <div className="w-full lg:w-[40%]">
          <MostUsedHeader
            isStart
            smallText="FAQs"
            mainHeader={
              <p className="text-[2.8rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[4.5rem] leading-[105%]">
                <span className="text-[#5B8CFF]">Everything</span> You
                <br />
                Need to Know
              </p>
            }
          />
        </div>

        {/* Right - Accordion */}
        <div className="w-full lg:w-[60%]">
          <Accordion items={faqs} defaultOpenIndex={0} />
        </div>
      </div>
    </section>
  );
}