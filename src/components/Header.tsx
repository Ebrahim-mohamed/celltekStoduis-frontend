import Image from "next/image";
import { HeaderLink } from "./HeaderLink";
import Link from "next/link";
import { useState } from "react";

const links = [
  { name: "Home", to: "" },
  { name: "Services", to: "services" },
  { name: "Portfolio", to: "community" },
  { name: "About", to: "about" },
  // { name: "Subsidiary", to: "subsidiary" },
  { name: "Contact us", to: "contact" },
  { name: "Start a project", to: "start-project" },
];
export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  function toggle() {
    setIsOpen((pre) => !pre);
  }
  return (
    <div className="py-6 px-14 max-[600px]:px-6 flex items-center justify-center absolute top-0 left-0 w-full z-50 ">
      <div className="rounded-[624.9375rem] bg-black/40 backdrop-blur-[10.2px] flex px-4 py-2">

      <Link href={"/"}>
        <Image
          className="w-[12.9rem] aspect-69/16 mr-[3rem]"
          src="/logo.png"
          alt="logo"
          width={300}
          height={300}
          />
      </Link>
      <div className="flex gap-4 items-center max-[800px]:hidden">
        {links.map((l) => (
          <HeaderLink link={l.to} name={l.name} key={l.name} />
        ))}
      </div>
      <button
        className="hidden gap-8 items-center max-[800px]:flex  cursor-pointer"
        onClick={() => toggle()}
        >
        <img src="/menu.png" alt="menu icon" className="w-12 aspect-square" />
      </button>
      <div
        className={` ${isOpen ? " fixed top-0 left-0 w-full h-full bg-black z-50 items-center justify-center flex" : " hidden "}`}
        >
        <button onClick={() => toggle()}>
          <img
            src="/close.svg"
            alt="close icon"
            className="w-12 aspect-square absolute top-10 right-10"
            />
        </button>

        <div className={`flex flex-col justify-center gap-8 items-center `}>
          {links.map((l) => (
            <HeaderLink link={l.to} name={l.name} key={l.name} fun={toggle} />
          ))}
        </div>
      </div>
          </div>
    </div>
  );
}
