interface SectionHeadingProps {
  title: string;
  description?: string;
}

export function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-2 items-start">
      <h1 className="font-semibold leading-6 text-[24px] text-[#364440]">
        {title}
      </h1>
      {description && (
        <p className="font-medium leading-[19.2px] text-base text-[rgba(54,68,64,0.6)]">
          {description}
        </p>
      )}
    </div>
  );
}