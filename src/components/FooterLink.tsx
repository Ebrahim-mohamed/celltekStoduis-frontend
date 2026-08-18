import Image from "next/image";
import Link from "next/link";

export function FooterLink({ name, to }: { name: string; to: string }) {
  if (name === "facebook" || name === "instagram" || name === "linkedin")
    return (
      <Link
        target="_blank"
        href={to}
        className="text-[#277FCD] text-[1.25rem] font-bold mb-4"
      >
        <Image
          alt={`${name} icon`}
          width={100}
          height={100}
          src={`/footer/${name}.svg`}
          className="w-12 aspect-square"
        />
      </Link>
    );
  if (name === "Find Us")
    return (
      <Link
        href={`/${to}`}
        className="text-[#277FCD] text-[1.25rem] font-bold mb-4 max-[800px]:mb-0"
      >
        {name}
      </Link>
    );
  return (
    <Link href={`/${to}`} className="text-white text-[1rem] font-[325]">
      {name}
    </Link>
  );
}
