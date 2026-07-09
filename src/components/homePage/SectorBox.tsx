import Image from "next/image";

export function SectorBox({img,head,pra}:{img:string,head:string,pra:string}){
return <div className="p-[1.5rem] bg-[#1F1F1F] rounded-[0.75rem] flex flex-col gap-4">
    <div className="p-[0.75rem] bg-[#2D2D2D] rounded-full w-fit">
    <Image src={`/home/${img}.svg`}  alt="icon" width={100} height={100} className="w-[2.5rem] aspect-square" />
    </div>
    <p className="text-[2rem] text-[#E6E9EF] font-bold">{head}</p>
    <p className="text-[1rem] text-[#E6E9EF] font-normal">{pra}</p>
</div>
}