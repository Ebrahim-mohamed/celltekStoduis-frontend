import { Hero } from "@/components/Hero";
import { ProjectTemplate } from "./ProjectTemplate";

type Project = {
  _id: string;
  title: string;
  des:string;
  client: string;
  images: string[];
  vedios:string[];
  tour:string
};

const projects: Project[] = [
  {
    _id: "1",
    title: "Project One",
    des: "Description of project one",
    client: "Client One",
    images: [
      "/images/project-1-1.jpg",
      "/images/project-1-2.jpg",
    ],
    vedios: [
      "/videos/project-1.mp4",
    ],
    tour: "/tours/project-1",
  },
  {
    _id: "2",
    title: "Project Two",
    des: "Description of project two",
    client: "Client Two",
    images: [
      "/images/project-2-1.jpg",
      "/images/project-2-2.jpg",
    ],
    vedios: [
      "/videos/project-2.mp4",
    ],
    tour: "/tours/project-2",
  },
  {
    _id: "3",
    title: "Project Three",
    des: "Description of project three",
    client: "Client Three",
    images: [
      "/images/project-3-1.jpg",
      "/images/project-3-2.jpg",
    ],
    vedios: [
      "/videos/project-3.mp4",
    ],
    tour: "/tours/project-3",
  },
  {
    _id: "4",
    title: "Project Four",
    des: "Description of project four",
    client: "Client Four",
    images: [
      "/images/project-4-1.jpg",
      "/images/project-4-2.jpg",
    ],
    vedios: [
      "/videos/project-4.mp4",
    ],
    tour: "/tours/project-4",
  },
];

// async function getProjects() {
//   const res = await fetch("http://localhost:4002/api/projects", {
//     cache: "no-store",
//   });
//   if (!res.ok) throw new Error("Failed to fetch projects");
//   return res.json();
// }

export async function ReqProject({ cat }: { cat: string }) {
  // const projects: Project[] = await getProjects();



  return (
    <div>
      <div className="px-[var(--sectionPadding)] py-4 bg-[#050606]">
        {projects.map((project, index) => (
          <ProjectTemplate
            key={project._id}
            description={project.des}
            vedios={project.vedios}
            tour={project.tour}
            num={index}
            title={project.title}
            client={project.client}
            images={project.images}        // ← pass full array
          />
        ))}
      </div>
    </div>
  );
}