import { Form } from "./Form";
import { InformationBox } from "./InformationBox";

export function CommunicationSection() {
  return (
    <div
      className=" p-[10rem] bg-[#0A0A0A] flex items-center justify-center"
      id="first"
    >
      <div className="bg-[#1F1F1F] w-[100%]  flex gap-[3.5rem] items-start justify-between p-[2rem] rounded-[1.5rem] max-[900px]:flex-col max-[900px]:items-center ">

      <InformationBox />
      <Form />
      </div>
    </div>
  );
}
