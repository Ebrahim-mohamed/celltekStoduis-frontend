import Image from "next/image";
import Link from "next/link";

export function WhoBox({
  icon,
  head,
  pra,
  link,
  img,
}: {
  icon: string;
  head: string;
  pra: string;
  link: string;
  img: string;
}) {
  return (
    <div className="group relative min-h-[22rem] w-full overflow-hidden rounded-[0.75rem]">
      {/* Background Image */}
      <Image
        src={`/home/${img}.webp`}
        alt={head}
        fill
        className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:blur-[6px]"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45 transition-all duration-500 group-hover:bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-[1.5rem]">
        <Image
          src={`/home/icons/${icon}.svg`}
          alt="icon"
          width={100}
          height={100}
          className="aspect-square w-[4.5rem]"
        />

        <div>
          <p className="mb-[0.5rem] text-[1.5rem] font-bold text-[#E6E9EF]">
            {head}
          </p>

          <p className="text-[1rem] font-bold text-[#B8BDC7]">
            {pra}
          </p>

          <Link
            className="mt-5 inline-block text-[1rem] font-medium text-[#E6E9EF]"
            href={`/services#${link}`}
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
