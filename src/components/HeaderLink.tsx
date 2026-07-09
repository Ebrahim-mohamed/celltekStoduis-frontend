import Link from "next/link";
import { usePathname } from "next/navigation";

export function HeaderLink({
  name,
  link,
  fun,
}: {
  name: string;
  link: string;
  fun?: () => void;
}) {
  const path = usePathname();

  if (link === "start-project")
    return (
      <Link
        href="/start-project"
        onClick={fun}
        className="px-[0.75rem] py-[0.5rem] flex ml-[3rem] items-center justify-center text-[0.75rem] font-medium text-white rounded-[60rem] bg-[#365EBD] max-[750px]:text-[1.5rem]"
      >
        {name}
      </Link>
    );

  return (
    <Link
      href={`/${link}`}
      onClick={fun}
      className={`text-[1rem] max-[750px]:text-[1.5rem] text-[#B8BDC7] hover:text-white duration-75 ${
        path.includes(link) && name !== "Home" ? "font-bold" : "font-light"
      }`}
    >
      {name}
    </Link>
  );
}
