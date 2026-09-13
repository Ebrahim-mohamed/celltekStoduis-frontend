import { MostUsedHeader } from "../MostUsedHeader";
import { WhoBox } from "./WhoBox";

const whos=[
  {head:"Architectural Visualization",pra:"High-quality 3D visuals that highlight product details and brand identity.",link:"product",icon:"product",image:"concreteFlooring"},
  {head:"Creative & AI Studio",pra:"Animations and interactive walkthroughs for immersive, engaging experiences.",link:"ver",icon:"ver",image:"concreteFlooring"},
  {head:"Marketing",pra:"Creative assets built for presentations, branding, and marketing.",link:"concept",icon:"concept",image:"concreteFlooring"},
]
export function WhoSection() {
  return (
    <div
      className="flex items-start flex-col justify-between gap-10 p-[var(--sectionPadding)] max-[650px]:flex-col"
      id="first"
    >
      <MostUsedHeader smallText="What we do"  mainHeader={<p>  Premium <span className="text-[#5B8CFF]">solutions</span> crafted <br></br> around your vision </p>}  />
      <div className="grid grid-cols-3 max-[700px]:grid-cols-1 gap-10">
        {
          whos.map(who=><WhoBox head={who.head} img={who.image} icon={who.icon} link={who.link} pra={who.pra} key={who.icon} />)
        }
      </div>
    </div>
  );
}
