
import Image from "next/image";

export function AboutSection() {
  return (
    <section
      id="about"
      className="bg-[#000] px-[var(--sectionPadding)] py-[var(--sectionPadding)]"
    >
      <div className="grid grid-cols-2 items-center gap-16 max-[900px]:grid-cols-1">

        {/* Content */}
        <div className="flex flex-col justify-center">
          <p className="mb-4 text-[0.9rem] font-medium uppercase tracking-[0.15em] text-[#5B8CFF]">
            About us
          </p>

          <h2 className="max-w-[600px] text-[3rem] font-bold leading-tight text-[#E6E9EF] max-[600px]:text-[2rem]">
            We turn ideas into{" "}
            <span className="text-[#5B8CFF]">
              visual experiences.
            </span>
          </h2>

          <p className="mt-6 max-w-[600px] text-[1rem] font-medium leading-7 text-[#B8BDC7]">
            We are a creative studio combining design, technology, and
            innovation to create powerful digital experiences.
          </p>

          <p className="mt-4 max-w-[600px] text-[1rem] font-medium leading-7 text-[#B8BDC7]">
            From architectural visualization and 3D renders to immersive
            360 tours, cinematic videos, AI-powered content, and web
            development, we help brands bring their vision to life.
          </p>
        </div>

        {/* Image */}
        <div className="group relative min-h-[32rem] w-full overflow-hidden rounded-[1rem]">
          <Image
            src="/home/concreteFlooring.webp"
            alt="About us"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/10 transition-all duration-500 group-hover:bg-black/20" />
        </div>

      </div>
    </section>
  );
}