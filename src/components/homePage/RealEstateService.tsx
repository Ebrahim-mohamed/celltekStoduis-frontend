import { MostUsedHeader } from "../MostUsedHeader";

const features = [
  {
    title: "360 Tours",
    description: "Immersive virtual tours that let users explore properties from every angle.",
  },
  {
    title: "Renders",
    description: "High-quality architectural renders that bring spaces and concepts to life.",
  },
  {
    title: "Videos",
    description: "Cinematic property videos designed to showcase spaces and create impact.",
  },
  {
    title: "Web Development",
    description: "Modern real-estate websites built for performance, interaction, and conversion.",
  },
];

export function RealEstateService() {
  return (
    <section
      id="real-estate"
      className="bg-[#1F1F1F] p-[var(--sectionPadding)]"
    >
      <div className="mx-auto w-full max-w-[1600px]">
        <MostUsedHeader
          smallText="What we do"
          mainHeader={
            <p>
              Premium{" "}
              <span className="text-[#5B8CFF]">solutions</span> crafted
              <br />
              around your vision
            </p>
          }
        />

        {/* Main Service Box */}
        <div className="mt-10 overflow-hidden rounded-[1rem] border border-white/5 bg-[#151515] shadow-[0_8px_30px_rgba(255,255,255,0.06)]">
          
          {/* Top Section */}
          <div className="grid min-h-[28rem] grid-cols-2 max-[900px]:grid-cols-1">
            
            {/* Text Section */}
            <div className="flex flex-col justify-center p-[3rem] max-[600px]:p-[1.5rem]">
              <p className="mb-4 text-[2.25rem] font-bold leading-tight text-[#E6E9EF] max-[600px]:text-[1.75rem]">
                Interactive Real-Estate
                <br />
                <span className="text-[#5B8CFF]">Solutions</span>
              </p>

              <p className="max-w-[35rem] text-[1rem] font-medium leading-7 text-[#B8BDC7] ">
                We create complete digital experiences for real-estate
                projects, combining immersive 360 tours, architectural
                visualization, cinematic videos, and modern web development
                into one powerful solution.
              </p>

              <p className="mt-5 max-w-[35rem] text-[1rem] font-medium leading-7 text-[#B8BDC7]">
                From presenting a property to creating an interactive digital
                experience, every element is designed to make the project
                easier to explore, understand, and sell.
              </p>
            </div>

            {/* Video Section */}
            <div className="relative min-h-[28rem] overflow-hidden bg-black">
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src="https://res.cloudinary.com/dnevlp0j4/video/upload/v1787500484/YouCut_20260823_184923058_k6mbl9.mp4"
                autoPlay
                muted
                loop
                playsInline
              />

              {/* Video Overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#151515]/30 via-transparent to-transparent" />
            </div>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-4 border-t border-white/10 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`group relative min-h-[12rem] p-[2rem] transition-all duration-300 hover:bg-[#222222] ${
                  index !== features.length - 1
                    ? "border-r border-white/10 max-[1000px]:border-r-0 max-[1000px]:border-b max-[600px]:border-b"
                    : ""
                }`}
              >
                {/* Number */}
                <span className="mb-6 block text-[0.8rem] font-medium text-[#5B8CFF]">
                  0{index + 1}
                </span>

                {/* Feature Title */}
                <p className="text-[1.35rem] font-bold text-[#E6E9EF] transition-transform duration-300 group-hover:translate-x-1">
                  {feature.title}
                </p>

                {/* Feature Description */}
                <p className="mt-3 text-[0.9rem] font-medium leading-6 text-[#8F949E]">
                  {feature.description}
                </p>

                {/* Hover Line */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#5B8CFF] transition-all duration-300 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
