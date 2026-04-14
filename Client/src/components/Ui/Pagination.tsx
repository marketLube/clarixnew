interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  type PageItem = number | "...";

  const createPageItems = (): PageItem[] => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const items: PageItem[] = [];
    const showLeftEllipsis = currentPage > 4;
    const showRightEllipsis = currentPage < totalPages - 3;

    items.push(1);

    if (showLeftEllipsis) {
      items.push("...");
    } else {
      items.push(2, 3);
    }

    const start = Math.max(4, currentPage - 1);
    const end = Math.min(totalPages - 3, currentPage + 1);

    for (let p = start; p <= end; p++) {
      if (p > 1 && p < totalPages) {
        if (!items.includes(p)) {
          items.push(p);
        }
      }
    }

    if (showRightEllipsis) {
      if (!items.includes(totalPages - 1)) {
        items.push("...");
      }
    } else {
      if (!items.includes(totalPages - 2)) items.push(totalPages - 2);
      if (!items.includes(totalPages - 1)) items.push(totalPages - 1);
    }

    if (!items.includes(totalPages)) {
      items.push(totalPages);
    }

    return items;
  };

  const pageItems = createPageItems();

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 my-4 md:my-[4rem]">
      <div className="flex items-center gap-1 sm:gap-2">
        {pageItems.map((item, index) => {
          if (item === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="flex h-8 w-8 sm:h-[34px] sm:w-[34px] items-center justify-center text-[#162447] font-poppins text-[14px] sm:text-[16px] leading-[20px]"
              >
                ...
              </span>
            );
          }

          const page = item;
          const isActive = page === currentPage;

          return (
            <button
              key={page}
              type="button"
              onClick={() => handlePageClick(page)}
              className={
                isActive
                  ? "flex h-8 w-8 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-gradient-to-b from-[#513392] to-[#734bca] text-white font-poppins text-[16px] sm:text-[20px] leading-[28px] tracking-[-0.4px] cursor-default"
                  : "flex h-8 w-8 sm:h-[34px] sm:w-[34px] items-center justify-center rounded-full bg-[#f6f7ff] text-[#162447] font-poppins text-[14px] sm:text-[16px] leading-[20px] tracking-[-0.32px] cursor-pointer hover:bg-[#edeeff] transition-colors"
              }
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="flex h-8 w-8 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white border border-[rgba(147,97,255,0.2)] shadow-[0px_0px_76.166px_0px_rgba(0,0,0,0.06)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-[#f6f7ff] transition-colors"
        aria-label="Next page"
      >
        <span className="inline-flex h-5 w-5 items-center justify-center text-[#513392]">
          →
        </span>
      </button>
    </div>
  );
}
