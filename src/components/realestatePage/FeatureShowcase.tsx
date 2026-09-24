interface FeatureShowcaseProps {
  title: string;
  description: string;
  videoUrl: string;
  videoFirst?: boolean;
}

export function FeatureShowcase({
  title,
  description,
  videoUrl,
  videoFirst = false,
}: FeatureShowcaseProps) {
  const content = (
    <div className="flex w-full text-white flex-col justify-center">
      <h2 className="text-[3rem] leading-[0.95] font-medium tracking-[-0.04em]">
        {title}
      </h2>
      <p className="mt-[2rem] max-w-[600px] text-[1.3rem] md:text-[1.5rem] lg:text-[1.7rem] leading-[1.4]">
        {description}
      </p>
    </div>
  );

  const video = (
    <div className="w-full aspect-video overflow-hidden rounded-[2rem] bg-[#f1f0ee]">
      <video
        src={videoUrl}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  );

  return (
    <section className="w-full mb-[1.5rem]">
      <div className="flex lg:flex-col gap-16  items-center">
        {videoFirst ? (
          <>
            {video}
            {content}
          </>
        ) : (
          <>
            {content}
            {video}
          </>
        )}
      </div>
    </section>
  );
}