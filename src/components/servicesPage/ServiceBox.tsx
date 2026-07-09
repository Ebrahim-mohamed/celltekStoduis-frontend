import Image from "next/image";
import Link from "next/link";

export function ServiceBox({
  img,
  title,  
  des,
  id,
  cat,
  icon,
}: {
  img: string;
  title: string;  
  des: string;
  id:number,
  cat: string;
  icon:string
}) {
  return (
    <div
      className={`  items-center justify-center max-[650px]:flex-col ${id%2==0?" flex-row-reverse  ":"  "} flex relative bg-[#1F1F1F]`}
    >
      <Image src={`/services/${img}.png`} alt="image" width={500} height={500} className="w-full"/>
      <div className="w-full  ">
        <div className="flex flex-col gap-[1.5rem] p-[5rem]">

<Image src={`/services/${icon}.svg`} alt="icon" width={200} height={200} className="w-[4.5rem] aspect-square"  />
<p className="text-[2.5rem] text-[#E6E9EF] font-bold">{title}</p>
<p className="text-[1rem] text-[#B8BDC7] font-normal">{des}</p>
      <Link
        href={`/projects/${cat}`}
        className="text-[1rem] font-medium text-[#E6E9EF]"
        >View Projects
      </Link>
        </div>
      </div>
    </div>
  );
}
