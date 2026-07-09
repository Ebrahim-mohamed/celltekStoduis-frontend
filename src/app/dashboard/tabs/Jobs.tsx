"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Job = {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
};

type JobFormData = {
  title: string;
  description: string;
};

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
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Job Form
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

export default function JobsTab() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const { register, handleSubmit, reset } = useForm<JobFormData>();

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const res = await fetch("http://localhost:4002/api/jobs");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  const submitJob = async (data: JobFormData) => {
    if (editingJob) {
      await fetch(`http://localhost:4002/api/jobs/${editingJob._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      await fetch("http://localhost:4002/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }

    reset();
    setOpen(false);
    setEditingJob(null);

    // Reload jobs
    setLoading(true);
    const res = await fetch("http://localhost:4002/api/jobs");
    const refreshed = await res.json();
    setJobs(refreshed);
    setLoading(false);
  };

  const deleteJob = async (id: string) => {
    await fetch(`http://localhost:4002/api/jobs/${id}`, {
      method: "DELETE",
    });
    setJobs(jobs.filter((j) => j._id !== id));
  };

  const startEdit = (job: Job) => {
    setEditingJob(job);
    reset({ title: job.title, description: job.description });
    setOpen(true);
  };

  if (loading) return <p className="text-gray-500">Loading jobs...</p>;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Jobs
        </h2>
        <button
          onClick={() => {
            reset();
            setEditingJob(null);
            setOpen(true);
          }}
          className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded shadow"
        >
          + Add Job
        </button>
      </div>

      {jobs.length === 0 && <p className="text-gray-500">No jobs available</p>}

      {/* LIST */}
      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="border rounded-lg shadow-sm p-4 bg-white dark:bg-gray-800"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {job.title}
              </h3>
              <span className="text-xs text-gray-400 dark:text-gray-300">
                {new Date(job.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              {job.description}
            </p>

            <div className="flex gap-3 mt-3 text-sm">
              <button
                onClick={() => startEdit(job)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => deleteJob(job._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit(submitJob)} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Job Title
          </label>
          <input
            {...register("title")}
            placeholder="Title"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          />

          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Description
          </label>
          <textarea
            {...register("description")}
            placeholder="Description"
            className="w-full px-4 py-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          />

          <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
            {editingJob ? "Update Job" : "Add Job"}
          </button>
        </form>
      </Modal>
    </div>
  );
}
