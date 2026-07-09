"use client";

import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* ================= TYPES ================= */
type ServiceKind =
  | "Turnkey Projects"
  | "Protective Coating"
  | "Concrete Flooring";

type Categories = "Residence" | "Commercial" | "Industries";

type Project = {
  _id: string;
  images: string[];
  serviceKind: ServiceKind;
  category: Categories;
  title: string;
  client: string;
  budget: number;
  status: "planned" | "in-progress" | "completed";
  duration: string;
  bua: number;
  scopeOfWork: string;
  location: string;
  important: boolean;
  createdAt: string;
};

/* ================= SCHEMA ================= */
const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  client: z.string().min(1, "Client name is required"),
  images: z.any().optional(),
  serviceKind: z.enum([
    "Turnkey Projects",
    "Protective Coating",
    "Concrete Flooring",
  ]),
  category: z.enum(["Residence", "Commercial", "Industries"]),
  budget: z.coerce.number().min(1, "Budget must be greater than 0"),
  status: z.enum(["planned", "in-progress", "completed"]),
  duration: z.string().min(1, "Duration required"),
  bua: z.coerce.number().min(1, "BUA must be greater than 0"),
  scopeOfWork: z.string().min(1, "Scope of work required"),
  location: z.string().min(3, "location required"),
});

type ProjectForm = z.infer<typeof projectSchema>;

/* ================= MINI IMAGE SLIDER ================= */
function ImageSlider({ images, title }: { images: string[]; title: string }) {
  const [current, setCurrent] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
        <span className="text-gray-400 text-xs">No image</span>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <img
        src={`http://localhost:4002/uploads/${images[0]}`}
        alt={title}
        className="w-full h-full object-cover"
      />
    );
  }

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
  };

  return (
    <div className="relative w-full h-full group overflow-hidden">
      {/* Image */}
      <img
        src={`http://localhost:4002/uploads/${images[current]}`}
        alt={`${title} ${current + 1}`}
        className="w-full h-full object-cover transition-opacity duration-300"
      />

      {/* Prev button */}
      <button
        onClick={prev}
        className="absolute left-1 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        ‹
      </button>

      {/* Next button */}
      <button
        onClick={next}
        className="absolute right-1 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              setCurrent(i);
            }}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              i === current ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="absolute top-1 right-1 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded">
        {current + 1}/{images.length}
      </div>
    </div>
  );
}

