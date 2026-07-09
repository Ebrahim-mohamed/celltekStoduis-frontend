export function ProccesBox({number,head,pra}:{number:string,head:string,pra:string}){
return <div className=" flex flex-col items-center justify-center gap-4 text-[#E6E9EF] text-[2.5rem] ">
    <p className="text-white">{number}</p>
    <p>{head}</p>
    <p className="text-[1rem] text-center max-w-[10rem]">{pra}</p>
</div>
}