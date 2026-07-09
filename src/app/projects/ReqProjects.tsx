import { Hero } from "@/components/Hero";
import { ProjectTemplate } from "./ProjectTemplate";

type Project = {
  _id: string;
  title: string;
  client: string;
  images: string[];              // ← was: image: string
  serviceKind: string;
  category: string;
  duration: string;
  bua: number;
  scopeOfWork: string;
  budget: number;
  status: string;
  location: string;
};

const SERVICE_MAP: Record<string, string> = {
  "turnkey-projects": "Turnkey Projects",
  "protective-coating": "Protective Coating",
  "concrete-flooring": "Concrete Flooring",
};

async function getProjects() {
  const res = await fetch("http://localhost:4002/api/projects", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function ReqProject({ cat }: { cat: string }) {
  const projects: Project[] = await getProjects();

  const filteredProjects = projects.filter(
    (project) => project.serviceKind === SERVICE_MAP[cat]
  );

  return (
    <div>
      <Hero
        page="services"
        title={SERVICE_MAP[cat]}
        pra={`A Curated Selection of Our ${SERVICE_MAP[cat]} Project Landmarks`}
      />

      <div className="px-[var(--sectionPadding)] py-4 bg-[#050606]">
        {filteredProjects.map((project, index) => (
          <ProjectTemplate
            key={project._id}
            stat={project.status}
            bud={project.budget}
            num={index}
            title={project.title}
            client={project.client}
            category={project.category || "N/A"}
            duration={project.duration}
            bua={String(project.bua)}
            scop={project.scopeOfWork}
            location={project.location}
            images={project.images}        // ← pass full array
          />
        ))}
      </div>
    </div>
  );
}