"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Project = {
  _id: string;
  title: string;
  description: string;
  images: string[];
  videos: string[];
  tours: string[];
  createdAt: string;
};

const projectSchema = z.object({
  title: z.string().min(1, "Project title is required"),

  description: z
    .string()
    .min(1, "Project description is required"),

  images: z.any().optional(),

  videos: z.array(z.string()).max(4),

  tours: z.array(z.string()).max(3),
});

type ProjectForm = z.infer<typeof projectSchema>;

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4002";

const UPLOADS_URL = `${API_URL}/uploads/`;

function ImageSlider({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [current, setCurrent] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
        <span className="text-gray-400 text-sm">
          No image
        </span>
      </div>
    );
  }

  const previousImage = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();

    setCurrent((previous) =>
      previous === 0
        ? images.length - 1
        : previous - 1
    );
  };

  const nextImage = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();

    setCurrent((previous) =>
      previous === images.length - 1
        ? 0
        : previous + 1
    );
  };

  return (
    <div className="relative w-full h-full overflow-hidden group">
      <img
        src={`${UPLOADS_URL}${images[current]}`}
        alt={`${title} ${current + 1}`}
        className="w-full h-full object-cover"
      />

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={previousImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            ›
          </button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 text-white px-2 py-1 rounded text-xs">
            {current + 1}/{images.length}
          </div>
        </>
      )}
    </div>
  );
}

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
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Project
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-black dark:hover:text-white"
          >
            ×
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default function ProjectsTab() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [editingProject, setEditingProject] =
    useState<Project | null>(null);

  const [videoLinks, setVideoLinks] = useState<string[]>([]);
  const [tourLinks, setTourLinks] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectForm>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      videos: [],
      tours: [],
    },
  });

  const loadProjects = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/projects`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();

      setProjects(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const addVideoLink = () => {
    if (videoLinks.length >= 4) return;

    setVideoLinks((previous) => [
      ...previous,
      "",
    ]);
  };

  const removeVideoLink = (index: number) => {
    setVideoLinks((previous) =>
      previous.filter((_, currentIndex) => currentIndex !== index)
    );
  };

  const updateVideoLink = (
    index: number,
    value: string
  ) => {
    setVideoLinks((previous) =>
      previous.map((link, currentIndex) =>
        currentIndex === index ? value : link
      )
    );
  };

  const addTourLink = () => {
    if (tourLinks.length >= 3) return;

    setTourLinks((previous) => [
      ...previous,
      "",
    ]);
  };

  const removeTourLink = (index: number) => {
    setTourLinks((previous) =>
      previous.filter((_, currentIndex) => currentIndex !== index)
    );
  };

  const updateTourLink = (
    index: number,
    value: string
  ) => {
    setTourLinks((previous) =>
      previous.map((link, currentIndex) =>
        currentIndex === index ? value : link
      )
    );
  };

  const openCreateModal = () => {
    reset({
      title: "",
      description: "",
      videos: [],
      tours: [],
    });

    setVideoLinks([]);
    setTourLinks([]);
    setEditingProject(null);
    setOpen(true);
  };

  const handleEdit = (project: Project) => {
    reset({
      title: project.title,
      description: project.description,
      videos: project.videos || [],
      tours: project.tours || [],
    });

    setVideoLinks(project.videos || []);
    setTourLinks(project.tours || []);
    setEditingProject(project);
    setOpen(true);
  };

  const onSubmit = async (data: ProjectForm) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);

      formData.append(
        "description",
        data.description
      );

      const imageFiles =
        data.images as unknown as FileList;

      if (
        imageFiles &&
        imageFiles.length > 0
      ) {
        Array.from(imageFiles).forEach((file) => {
          formData.append("images", file);
        });
      }

      const validVideos = videoLinks.filter(
        (link) => link.trim().length > 0
      );

      const validTours = tourLinks.filter(
        (link) => link.trim().length > 0
      );

      formData.append(
        "videos",
        JSON.stringify(validVideos)
      );

      formData.append(
        "tours",
        JSON.stringify(validTours)
      );

      let response;

      if (editingProject) {
        response = await fetch(
          `${API_URL}/api/projects/${editingProject._id}`,
          {
            method: "PUT",
            body: formData,
          }
        );
      } else {
        response = await fetch(
          `${API_URL}/api/projects`,
          {
            method: "POST",
            body: formData,
          }
        );
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Failed to save project"
        );
      }

      await loadProjects();

      reset();
      setVideoLinks([]);
      setTourLinks([]);
      setEditingProject(null);
      setOpen(false);
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to save project"
      );
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${API_URL}/api/projects/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to delete project"
        );
      }

      setProjects((previous) =>
        previous.filter(
          (project) => project._id !== id
        )
      );
    } catch (error) {
      console.error(error);
      alert("Failed to delete project");
    }
  };

  if (loading) {
    return (
      <p className="text-gray-500">
        Loading projects...
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Projects
        </h2>

        <button
          type="button"
          onClick={openCreateModal}
          className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg"
        >
          + Add Project
        </button>
      </div>

      {projects.length === 0 && (
        <p className="text-gray-500">
          No projects found.
        </p>
      )}

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project._id}
            className="flex flex-col md:flex-row border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800"
          >
            <div className="w-full md:w-72 h-52 flex-shrink-0">
              <ImageSlider
                images={project.images}
                title={project.title}
              />
            </div>

            <div className="p-5 flex-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {project.title}
              </h3>

              <p className="mt-3 text-gray-600 dark:text-gray-300">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
                <span>
                  Images:{" "}
                  {project.images?.length || 0}
                </span>

                <span>
                  Videos:{" "}
                  {project.videos?.length || 0}/4
                </span>

                <span>
                  3D Tours:{" "}
                  {project.tours?.length || 0}/3
                </span>
              </div>

              <div className="flex gap-4 mt-5">
                <button
                  type="button"
                  onClick={() =>
                    handleEdit(project)
                  }
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(project._id)
                  }
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div>
            <label className="block mb-2 font-medium">
              Project Title
            </label>

            <input
              {...register("title")}
              placeholder="Project title"
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            />

            {errors.title && (
              <p className="text-red-600 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Project Description
            </label>

            <textarea
              {...register("description")}
              placeholder="Project description"
              rows={5}
              className="w-full px-4 py-2 border rounded-lg resize-none dark:bg-gray-700 dark:text-white"
            />

            {errors.description && (
              <p className="text-red-600 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Project Images
            </label>

            <input
              type="file"
              multiple
              accept="image/*"
              {...register("images")}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
            />

            {editingProject && (
              <p className="text-sm text-gray-500 mt-2">
                Current images:{" "}
                {editingProject.images.length}.
                Uploading new images will replace
                all current images.
              </p>
            )}
          </div>

          <div className="border-t pt-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold">
                  Cloudinary Video Links
                </h3>

                <p className="text-sm text-gray-500">
                  Optional — Maximum 4 videos
                </p>
              </div>

              {videoLinks.length < 4 && (
                <button
                  type="button"
                  onClick={addVideoLink}
                  className="px-3 py-1 bg-gray-900 text-white rounded"
                >
                  + Add Video
                </button>
              )}
            </div>

            <div className="space-y-3">
              {videoLinks.map(
                (video, index) => (
                  <div
                    key={index}
                    className="flex gap-2"
                  >
                    <input
                      type="url"
                      value={video}
                      onChange={(event) =>
                        updateVideoLink(
                          index,
                          event.target.value
                        )
                      }
                      placeholder="Cloudinary video URL"
                      className="flex-1 px-4 py-2 border rounded-lg dark:bg-gray-700"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeVideoLink(index)
                      }
                      className="px-3 py-2 text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="border-t pt-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold">
                  3D Tour Links
                </h3>

                <p className="text-sm text-gray-500">
                  Optional — Maximum 3 tours
                </p>
              </div>

              {tourLinks.length < 3 && (
                <button
                  type="button"
                  onClick={addTourLink}
                  className="px-3 py-1 bg-gray-900 text-white rounded"
                >
                  + Add Tour
                </button>
              )}
            </div>

            <div className="space-y-3">
              {tourLinks.map(
                (tour, index) => (
                  <div
                    key={index}
                    className="flex gap-2"
                  >
                    <input
                      type="url"
                      value={tour}
                      onChange={(event) =>
                        updateTourLink(
                          index,
                          event.target.value
                        )
                      }
                      placeholder="3D tour URL"
                      className="flex-1 px-4 py-2 border rounded-lg dark:bg-gray-700"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeTourLink(index)
                      }
                      className="px-3 py-2 text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                )
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg transition"
          >
            {editingProject
              ? "Update Project"
              : "Save Project"}
          </button>
        </form>
      </Modal>
    </div>
  );
}