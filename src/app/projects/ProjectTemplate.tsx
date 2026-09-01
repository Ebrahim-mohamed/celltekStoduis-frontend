"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


function VideoSection({
  videos,
}: {
  videos: string[];
}) {
  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <h2 className="text-white text-3xl font-bold mb-8">
        Project Videos
      </h2>

      <div className="space-y-10">
        {videos.map((video, index) => (
          <div
            key={`${video}-${index}`}
            className="w-full rounded-2xl overflow-hidden bg-black"
          >
            <video
              src={video}
              controls
              playsInline
              preload="metadata"
              className="w-full h-auto max-h-[800px]"
            >
              Your browser does not support
              the video tag.
            </video>
          </div>
        ))}
      </div>
    </section>
  );
}

function ImageSection({
  title,
  images,
}: {
  title: string;
  images: string[];
}) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <h2 className="text-white text-3xl font-bold mb-8">
        Project Gallery
      </h2>

      <div className="w-full rounded-2xl overflow-hidden">
        {images.length > 1 ? (
          <Swiper
            modules={[
              Navigation,
              Pagination,
            ]}
            navigation
            pagination={{
              clickable: true,
            }}
            loop
            className="w-full"
          >
            {images.map(
              (image, index) => (
                <SwiperSlide
                  key={`${image}-${index}`}
                >
                  <div className="w-full bg-[#111]">
                    <img
                      src={`/uploads/${image}`}
                      alt={`${title} ${index + 1}`}
                      className="w-full max-h-[850px] object-contain"
                    />
                  </div>
                </SwiperSlide>
              )
            )}
          </Swiper>
        ) : (
          <div className="w-full bg-[#111]">
            <img
              src={`/uploads/${images[0]}`}
              alt={title}
              className="w-full max-h-[850px] object-contain"
            />
          </div>
        )}
      </div>
    </section>
  );
}

function TourSection({
  tours,
}: {
  tours: string[];
}) {
  if (!tours || tours.length === 0) {
    return null;
  }

  return (
    <section className="mt-20">
      <h2 className="text-white text-3xl font-bold mb-8">
        3D Tours
      </h2>

      <div className="space-y-12">
        {tours.map((tour, index) => (
          <div
            key={`${tour}-${index}`}
            className="w-full"
          >
            <h3 className="text-white text-xl font-semibold mb-4">
              3D Tour {index + 1}
            </h3>

            <div className="w-full h-[70vh] min-h-[500px] rounded-2xl overflow-hidden bg-black border border-white/10">
              <iframe
                src={tour}
                title={`3D Tour ${index + 1}`}
                className="w-full h-full border-0"
                allowFullScreen
                allow="fullscreen"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProjectTemplate({
  title,
  description,
  images,
  videos,
  tours,
}: {
  title: string;
  description: string;
  images: string[];
  videos: string[];
  tours: string[];
}) {
  return (
    <div className="px-[var(--sectionPadding)] py-20 bg-[#050606]">
      <div className="max-w-[1500px] mx-auto">
        {/* PROJECT HEADER */}

        <section className="max-w-4xl">
          <h1 className="text-white text-4xl md:text-6xl font-bold">
            {title}
          </h1>

          <p className="text-[#B8BDC7] text-lg md:text-xl leading-relaxed mt-8">
            {description}
          </p>
        </section>

        {/* VIDEOS FIRST */}

        <VideoSection videos={videos} />

        {/* IMAGE SLIDER */}

        <ImageSection
          title={title}
          images={images}
        />

        {/* 3D TOURS */}

        <TourSection tours={tours} />
      </div>
    </div>
  );
}