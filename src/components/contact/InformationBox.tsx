import { ContactInfoBox } from "./ContactInfoBox";

export function InformationBox() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-white text-[4rem] font-[600] ">
          Get In Touch
        </h1>
        <p className="text-[1rem] leading-[160%] font-normal text-[#C9C9C9]">
          Have a project in mind? Whether it’s architectural <br></br> visualization or product rendering our team is ready to bring<br></br> your vision to life.
        </p>
      </div>
      <div className="flex flex-col items-start">
        <ContactInfoBox
          icon="location"
          title="Location"
          info="Celltek Studios"
        />
          <ContactInfoBox
          icon="email"
          title="Email Address"
          info="hello@celltekstudios.com"
        />
        <ContactInfoBox
          icon="phone"
          title="Phone"
          info="+20 XXX XXX XXXX"
        />
      </div>

      
    </div>
  );
}
