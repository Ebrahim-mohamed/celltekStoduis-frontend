import { MostUsedHeader } from "../MostUsedHeader";
import { ProccesBox } from "./ProccesBox";
const proccess=[{number:"01",head:"Brief",pra:"Understanding the Vision"},
    {number:"02",head:"Delivery",pra:"Ready for Presentation & Impact"},
    {number:"03",head:"Review",pra:"Refinement Through Collaboration"},
    {number:"04",head:"Visualize",pra:"Crafting Photo Realistic Experiences"},
    {number:"05",head:"Concept",pra:"Shaping the Visual Narrative"},
]
export function ProccesSection(){
    return <div className="p-[var(--sectionPadding)] bg-[#0A0A0A] overflow-hidden">
        <MostUsedHeader smallText="Our Process" mainHeader={<p>From Vision to <span className="text-[#5B8CFF]">Cinematic Reality</span></p>} />
        <div className="grid grid-cols-5 max-[1000px]:grid-cols-3 max-[700px]:grid-cols-1 gap-8  w-full ">
            {proccess.map(pro=><ProccesBox head={pro.head} number={pro.number} pra={pro.pra} key={pro.number} />)}
        </div>
    </div>
}