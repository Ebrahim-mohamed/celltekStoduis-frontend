import Link from "next/link";

export function ServiceBox({
  img,
  title,
  link,
}: {
  img: string;
  title: string;
  link: string;
}) {
  return (
    <Link
      href={`/${link}`}
      className="group relative flex min-h-[38rem] w-full flex-col justify-end overflow-hidden bg-cover bg-bottom bg-no-repeat p-6 text-white"
      style={{ backgroundImage: `url(/home/${img}.png)` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0  transition-all duration-300 group-hover:bg-[rgba(0,0,0,0.65)]" />

      {/* Arrow */}
      <div className="absolute top-2 right-4 z-10 text-[1.5rem] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
        &#x2197;
      </div>

      {/* Title - Hidden until hover */}
      <h1 className="relative z-10 translate-y-6 opacity-0 text-[3rem] font-[350] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        {title}
      </h1>
    </Link>
  );
}