"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import VideoSlider from "./VideoSlider";

export function ProjectTemplate({
  title,
  client,
  images,
  num,
  description,
  vedios,
  tour
}: {
  title: string;
  description:string;
  client: string;
  images: string[];              // ← was: img: string
  num: number;
  vedios:string[];
  tour:string
}) {
  const baseUrl = "http://localhost:4002/uploads/";

  return (
    <div
      className={`${
        num % 2 === 0
          ? "flex max-[800px]:flex-col"
          : "flex-row-reverse flex max-[800px]:flex-col"
      } gap-10 py-16 border-b border-[#7A8693]`}
    >
      {/* ── IMAGE SLIDER ── */}
      <div className="w-[55%] max-[800px]:w-full rounded-2xl overflow-hidden">
        {images && images.length > 1 ? (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            loop
            className="w-full h-full rounded-2xl"
          >
            {images.map((img, i) => (
              <SwiperSlide key={i}>
                <img
                  src={`${baseUrl}${img}`}
                  alt={`${title} image ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          // Single image — no slider needed
          <img
            src={`${baseUrl}${images?.[0]}`}
            alt={title}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* ── INFO ── */}
      <div className="flex-1 flex flex-col gap-10 text-white">
        <h1 className="text-[3rem] font-bold">{title}</h1>

        <div className="flex px-6 flex-col gap-4 border-l border-[#D9D9D9] text-[1rem] font-normal">
          <div className="flex gap-6">
            <p className="font-[325]">Client</p>
            <p className="font-medium">{client}</p>
          </div>
        </div>

      </div>
      <VideoSlider/>
    </div>
  );
}