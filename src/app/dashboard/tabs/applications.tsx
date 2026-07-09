"use client";

import { useEffect, useState } from "react";

type Applicant = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  position?: string;
  userType: "jop" | "intern";
  internStatus?: "graduate" | "undergraduate";
  createdAt: string;
};

export default function JobsTab() {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApplicants = async () => {
      try {
        const res = await fetch("http://localhost:4002/api/join");
        const data = await res.json();
        setApplicants(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadApplicants();
  }, []);

  const deleteApplicant = async (id: string) => {
    try {
      await fetch(`http://localhost:4002/api/join/${id}`, {
        method: "DELETE",
      });

      setApplicants(applicants.filter((app) => app._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-gray-500">Loading applications...</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Applications
      </h2>

      {applicants.length === 0 && (
        <p className="text-gray-500">No applications yet</p>
      )}

      <div className="space-y-4">
        {applicants.map((app) => (
          <div
            key={app._id}
            className="border rounded-lg shadow-sm p-4 bg-white dark:bg-gray-800"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {app.name}
              </h3>

              <div className="flex gap-4 items-center">
                <span className="text-xs text-gray-400 dark:text-gray-300">
                  {new Date(app.createdAt).toLocaleDateString()}
                </span>

                {/* DELETE BUTTON */}
                <button
                  onClick={() => deleteApplicant(app._id)}
                  className="text-red-600 hover:cursor-pointer text-sm"
                >
                  Delete
                </button>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mt-2">
              Email: {app.email}
            </p>

            <p className="text-gray-700 dark:text-gray-300">
              Phone: {app.phone}
            </p>

            <p className="mt-2 font-medium text-indigo-600">
              Type:{" "}
              {app.userType === "jop"
                ? "Job Application"
                : "Internship Application"}
            </p>

            {/* JOB APPLICATION */}
            {app.userType === "jop" && (
              <p className="text-gray-700 dark:text-gray-300">
                Position Applied:{" "}
                <span className="font-medium">
                  {app.position || "Not Selected"}
                </span>
              </p>
            )}

            {/* INTERNSHIP */}
            {app.userType === "intern" && (
              <p className="text-gray-700 dark:text-gray-300">
                Internship Status:{" "}
                <span className="font-medium">
                  {app.internStatus === "graduate"
                    ? "Graduate"
                    : app.internStatus === "undergraduate"
                      ? "Undergraduate"
                      : "Not Selected"}
                </span>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
