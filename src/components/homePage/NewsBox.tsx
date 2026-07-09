export function NewsBox({
  title,
  pra,
  his,
  img,
}: {
  title: string;
  pra: string;
  his: string;
  img: string;
}) {
  return (
    <div
      className="flex flex-col justify-end gap-4 min-h-144 p-8 bg-cover bg-no-repeat bg-center text-white border border-white max-w-232 rounded-3xl relative overflow-hidden"
      style={{
        backgroundImage: `url(http://localhost:4002/uploads/${img})`,
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-[#00000060]"></div>
      <div className="z-100 bg-[#00000080] rounded-2xl p-8">
        <div className="py-2 px-6 bg-[#FF383C] text-[1.25rem] font-[325] w-fit rounded-lg">
          News
        </div>
        <h1 className="text-[2.8rem] font-[350]">{title}</h1>
        <p className="text-[1.3rem] font-[350]">{pra}</p>
        <p className="text-[#D9D9D9] text-[1rem] font-[350]">{his}</p>
      </div>
    </div>
  );
}
