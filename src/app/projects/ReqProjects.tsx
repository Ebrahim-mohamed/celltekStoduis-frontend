import { notFound } from "next/navigation";
import { ProjectTemplate } from "./ProjectTemplate";

type Project = {
  _id: string;
  title: string;
  description: string;
  images: string[];
  videos: string[];
  tours: string[];
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "";

async function getProject(
  id: string
): Promise<Project | null> {
  const response = await fetch(
    `${API_URL}/api/projects/${id}`,
    {
      cache: "no-store",
    }
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      "Failed to fetch project"
    );
  }

  return response.json();
}

export async function ReqProject({
  id,
}: {
  id: string;
}) {
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-[#050606] min-h-screen">
      <ProjectTemplate
        title={project.title}
        description={project.description}
        images={project.images}
        videos={project.videos || []}
        tours={project.tours || []}
      />
    </div>
  );
}