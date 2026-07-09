"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./Input";

/* ======================
   ZOD SCHEMA
====================== */
const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  userType: z.enum(["client", "supplier"]),
});

type FormData = z.infer<typeof formSchema>;

/* ======================
   FORM COMPONENT
====================== */
export function Form() {
  const [userType, setUserType] = useState<"client" | "supplier">("client");
  const [status, setStatus] = useState<null | "success" | "error">(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { userType: "client" },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4002/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit form");

      setStatus("success");
      reset({ ...data, message: "" }); // keep userType selected
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[45%] max-[900px]:w-[70%] max-[600px]:w-[90%] ">
      {/* User Type Toggle */}
      <div className="flex mb-4">
        <button
          type="button"
          className={`p-4 font-medium text-[1.25rem] ${
            userType === "client"
              ? "text-black bg-white"
              : "text-white bg-[#277FCD26]"
          }`}
          onClick={() => {
            setUserType("client");
            setValue("userType", "client");
          }}
        >
          I am a Client
        </button>

        <button
          type="button"
          className={`p-4 font-medium text-[1.25rem] ${
            userType === "supplier"
              ? "text-black bg-white"
              : "text-white bg-[#277FCD26]"
          }`}
          onClick={() => {
            setUserType("supplier");
            setValue("userType", "supplier");
          }}
        >
          I am a Supplier
        </button>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-6 p-6"
      >
        <div>
          <p className="text-[0.8rem] text-[#FF383C] font-[350]">
            Contact Us – {userType}
          </p>
          <p className="text-[2rem] text-white font-bold">Get In Touch</p>
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
          label="Subject"
          placeholder="Title..."
          error={errors.subject?.message}
          {...register("subject")}
        />

        <Input
          label="Message"
          placeholder="Your message..."
          isTextArea
          error={errors.message?.message}
          {...register("message")}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-[#277FCD] text-white py-3 font-semibold disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Submitting..." : "Send Message"}
        </button>

        {status === "success" && (
          <p className="text-green-400 mt-2">Message sent successfully!</p>
        )}
        {status === "error" && (
          <p className="text-red-500 mt-2">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
  );
}
