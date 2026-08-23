import Link from "next/link";

export function EndSection() {
  return (
    <div className="p-24 bg-cover flex items-center flex-col justify-center gap-6 bg-no-repeat bg-[url('/contact/endSection.webp')] text-[2.25rem] font-black leading-[123%] text-white text-center">
      “We bring your vision to life”
       <Link
        href="/start-project"
        
        className="w-fit px-[1rem]  flex ml-[3rem] items-center justify-center text-[0.75rem] font-medium text-white rounded-[60rem] bg-[#365EBD] max-[750px]:text-[1.5rem]"
      >
        Start a project
      </Link>
    </div>
  );
}
