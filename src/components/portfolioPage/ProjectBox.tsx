import Link from "next/link";


export function ProjectBox({
  id,
  title,
  images,
}: {
  id: string;
  title: string;
  images: string[];
}) {
  const image =
    images && images.length > 0
      ? `/uploads/${images[0]}`
      : "";

  return (
    <Link
      href={`/projects/${id}`}
      className="relative block aspect-square overflow-hidden group bg-[#1F1F1F]"
    >
      {image ? (
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-white">
          No Image
        </div>
      )}

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/65 transition-all duration-300 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-6 text-center">
          <h2 className="text-white text-2xl md:text-3xl font-bold">
            {title}
          </h2>

          <p className="text-[#E6E9EF] mt-3">
            View Project
          </p>
        </div>
      </div>
    </Link>
  );
}