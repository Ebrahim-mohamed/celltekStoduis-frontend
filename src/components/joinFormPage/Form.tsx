"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../contact/Input";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(11, "Phone must be at least 11 characters"),
  userType: z.enum(["jop", "intern"]),
});

type FormData = z.infer<typeof formSchema>;

type Job = {
  _id: string;
  title: string;
};

export function Form() {
  const [userType, setUserType] = useState<"intern" | "jop">("intern");
  const [status, setStatus] = useState<null | "success" | "error">(null);
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);

  // EXACT SAME PATTERN for both
  const [selectedInternStatus, setSelectedInternStatus] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { userType: "intern" },
  });

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const res = await fetch("http://localhost:4002/api/jobs");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadJobs();
  }, []);

  const onSubmit = async (data: FormData) => {
    // VALIDATION LIKE JOB
    if (userType === "intern" && !selectedInternStatus) {
      setStatus("error");
      return;
    }

    if (userType === "jop" && !selectedPosition) {
      setStatus("error");
      return;
    }

    setLoading(true);
    setStatus(null);

    const payload =
      userType === "intern"
        ? {
            name: data.name,
            email: data.email,
            phone: data.phone,
            userType: "intern",
            internStatus: selectedInternStatus, // ✅ SAME LOGIC AS POSITION
          }
        : {
            name: data.name,
            email: data.email,
            phone: data.phone,
            userType: "jop",
            position: selectedPosition,
          };

    try {
      const res = await fetch("http://localhost:4002/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to submit form");

      setStatus("success");
      setSelectedInternStatus("");
      setSelectedPosition("");
      reset({ userType });
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[45%] max-[1100px]:w-[70%] max-[600px]:w-[90%]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-6 p-6"
      >
        <div>
          <p className="text-[0.8rem] text-[#FF383C] font-[350]">
            Join our team – {userType}
          </p>
          <p className="text-[2rem] text-white font-bold">Join us !</p>
        </div>

        <Input
          label="Full Name"
          placeholder="Your name..."
          error={errors.name?.message}
          {...register("name")}
        />

        <Input
          label="E-mail"
          placeholder="Your e-mail..."
          type="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Phone number"
          placeholder="phone..."
          error={errors.phone?.message}
          {...register("phone")}
        />

        {/* USER TYPE */}
        <div>
          <p className="text-white text-[1.2rem] font-normal mb-4">
            What are you applying for?
          </p>

          <div className="flex mb-4">
            <button
              type="button"
              className={`p-4 font-medium hover:cursor-pointer text-[1.25rem] flex-1 ${
                userType === "intern"
                  ? "text-black bg-white"
                  : "text-white bg-[#277FCD26]"
              }`}
              onClick={() => {
                setUserType("intern");
                setValue("userType", "intern");
              }}
            >
              Internship program
            </button>

            <button
              type="button"
              className={`p-4 font-medium text-[1.25rem] hover:cursor-pointer flex-1 ${
                userType === "jop"
                  ? "text-black bg-white"
                  : "text-white bg-[#277FCD26]"
              }`}
              onClick={() => {
                setUserType("jop");
                setValue("userType", "jop");
              }}
            >
              A job
            </button>
          </div>
        </div>

        {/* INTERNSHIP STATUS */}
        {userType === "intern" && (
          <div>
            <label className="text-white block mb-2">Internship Status</label>
            <select
              value={selectedInternStatus}
              onChange={(e) => setSelectedInternStatus(e.target.value)}
              className="w-full p-3 bg-[#277FCD26] text-white"
            >
              <option value="" className="text-black">
                Select status
              </option>
              <option value="graduate" className="text-black">
                Graduate
              </option>
              <option value="undergraduate" className="text-black">
                Undergraduate
              </option>
            </select>
          </div>
        )}

        {/* JOB POSITION */}
        {userType === "jop" && (
          <div>
            <label className="text-white block mb-2">Select Position</label>
            <select
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
              className="w-full p-3 bg-[#277FCD26] text-white"
            >
              <option value="" className="text-black">
                Select a position
              </option>
              {jobs.map((job) => (
                <option key={job._id} value={job.title} className="text-black">
                  {job.title}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-[#277FCD] text-white py-3 font-semibold disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Send Message"}
        </button>

        {status === "success" && (
          <p className="text-green-400 mt-2">Application sent successfully!</p>
        )}

        {status === "error" && (
          <p className="text-red-500 mt-2">
            Please complete all required selections.
          </p>
        )}
      </form>
    </div>
  );
}
