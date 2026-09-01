import { Hero } from "@/components/Hero";
import { ProjectBox } from "@/components/portfolioPage/ProjectBox";

type Project = {
  _id: string;
  title: string;
  description: string;
  images: string[];
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:4002";

async function getProjects(): Promise<Project[]> {
  const response = await fetch(
    `${API_URL}/api/projects`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  return response.json();
}

export default async function Portfolio() {
  const projects = await getProjects();

  return (
    <div>
      <Hero
        smallText="Selected Work"
        page="services"
        title={
          <p>
            <span className="text-[#5B8CFF]">
              Exceptional Work
            </span>{" "}
            Built
            <br />
            Around Your Vision
          </p>
        }
        pra="Discover projects that combine creativity, precision, and storytelling to bring ambitious visions to life."
      />

      <div className="px-[var(--sectionPadding)] py-16 bg-[#050606]">
        {projects.length === 0 ? (
          <p className="text-white text-center">
            No projects available.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectBox
                key={project._id}
                id={project._id}
                title={project.title}
                images={project.images}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}