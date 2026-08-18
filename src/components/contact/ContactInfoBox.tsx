import Image from "next/image";
import { ReactNode } from "react";

export function ContactInfoBox({
  icon,
  title,
  info,
}: {
  icon: string;
  title: string;
  info: string | ReactNode;
}) {
  return (
    <div className="flex flex-1 gap-[1rem] p-4">
      

      <Image
        alt="icon"
        width={100}
        height={100}
        src={`/contact/${icon}.svg`}
        className="w-[2rem] "
        />
        
      <div>

      <p className="text-[#B8BDC7] text-[1rem] font-[350]">{title}</p>
      <p className="text-white text-[1rem] font-[350]">{info}</p>
      </div>
    </div>
  );
}
