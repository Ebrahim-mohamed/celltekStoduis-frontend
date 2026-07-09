"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* ================= TYPES ================= */
type NewsItem = {
  _id: string;
  image: string;
  date: string;
  headline: string;
  details: string;
  createdAt: string;
};

/* ================= SCHEMA ================= */
const newsSchema = z.object({
  headline: z.string().min(1, "Headline is required"),
  details: z.string().min(1, "Details are required"),
  date: z.string().min(1, "Date is required"),
  image: z.any().optional(),
});

type NewsForm = z.infer<typeof newsSchema>;

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
            News
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
export default function NewsTab() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<NewsForm>({
    resolver: zodResolver(newsSchema),
  });

  /* 🔒 LOAD NEWS */
  useEffect(() => {
    const loadNews = async () => {
      try {
        const res = await fetch("http://localhost:4002/api/news");
        if (!res.ok) throw new Error("Failed to fetch news");
        const data = await res.json();
        setNews(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadNews();
  }, []);

  /* ---------- SUBMIT ---------- */
  const onSubmit = async (data: NewsForm) => {
    const formData = new FormData();
    formData.append("headline", data.headline);
    formData.append("details", data.details);
    formData.append("date", data.date);
    if (data.image && (data.image as unknown as FileList)[0])
      formData.append("image", (data.image as unknown as FileList)[0]);

    if (editingNews) {
      // Edit
      const res = await fetch(
        `http://localhost:4002/api/news/${editingNews._id}`,
        {
          method: "PUT",
          body: formData,
        },
      );
      const updated = await res.json();
      setNews((prev) => prev.map((n) => (n._id === updated._id ? updated : n)));
    } else {
      // Add
      const res = await fetch("http://localhost:4002/api/news", {
        method: "POST",
        body: formData,
      });
      const newItem = await res.json();
      setNews((prev) => [newItem, ...prev]);
    }

    reset();
    setEditingNews(null);
    setOpen(false);
  };

  /* ---------- DELETE ---------- */
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this news item?")) return;
    await fetch(`http://localhost:4002/api/news/${id}`, {
      method: "DELETE",
    });
    setNews((prev) => prev.filter((n) => n._id !== id));
  };

  /* ---------- EDIT ---------- */
  const handleEdit = (item: NewsItem) => {
    setEditingNews(item);
    setValue("headline", item.headline);
    setValue("details", item.details);
    setValue("date", item.date.split("T")[0]); // format for input type date
    setOpen(true);
  };

  if (loading) return <p className="text-gray-500">Loading news...</p>;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          News
        </h2>
        <button
          onClick={() => {
            reset();
            setEditingNews(null);
            setOpen(true);
          }}
          className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded shadow"
        >
          + Add News
        </button>
      </div>

      {/* EMPTY */}
      {news.length === 0 && <p className="text-gray-500">No news found</p>}

      {/* LIST */}
      <div className="space-y-4">
        {news.map((item) => (
          <div
            key={item._id}
            className="flex flex-col md:flex-row border rounded-lg shadow-sm overflow-hidden bg-white dark:bg-gray-800"
          >
            <div className="w-full md:w-48 h-32 md:h-auto overflow-hidden flex-shrink-0">
              {item.image && (
                <img
                  src={`http://localhost:4002/uploads/${item.image}`}
                  alt={item.headline ?? "News Image"}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.headline}
                  </h3>
                  <span className="text-xs text-gray-400 dark:text-gray-300">
                    {new Date(item.date ?? item.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                  {item.details}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-4 mt-3">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
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
              Headline
            </label>
            <input
              {...register("headline")}
              placeholder="Headline"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            />
            {errors.headline && (
              <p className="text-red-600 text-sm">{errors.headline.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-gray-700 dark:text-white">
              Details
            </label>
            <textarea
              {...register("details")}
              placeholder="Details"
              className="w-full px-4 py-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            />
            {errors.details && (
              <p className="text-red-600 text-sm">{errors.details.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-gray-700 dark:text-white">
              Date
            </label>
            <input
              type="date"
              {...register("date")}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            />
            {errors.date && (
              <p className="text-red-600 text-sm">{errors.date.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-gray-700 dark:text-white">
              Image
            </label>
            <input
              type="file"
              {...register("image")}
              accept="image/*"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            />
            {errors.image && (
              <p className="text-red-600 text-sm">
                {errors.image.message?.toString()}
              </p>
            )}
          </div>

          <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
            {editingNews ? "Update News" : "Save News"}
          </button>
        </form>
      </Modal>
    </div>
  );
}
