import Link from "next/link";
import { ReactNode } from "react";

export function Hero({
  title,
  pra,
  page,
}: {
  title: string | ReactNode;
  pra: string | ReactNode;
  page: string;
}) {
  return (
    <div
      className="relative p-[var(--section-padding)] w-dvw h-dvh flex items-center justify-center gap-4 text-white text-center flex-col bg-cover bg-no-repeat overflow-hidden"
      style={
        page !== "home"
          ? { backgroundImage: `url(/${page}/hero.webp)` }
          : undefined
      }
    >
      {/* Background video (home only) */}
      {page === "home" && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        >
          <source src="/ved.mp4" type="video/mp4" />
        </video>
      )}
      {/* Content */}
    <div className="text-[#E6E9EF] text-[0.8rem] py-2 px-4 rounded-full bg-[#212121]">
      What we do
    </div>
      <div className="relative z-10 font-black text-[4.75rem] max-[1200px]:text-[6.5rem] max-[600px]:text-[4.5rem] max-[900px]:text-[5.5rem] leading-[100%]">
        {title}
      </div>

      <div className="relative z-10 text-[1rem] text-[#B8BDC7] font-normal">{pra}</div>

    </div>
  );
}
