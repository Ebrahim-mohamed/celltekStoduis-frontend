import Image from "next/image";
import Link from "next/link";

export function WhoBox({icon,head,pra,link}:{icon:string,head:string,pra:string,link:string}){
return <div className="rounded-[0.75rem] bg-[#1F1F1F] p-[1.5rem] flex flex-col gap-15 w-full">
    <Image src={`/home/icons/${icon}.svg`} alt="icon" width={100} height={100} className="w-[4.5rem] aspect-square"/>
    <div> 
        <p className="mb-[0.5rem] text-[1.5rem] font-bold text-[#E6E9EF]">{head}</p>
        <p className=" text-[1rem] font-bold text-[#B8BDC7]">{pra}</p>
    </div>
    <Link className="text-[#E6E9EF] text-[1rem] font-medium" href={`/services#${link}`}>Learn More</Link>
</div>
}