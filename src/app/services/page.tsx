import { Hero } from "@/components/Hero";

import { ServiceBox } from "@/components/servicesPage/ServiceBox";
const services=[{img:"conceptBack",title:"Architectural Visualization",des:"Transform architectural concepts into immersive visual experiences that communicate design intent with clarity and emotion. From residential developments to commercial projects, our photorealistic renderings capture materials, lighting, atmosphere, and spatial relationships, helping stakeholders visualize the final outcome long before construction begins.",id:1,cat:"arc",icon:"arc"},
  {img:"conceptBack",title:"Product Rendering",des:"Showcase products with stunning realism and precision through high-end CGI visualization. Whether for product launches, advertising campaigns, e-commerce, or investor presentations, we create detailed visuals that highlight craftsmanship, materials, and design while eliminating the limitations of traditional photography.",id:2,cat:"product",icon:"product"},
  {img:"conceptBack",title:"Virtual Tours & Animation",des:"Bring ideas to life through dynamic animations and interactive virtual experiences. Our cinematic walkthroughs and immersive tours allow audiences to explore spaces, products, and environments from every angle, creating deeper engagement and a more compelling understanding of the design.",id:3,cat:"ver",icon:"ver"},
  {img:"conceptBack",title:"Concept & Marketing Assets",des:"Turn concepts into impactful visual stories designed to inspire action. We create marketing-focused assets that help brands, developers, and agencies communicate their vision through compelling imagery, campaign visuals, presentations, and promotional content tailored for both digital and print platforms.",id:4,cat:"concept",icon:"concept"},
]
export default function Services() {
  return (
    <div>
      <Hero
      smallText="What we do"
        page="services"
        title={<p>Premium <span className="text-[#5B8CFF]">solutions</span> crafted<br></br> around your vision</p>}
        pra={
          <span>
           From architectural visualization to immersive experiences, we transform ideas into compelling visual realities.
          </span>
        }
      />
      <div className="w-full">
        {
          services.map(serv=><ServiceBox cat={serv.cat} des={serv.des} icon={serv.icon} id={serv.id} img={serv.img} title={serv.title} key={serv.id} />)
        }
      </div>
    </div>
  );
}
