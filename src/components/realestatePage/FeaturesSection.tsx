import { FeatureShowcase } from "./FeatureShowcase";

const features = [
  {
    title: "360° Virtual Tours",
    description: "Immersive walkthroughs for any space.",
    videoUrl: "https://res.cloudinary.com/dnevlp0j4/video/upload/v1746619220/e4yxmvyomyylyhak9eas.mp4",
  },
  {
    title: "3D Floor Plans",
    description: "High-quality, top-down layouts for brochures and web.",
    videoUrl: "https://res.cloudinary.com/dnevlp0j4/video/upload/v1784468034/Story_3_lrnkhy.mp4",
  },
  {
    title: "Exterior & Interior CGI",
    description: "Photo realistic renders and videos for marketing materials.",
    videoUrl: "https://res.cloudinary.com/dnevlp0j4/video/upload/v1784468034/Story_3_lrnkhy.mp4",
  },
];

export function FeaturesSection() {
  return (
    <section className="w-full p-[var(--sectionPadding)]">
      {features.map((feature, index) => (
        <FeatureShowcase
          key={feature.title}
          title={feature.title}
          description={feature.description}
          videoUrl={feature.videoUrl}
          videoFirst={index % 2 === 1}
        />
      ))}
    </section>
  );
}