import Image from "next/image";
import Link from "next/link";

export function ProjectBox({
  img,
  title,  
  des,
  id,
  cat,
  name
}: {
  img: string;
  title: string;  
  des: string;
  id:number,
  cat: string;
  name:string;
}) {
  return (
    <div
      className={`  items-center justify-center max-[650px]:flex-col ${id%2==0?" flex-row-reverse  ":"  "} flex relative bg-[#1F1F1F]`}
    >
      <Image src={`/services/${img}.png`} alt="image" width={500} height={500} className="w-full"/>
      <div className="w-full  ">
        <div className="flex flex-col gap-[1.5rem] p-[5rem]">
<p className="text-[2.5rem] text-[#E6E9EF] font-bold">{title}</p>
<p className="text-[1rem] text-[#B8BDC7] font-normal">{des}</p>
      <Link
        href={`/projects/${name}`}
        className="text-[1rem] font-medium text-[#E6E9EF]"
        >View Project
      </Link>
        </div>
      </div>
    </div>
  );
}
