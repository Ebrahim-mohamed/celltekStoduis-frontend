"use client";

import { useEffect, useState } from "react";

import { SecondTextPattern } from "../SecondTextPattern";
import { FeedbackBox } from "./FeedbackBox";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { MostUsedHeader } from "../MostUsedHeader";

interface Testimonial {
  _id: string;
  name: string;
  company: string;
  title: string;
  feedback: string;
}

export function FeedbacksSection() {
  const [feedbacks, setFeedbacks] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError(false);

        const res = await fetch(`http://localhost:4002/api/testimonials`);

        if (!res.ok) {
          throw new Error("Failed to fetch testimonials");
        }

        const data: Testimonial[] = await res.json();
        setFeedbacks(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="p-[var(--sectionPadding)] bg-[#0A0A0A] overflow-hidden">
      <MostUsedHeader
        smallText="What Our Clients Say"
        mainHeader={
          <p>
            Built on <span className="text-[#5B8CFF]">Trust</span>
          </p>
        }
      />

      {loading && (
        <p className="text-center text-[#9EA8B7] mt-10">Loading feedback...</p>
      )}

      {!loading && error && (
        <p className="text-center text-[#9EA8B7] mt-10">
          Couldn&apos;t load feedback right now.
        </p>
      )}

      {!loading && !error && feedbacks.length === 0 && (
        <p className="text-center text-[#9EA8B7] mt-10">
          No feedback yet.
        </p>
      )}

      {!loading && !error && feedbacks.length > 0 && (
        <>
          {/* Slider */}
          <Swiper
            modules={[Autoplay, Navigation]}
            loop
            centeredSlides
            slidesPerView={1}
            spaceBetween={32}
            speed={700}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: ".feedback-prev",
              nextEl: ".feedback-next",
            }}
            breakpoints={{
              801: {
                slidesPerView: 1.8,
                spaceBetween: 48,
              },
            }}
            className="overflow-visible"
          >
            {feedbacks.map((item) => (
              <SwiperSlide key={item._id}>
                <FeedbackBox
                  feedback={item.feedback}
                  img="feedbackPlaceholder"
                  job={
                    item.title && item.company
                      ? `${item.title} at ${item.company}`
                      : item.title || item.company || ""
                  }
                  person={item.name}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Arrows */}
          <div className="flex items-center justify-center gap-6 mt-14">
            <button
              type="button"
              className="feedback-prev text-[#9EA8B7] text-[1.5rem] w-[2rem] h-[2rem] rounded-full border border-[#9EA8B7] flex items-center justify-center p-4 hover:bg-[#277FCD] hover:text-white cursor-pointer"
            >
              &#x21D0;
            </button>

            <button
              type="button"
              className="feedback-next text-[#9EA8B7] text-[1.5rem] w-[2rem] h-[2rem] rounded-full border border-[#9EA8B7] flex items-center justify-center p-4 hover:bg-[#277FCD] hover:text-white cursor-pointer"
            >
              &#x21D2;
            </button>
          </div>
        </>
      )}
    </div>
  );
}