type FAQItem = {
  question: string;
  answer: string;
};

type FAQCardProps = {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  isSectioned?: boolean;
};

export default function FAQCard({
  item,
  isOpen,
  onToggle,
  isSectioned = false,
}: FAQCardProps) {
  
  return (
    <div
      className={`bg-[var(--white-color)] rounded-[10px]  md:px-6 px-1  ${!isSectioned
          ? "shadow-[0px_0px_30px_rgba(0,0,0,0.03)]"
          : "border-b border-gray-200"
        } ${isOpen ? "py-[26px]" : "h-[72px] flex items-center"}`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 cursor-pointer"
      >
        <p
          className={`font-helvetica text-[14px] md:text-[16px] lg:text-[20px] leading-[20px] tracking-[-0.4px] text-left ${isOpen
              ? "text-[var(--color-primary)]"
              : "text-[var(--color-text-headline)]"
            }`}
        >
          {item.question}
        </p>
        <span
          className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[var(--color-primary)] transition-transform ${isOpen ? "rotate-180" : ""
            }`}
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <p className="mt-5 font-poppins text-[12px] md:text-[14px] lg:text-[16px] leading-[20px] text-[var(--color-text-sub)]">
          {item.answer}
        </p>
      )}
    </div>
  );
}
