import { MostUsedHeader } from "../MostUsedHeader";
import { SectorBox } from "./SectorBox";
const sectors=[{img:"real",head:"Real Estate",pra:"Immersive visuals that help sell properties before they are built."},
    {img:"agen",head:"Agencies",pra:"Precise visualizations that communicate design."},
    {img:"arct",head:"Architecture",pra:"Immersive visuals that help sell properties before they are built."},
    {img:"productB",head:"Product Brands",pra:"Immersive visuals that help sell properties before they are built."},
]
export function SectorsSection(){
    return <div className="p-[var(--sectionPadding)] bg-[#0A0A0A] overflow-hidden items-start flex gap-[2rem] max-[700px]:flex-col">
        <MostUsedHeader isStart  smallText="Our Industries" mainHeader={<p className="text-[6.5rem] leading-[100%]">Sectors We <br></br> <span className="text-[#5B8CFF]">Empower</span></p>} />
        <div className="grid grid-cols-2 max-[700px]:grid-cols-1 gap-4 w-full">
            {sectors.map(sector=><SectorBox head={sector.head} pra={sector.pra} img={sector.img} key={sector.head} />)}
          </div>
    </div>
}