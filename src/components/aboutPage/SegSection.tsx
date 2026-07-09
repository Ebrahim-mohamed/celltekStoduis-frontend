import Image from "next/image";


export function SegSection() {
  return (
    <div className="p-[var(--sectionPadding)] gap-20 flex items-start justify-between bg-[#050606] max-[900px]:flex-col">
      <Image
        alt="Milestones image"
        src="/about/aboutSec.png"
        width={500}
        height={500}
        className="rounded-[1rem] w-full"
      />
      <div className="flex flex-col gap-8 w-full">
        <div className="flex flex-col  gap-4">
          <div className="rounded-full bg-[#212121] px-4 py-2 text-[1rem] text-[#E6E9EF] font-semibold w-fit">Statement</div>
          <p className="text-[1.75rem] text-white leading-[160%]">“At Celltek Studios, we believe every idea deserves to be seen before it is built, launched, or experienced. We combine architectural precision, creative storytelling, and advanced visualization technologies to transform concepts into immersive visual experiences.”</p>
          <p className="text-[#E6E9EF] text-[1rem] font-semibold">CEO Name of the ceo/s</p>
          <Image alt="celltek logo" src={`/about/cell.png`} width={200} height={200} className="w-[10rem]" />
        </div>
       
      </div>
      
    </div>
  );
}
