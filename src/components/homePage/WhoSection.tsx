import { MostUsedHeader } from "../MostUsedHeader";
import { WhoBox } from "./WhoBox";

const whos=[{head:"Architectural Visualization",pra:"Photorealistic renders that bring architectural ideas to life.",link:"arc",icon:"arc"},
  {head:"Product Rendering",pra:"High-quality 3D visuals that highlight product details and brand identity.",link:"product",icon:"product"},
  {head:"Virtual Tours & Animation",pra:"Animations and interactive walkthroughs for immersive, engaging experiences.",link:"ver",icon:"ver"},
  {head:"Concept & Marketing Assets",pra:"Creative assets built for presentations, branding, and marketing.",link:"concept",icon:"concept"},
]
export function WhoSection() {
  return (
    <div
      className="flex items-start flex-col justify-between gap-10 p-[var(--sectionPadding)] max-[650px]:flex-col"
      id="first"
    >
      <MostUsedHeader smallText="What we do"  mainHeader={<p>  Premium <span className="text-[#5B8CFF]">solutions</span> crafted <br></br> around your vision </p>}  />
      <div className="grid grid-cols-4 max-[700px]:grid-cols-1 gap-10">
        {
          whos.map(who=><WhoBox head={who.head} icon={who.icon} link={who.link} pra={who.pra} key={who.icon} />)
        }
      </div>
    </div>
  );
}