/* ================= MODAL ================= */
function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Project
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 dark:hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ================= TAB ================= */
export default function ProjectsTab() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<ProjectForm>({
    resolver: zodResolver(projectSchema),
  });

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await fetch("http://localhost:4002/api/projects");
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  /* ---------- TOGGLE IMPORTANT ---------- */
  const handleToggleImportant = async (id: string) => {
    try {
      const res = await fetch(
        `http://localhost:4002/api/projects/${id}/important`,
        { method: "PATCH" }
      );
      if (!res.ok) throw new Error("Failed to toggle important");
      const updated = await res.json();
      setProjects((prev) =>
        prev.map((p) => (p._id === updated._id ? updated : p))
      );
    } catch (err) {
      console.error(err);
    }
  };

  /* ---------- SUBMIT ---------- */
  const onSubmit = async (data: ProjectForm) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("client", data.client);

    const fileList = data.images as unknown as FileList;
    if (fileList && fileList.length > 0) {
      Array.from(fileList).forEach((file) => formData.append("images", file));
    }

    formData.append("serviceKind", data.serviceKind);
    formData.append("category", data.category);
    formData.append("budget", String(data.budget));
    formData.append("status", data.status);
    formData.append("location", data.location);
    formData.append("duration", data.duration);
    formData.append("bua", String(data.bua));
    formData.append("scopeOfWork", data.scopeOfWork);

    if (editingProject) {
      const res = await fetch(
        `http://localhost:4002/api/projects/${editingProject._id}`,
        { method: "PUT", body: formData }
      );
      const updated = await res.json();
      setProjects((prev) =>
        prev.map((p) => (p._id === updated._id ? updated : p))
      );
    } else {
      const res = await fetch("http://localhost:4002/api/projects", {
        method: "POST",
        body: formData,
      });
      const newProject = await res.json();
      setProjects((prev) => [newProject, ...prev]);
    }

    reset();
    setEditingProject(null);
    setOpen(false);
  };

  /* ---------- DELETE ---------- */
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    await fetch(`http://localhost:4002/api/projects/${id}`, {
      method: "DELETE",
    });
    setProjects((prev) => prev.filter((p) => p._id !== id));
  };

  /* ---------- EDIT ---------- */
  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setValue("title", project.title);
    setValue("client", project.client);
    setValue("serviceKind", project.serviceKind);
    setValue("category", project.category);
    setValue("budget", project.budget);
    setValue("status", project.status);
    setValue("duration", project.duration);
    setValue("bua", project.bua);
    setValue("scopeOfWork", project.scopeOfWork);
    setValue("location", project.location);
    setOpen(true);
  };

  if (loading) return <p className="text-gray-500">Loading projects...</p>;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Projects
        </h2>
        <button
          onClick={() => {
            reset();
            setEditingProject(null);
            setOpen(true);
          }}
          className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded shadow"
        >
          + Add Project
        </button>
      </div>

      {projects.length === 0 && (
        <p className="text-gray-500">No projects found</p>
      )}

      {/* LIST */}
      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project._id}
            className={`flex flex-col md:flex-row border rounded-lg shadow-sm overflow-hidden bg-white dark:bg-gray-800 transition-colors ${
              project.important
                ? "border-yellow-400 dark:border-yellow-500"
                : "border-gray-200 dark:border-gray-700"
            }`}
          >
            {/* ── IMAGE SLIDER THUMBNAIL ── */}
            <div className="w-full md:w-48 h-40 md:h-auto flex-shrink-0">
              <ImageSlider images={project.images} title={project.title} />
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {project.title ?? "Untitled"}
                    </h3>
                    {project.important && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-yellow-400 text-yellow-900 uppercase tracking-wide">
                        ★ Featured
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 dark:text-gray-300 whitespace-nowrap shrink-0">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-sm mt-1">
                  <b>Client:</b> {project.client}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                  {project.serviceKind ?? "N/A"}
                </p>
                <p className="text-sm mt-1">
                  <b>Category:</b> {project.category || "N/A"}
                </p>
                <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
                  <b>Images:</b> {project.images?.length ?? 0}
                </p>

                <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-700 dark:text-gray-300">
                  <span>
                    <b>Budget:</b>{" "}
                    {project.budget != null
                      ? Number(project.budget).toLocaleString()
                      : 0}{" "}
                    M EGP
                  </span>
                  <span>
                    <b>Status:</b> {project.status ?? "N/A"}
                  </span>
                  <span>
                    <b>Duration:</b> {project.duration ?? "N/A"} m
                  </span>
                  <span>
                    <b>BUA:</b>{" "}
                    {project.bua != null
                      ? Number(project.bua).toLocaleString()
                      : 0}{" "}
                    m²
                  </span>
                </div>

                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                  <b>Location:</b> {project.location ?? "N/A"}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                  <b>Scope:</b> {project.scopeOfWork ?? "N/A"}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-4 mt-3 items-center flex-wrap">
                <button
                  onClick={() => handleToggleImportant(project._id)}
                  className={`text-sm font-medium px-3 py-1 rounded border transition-colors ${
                    project.important
                      ? "border-yellow-400 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400 dark:hover:bg-yellow-900/40"
                      : "border-gray-300 text-gray-600 hover:border-yellow-400 hover:text-yellow-600 dark:border-gray-600 dark:text-gray-400 dark:hover:border-yellow-500 dark:hover:text-yellow-400"
                  }`}
                >
                  {project.important
                    ? "★ Remove from Slider"
                    : "☆ Add to Slider"}
                </button>

                <button
                  onClick={() => handleEdit(project)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-700 dark:text-white">
              Project Title
            </label>
            <input
              {...register("title")}
              placeholder="Project Title"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            />
            {errors.title && (
              <p className="text-red-600 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-gray-700 dark:text-white">
              Client Name
            </label>
            <input
              {...register("client")}
              placeholder="Client Name"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            />
            {errors.client && (
              <p className="text-red-600 text-sm">{errors.client.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-gray-700 dark:text-white">
              Location
            </label>
            <input
              {...register("location")}
              placeholder="Location"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            />
            {errors.location && (
              <p className="text-red-600 text-sm">{errors.location?.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-gray-700 dark:text-white">
              Project Images{" "}
              <span className="text-gray-400 text-xs">(select multiple)</span>
            </label>
            <input
              type="file"
              multiple
              {...register("images")}
              accept="image/*"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            />
            {editingProject && (
              <p className="text-xs text-gray-400 mt-1">
                Currently has {editingProject.images?.length ?? 0} image(s).
                Selecting new files will replace them all.
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-gray-700 dark:text-white">
              Service Kind
            </label>
            <select
              {...register("serviceKind")}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="Turnkey Projects">Turnkey Projects</option>
              <option value="Protective Coating">Protective Coating</option>
              <option value="Concrete Flooring">Concrete Flooring</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-gray-700 dark:text-white">
              Category
            </label>
            <select
              {...register("category")}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="Residence">Residence</option>
              <option value="Commercial">Commercial</option>
              <option value="Industries">Industries</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-gray-700 dark:text-white">
              Budget
            </label>
            <input
              type="number"
              {...register("budget")}
              placeholder="Budget"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            />
            {errors.budget && (
              <p className="text-red-600 text-sm">{errors.budget.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-gray-700 dark:text-white">
              Status
            </label>
            <select
              {...register("status")}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="planned">Planned</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-gray-700 dark:text-white">
              Duration
            </label>
            <input
              {...register("duration")}
              placeholder="Duration"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            />
            {errors.duration && (
              <p className="text-red-600 text-sm">{errors.duration.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-gray-700 dark:text-white">
              BUA (m²)
            </label>
            <input
              type="number"
              {...register("bua")}
              placeholder="BUA"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            />
            {errors.bua && (
              <p className="text-red-600 text-sm">{errors.bua.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-gray-700 dark:text-white">
              Scope of Work
            </label>
            <textarea
              {...register("scopeOfWork")}
              placeholder="Scope of Work"
              className="w-full px-4 py-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            />
            {errors.scopeOfWork && (
              <p className="text-red-600 text-sm">
                {errors.scopeOfWork.message}
              </p>
            )}
          </div>

          <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
            {editingProject ? "Update Project" : "Save Project"}
          </button>
        </form>
      </Modal>
    </div>
  );
}