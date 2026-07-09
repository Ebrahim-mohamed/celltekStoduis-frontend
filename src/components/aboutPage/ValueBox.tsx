import Image from "next/image";

export function ValueBox({ icon,title, pra }: { title: string; pra: string,icon:string }) {
  return (
    <div className="flex flex-col p-[1.5rem] max-[800px]:w-[80%] bg-[#1F1F1F] rounded-[0.75rem]">
        <Image
          alt={`${title} icon`}
          src={`/about/${icon}.svg`}
          width={100}
          height={100}
          className="w-[4rem] aspect-square mb-[4rem]"
        />
        <p className="text-[2rem] mb-[1rem] text-[#E6E9EF] font-bold">{title}</p>
      <div
        className="text-[#B8BDC7] text-[1rem] font-normal "
      >
        {pra}
      </div>
    </div>
  );
}
