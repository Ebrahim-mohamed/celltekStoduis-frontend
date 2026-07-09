"use client";

import { useEffect, useState } from "react";

import { JobBox } from "./JobBox";

type Job = {
  _id: string;
  title: string;
  description: string;
};

export function JobsSection() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:4002/api/jobs", {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch jobs");

        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div
      className="p-[var(--sectionPadding)] bg-cover bg-no-repeat bg-[url('/community/communityBg.webp')] flex flex-col items-center justify-center gap-6"
      id="first"
    >

      {loading ? (
        <p className="text-white">Loading jobs...</p>
      ) : (
        <div className="flex flex-wrap gap-4 items-start justify-center">
          {jobs.map((job) => (
            <JobBox
              key={job._id}
              title={job.title}
              description={job.description}
            />
          ))}
        </div>
      )}
    </div>
  );
}
