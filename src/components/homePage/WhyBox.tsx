export function WhyBox({head,pra}:{head:string,pra:string}){
    return <div className="p-8 bg-[#1F1F1F] rounded-[1.5rem] w-full">
        <p className="text-[2rem] mb-2 text-white font-bold">{head}</p>
        <p className="text-[1rem] text-[#E6E9EF] font-medium">{pra}</p>
    </div>
}