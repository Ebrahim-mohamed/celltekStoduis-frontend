"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Testimonial = {
  _id: string;
  name: string;
  company: string;
  title: string;
  feedback: string;
  createdAt: string;
};

type TestimonialFormData = {
  name: string;
  company: string;
  title: string;
  feedback: string;
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
            Testimonial Form
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

export default function TestimonialsTab() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);

  const { register, handleSubmit, reset } = useForm<TestimonialFormData>();

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const res = await fetch("http://localhost:4002/api/testimonials");
        const data = await res.json();
        setTestimonials(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadTestimonials();
  }, []);

  const submitForm = async (data: TestimonialFormData) => {
    if (editing) {
      await fetch(`http://localhost:4002/api/testimonials/${editing._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      await fetch("http://localhost:4002/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }

    reset();
    setEditing(null);
    setOpen(false);

    // reload testimonials
    setLoading(true);
    const res = await fetch("http://localhost:4002/api/testimonials");
    const refreshed = await res.json();
    setTestimonials(refreshed);
    setLoading(false);
  };

  const deleteTestimonial = async (id: string) => {
    await fetch(`http://localhost:4002/api/testimonials/${id}`, {
      method: "DELETE",
    });
    setTestimonials(testimonials.filter((t) => t._id !== id));
  };

  const startEdit = (testimonial: Testimonial) => {
    setEditing(testimonial);
    reset({
      name: testimonial.name,
      company: testimonial.company,
      title: testimonial.title,
      feedback: testimonial.feedback,
    });
    setOpen(true);
  };

  if (loading) return <p className="text-gray-500">Loading testimonials...</p>;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Testimonials
        </h2>
        <button
          onClick={() => {
            reset();
            setEditing(null);
            setOpen(true);
          }}
          className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded shadow"
        >
          + Add Testimonial
        </button>
      </div>

      {/* EMPTY */}
      {testimonials.length === 0 && (
        <p className="text-gray-500">No testimonials yet</p>
      )}

      {/* LIST */}
      <div className="space-y-4">
        {testimonials.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg shadow-sm p-4 bg-white dark:bg-gray-800"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {item.title} – {item.company}
                </p>
              </div>
              <span className="text-xs text-gray-400 dark:text-gray-300">
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>

            <p className="mt-3 text-gray-700 dark:text-gray-300 italic">
              “{item.feedback}”
            </p>

            <div className="flex gap-3 mt-4 text-sm">
              <button
                onClick={() => startEdit(item)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTestimonial(item._id)}
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
        <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Name
          </label>
          <input
            {...register("name")}
            placeholder="Name"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          />

          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Title
          </label>
          <input
            {...register("title")}
            placeholder="Title"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          />

          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Company
          </label>
          <input
            {...register("company")}
            placeholder="Company"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          />

          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Feedback
          </label>
          <textarea
            {...register("feedback")}
            placeholder="Feedback"
            className="w-full px-4 py-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          />

          <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
            {editing ? "Update Testimonial" : "Add Testimonial"}
          </button>
        </form>
      </Modal>
    </div>
  );
}
