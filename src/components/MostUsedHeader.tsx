import { ReactNode } from "react";

export function MostUsedHeader({smallText,mainHeader,isStart}:{smallText:string,mainHeader:ReactNode,isStart?:boolean}){
return <div className={`flex ${isStart?" items-start ":" items-center "} flex-col  justify-center gap-4 w-full justify-center mb-[3rem]`}>
    <div className=" py-2 px-4 text-[0.8rem] text-[#E6E9EF] bg-[#212121] rounded-full">{smallText}</div>
    <div className={`text-[4.75rem] text-white ${!isStart&&" text-center "} leading-[100%]`}>
        {mainHeader}
    </div>
</div>
}