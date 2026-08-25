import Image from "next/image";
import { FooterLink } from "./FooterLink";
import Link from "next/link";
import CompanyProfileForm from "./CompanyForm";

const firstLinks = [
  { link: "Home", to: "/" },
  { link: "About Us", to: "about" },
  { link: "Services", to: "services" },
  { link: "Portfolio", to: "portfolio" },
  { link: "Contact Us", to: "contact" },
];
const secLinks = [
  { link: "Terms & Conditions", to: "terms" },
  { link: "Privacy Policy", to: "privacy" },
];
const thirdLinks = [{ link: "Find Us", to: "contact" }];
const social = [
  { link: "facebook", to: "https://www.facebook.com/celltekstudios" },
  {
    link: "instagram",
    to: "https://www.instagram.com/celltekstudios/",
  },
  {
    link: "linkedin",
    to: "www.linkedin.com/company/celltekstudios",
  },
];
export function Footer() {
  return (
    <div className="p-20 pb-0 max-[600px]:px-12 flex flex-col gap-12 bg-[#0A0A0A] ">
      <div className="flex items-center justify-between gap-6 max-[500px]:flex-col max-[500px]:items-start">
        <Link href="/" className="w-fit">
          <Image
            className="w-[12.9rem] "
            src="/logo.png"
            alt="logo"
            width={300}
            height={300}
            />
        </Link>
        {/* <CompanyProfileForm /> */}
      </div>
      <div>
        <div className="flex flex-col gap-10">
          <div className="flex items-start justify-between  w-full max-[800px]:flex-col max-[800px]:gap-4 ">
            <p className="text-[1rem] font-[325] text-white max-[800px]:mb-6 max-w-[30rem]">
           We transform ideas into immersive visual experiences that bring spaces and products to life before they exist. From Architectural Visualization and Product Rendering to Visual Tours, Animation, and Concept & Marketing Assets, we create photorealistic visuals that communicate your vision, elevate your brand, and help your audience see the final result before it becomes reality.

            </p>
            <div className="flex flex-col items-start justify-center gap-6 max-[800px]:gap-4">
              {firstLinks.map((link) => (
                <FooterLink name={link.link} to={link.to} key={link.to} />
              ))}
            </div>
            
            <div className="flex flex-col items-start justify-center gap-2 max-[800px]:gap-4">
              <p className="text-[#277FCD] text-[1.25rem] font-bold mb-4">Find Us</p>
              <div className="flex items-center justify-center gap-6">
                {social.map((link) => (
                  <FooterLink name={link.link} to={link.to} key={link.link} />
                ))}
              </div>
              <div className="flex flex-col items-start justify-center gap-2 max-[800px]:gap-4">
              {secLinks.map((link) => (
                <FooterLink name={link.link} to={link.to} key={link.to} />
              ))}
            </div>
            </div>
          </div>
        </div>
        <p className="text-[1rem] font-[325] text-[#BBC4D1]">
          ©2026 Celltek Studios. All rights reserved.
        </p>
      </div>
<Image alt="footer" width={700} height={700} className="w-full" src="/foot.png" />
    </div>
  );
}
