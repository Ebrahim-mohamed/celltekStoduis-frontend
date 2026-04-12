"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { MostTextPattern } from "../MostTextPattern";
import { ProjectBox } from "./ProjectBox";

type Project = {
  _id: string;
  title: string;
  images: string[];              // ← was: image: string
  location: string;
  bua: number;
  important: boolean;
  createdAt: string;
};

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentSlide, setCurrentSlide] = useState(1);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("https://api.egysmart.org/api/projects/important");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      }
    };
    fetchProjects();
  }, []);

  if (projects.length === 0) return null;

  return (
    <div
      className="p-[var(--sectionPadding)] bg-[#0A0A0A] overflow-hidden"
      id="projects"
    >
      <div className="mb-14 flex justify-between items-end gap-6 max-[600px]:flex-col max-[600px]:items-start">
        <MostTextPattern
          redText="OUR PORTFOLIO"
          whiteText="Signature"
          blueText="Developments"
          pra="Egy Smart provides comprehensive construction and renovation services, focusing on turn-key projects, specialized tasks, and cutting-edge engineering solutions."
        />

        <div className="flex items-end justify-center gap-4">
          <div className="text-white text-[1rem] font-medium">
            <span className="text-[1.5rem]">{currentSlide}</span> /
            <span>{projects.length}</span>
          </div>

          <div className="flex items-center gap-4">
            <button className="feedback-prev text-[#9EA8B7] w-[2rem] h-[2rem] rounded-full border border-[#9EA8B7] flex items-center justify-center hover:bg-[#277FCD] hover:text-white">
              &#x21D0;
            </button>
            <button className="feedback-next text-[#9EA8B7] w-[2rem] h-[2rem] rounded-full border border-[#9EA8B7] flex items-center justify-center hover:bg-[#277FCD] hover:text-white">
              &#x21D2;
            </button>
          </div>
        </div>
      </div>

      <Swiper
        modules={[Autoplay, Navigation]}
        loop
        slidesPerView={window.innerWidth <= 800 ? 1 : 1.4}
        speed={700}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        navigation={{ prevEl: ".feedback-prev", nextEl: ".feedback-next" }}
        onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex + 1)}
        className="overflow-visible projects-swiper"
      >
        {projects.map((project) => (
          <SwiperSlide key={project._id} className="transition-all duration-500">
            <div className="project-scale">
              <ProjectBox
                title={project.title}
                location={project.location || "N/A"}
                bue={`${project.bua.toLocaleString()} m²`}
                img={`https://api.egysmart.org/uploads/${project.images?.[0]}`}  // ← first image only
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}