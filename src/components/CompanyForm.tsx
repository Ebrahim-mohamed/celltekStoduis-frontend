"use client";

import { useState } from "react";

export default function CompanyProfileForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return alert("Enter your email");

    try {
      setLoading(true);

      // 1️⃣ send email to backend
      await fetch("http://localhost:4002/api/company-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      // 2️⃣ download PDF
      const link = document.createElement("a");
      link.href = "http://localhost:4002/uploads/companyProfile.pdf";
      link.download = "CompanyProfile.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setEmail("");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex ">
      <input
        type="email"
        placeholder="Enter your email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border px-4 py-2  placeholder:text-[#697077] placeholder:text-[1rem] bg-white"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-[#277FCD] text-white p-2 cursor-pointer"
      >
        {loading ? "Downloading..." : "Download Company Profile"}
      </button>
    </form>
  );
}
