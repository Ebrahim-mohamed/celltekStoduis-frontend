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

  country: z.string().min(2, "Country is required"),

  phone: z.string().min(6, "Phone is required"),

  budget: z.string().optional(),

  industry: z.string().optional(),

  email: z.string().email("Invalid email address"),

  message: z.string().optional(),

  userType: z.enum(["client", "supplier"]),
});

type FormData = z.infer<typeof formSchema>;

/* ======================
   FORM COMPONENT
====================== */

export function Form() {
  const [status, setStatus] = useState<null | "success" | "error">(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      name: "",
      country: "",
      phone: "",
      budget: "",
      industry: "",
      email: "",
      message: "",
      userType: "client",
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to submit form");
      }

      setStatus("success");

      reset({
        name: "",
        country: "",
        phone: "",
        budget: "",
        industry: "",
        email: "",
        message: "",
        userType: "client",
      });
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[60%] max-[900px]:w-[70%] max-[600px]:w-[90%]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-6 p-6"
      >
        {/* NAME + EMAIL */}
        <div className="flex gap-[1rem] items-center justify-center w-full">
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
        </div>

        {/* PHONE + COUNTRY */}
        <div className="flex gap-[1rem] items-center justify-center w-full">
          <Input
            label="Phone"
            placeholder="Your phone number..."
            type="tel"
            error={errors.phone?.message}
            {...register("phone")}
          />

          <Input
            label="Country"
            placeholder="Your country..."
            error={errors.country?.message}
            {...register("country")}
          />
        </div>

        {/* INDUSTRY + BUDGET */}
        <div className="flex gap-[1rem] items-center justify-center w-full">
          <Input
            label="Industry (Optional)"
            placeholder="Industry"
            error={errors.industry?.message}
            {...register("industry")}
          />

          <Input
            label="Budget Range (Optional)"
            placeholder="Budget Range"
            error={errors.budget?.message}
            {...register("budget")}
          />
        </div>

        {/* MESSAGE */}
        <Input
          label="Tell us about your project (Optional)"
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
          <p className="text-green-400 mt-2">
            Message sent successfully!
          </p>
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