"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* ================= TYPES ================= */
type Logo = {
  _id: string;
  image: string;
  createdAt: string;
};

/* ================= SCHEMA ================= */
const logoSchema = z.object({
  image: z
    .any()
    .refine((files) => files?.length === 1, "Logo image is required"),
});

type LogoForm = z.infer<typeof logoSchema>;

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
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Partner Logo
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
export default function LogosTab() {
  const [logos, setLogos] = useState<Logo[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LogoForm>({
    resolver: zodResolver(logoSchema),
  });

  /* ---------- LOAD LOGOS ---------- */
  useEffect(() => {
    const loadLogos = async () => {
      try {
        const res = await fetch("http://localhost:4002/api/logos");
        const data = await res.json();
        setLogos(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadLogos();
  }, []);

  /* ---------- SUBMIT ---------- */
  const onSubmit = async (data: LogoForm) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    const res = await fetch("http://localhost:4002/api/logos", {
      method: "POST",
      body: formData,
    });

    const newLogo = await res.json();
    setLogos((prev) => [newLogo, ...prev]);

    reset();
    setOpen(false);
  };

  /* ---------- DELETE ---------- */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this logo?")) return;

    await fetch(`http://localhost:4002/api/logos/${id}`, {
      method: "DELETE",
    });

    setLogos((prev) => prev.filter((l) => l._id !== id));
  };

  if (loading) return <p className="text-gray-500">Loading logos...</p>;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Partners Logos
        </h2>
        <button
          onClick={() => {
            reset();
            setOpen(true);
          }}
          className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded shadow"
        >
          + Add Logo
        </button>
      </div>

      {/* EMPTY */}
      {logos.length === 0 && (
        <p className="text-gray-500">No logos uploaded yet</p>
      )}

      {/* LOGOS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {logos.map((logo) => (
          <div
            key={logo._id}
            className="border bg-black rounded-lg p-4  dark:bg-gray-800 shadow-sm flex flex-col items-center justify-between"
          >
            <img
              src={`http://localhost:4002/uploads/${logo.image}`}
              alt="Partner Logo"
              className="h-20 object-contain mb-3"
            />

            <span className="text-xs text-gray-400 mb-2">
              {new Date(logo.createdAt).toLocaleDateString()}
            </span>

            <button
              onClick={() => handleDelete(logo._id)}
              className="text-sm text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-700 dark:text-white">
              Logo Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
            />
            {errors.image && (
              <p className="text-red-600 text-sm">
                {errors.image.message?.toString()}
              </p>
            )}
          </div>

          <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
            Save Logo
          </button>
        </form>
      </Modal>
    </div>
  );
}
