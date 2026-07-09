"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type CompanyProfileRequest = {
  _id: string;
  email: string;
  createdAt: string;
};

export default function CompanyProfileTab() {
  const [items, setItems] = useState<CompanyProfileRequest[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:4002/api/company-profile");
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ================= DELETE ================= */
  const deleteItem = async (id: string) => {
    try {
      await fetch(`http://localhost:4002/api/company-profile/${id}`, {
        method: "DELETE",
      });
      setItems((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return <p className="text-gray-500">Loading company profile requests...</p>;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Company Profile Downloads
        </h2>
      </div>

      {/* EMPTY */}
      {items.length === 0 && (
        <p className="text-gray-500">No company profile requests found</p>
      )}

      {/* LIST */}
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg shadow-sm p-4 bg-white dark:bg-gray-800"
          >
            <div className="flex items-center justify-between">
              {/* LEFT */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {item.email}
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Downloaded Company Profile
                </p>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-400">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteItem(item._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
