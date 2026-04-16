import Link from "next/link";
import { Button } from "@/components/common/Button";
import { ArrowRightIcon } from "@/components/common/Icons";
import { useCmsFooter } from "@/hooks/cms/useCmsFooter";

export default function FooterCTA() {
  const { footer } = useCmsFooter();

  const title =
    footer?.newsletter?.primaryHeadline || "Ready to Find Your Perfect College?";

  const description =
    footer?.newsletter?.subHeadline ||
    "Join thousands of students who found their dream college through Clarix Education.";

  const buttonText =
    footer?.newsletter?.primaryButtonText || "Start Your Search";

  const buttonLink = footer?.newsletter?.primaryButtonLink || "/colleges";

  const HeadingContent = () => {
    // If CMS provides its own line breaks, render as-is; otherwise keep the existing split line style.
    if (footer?.newsletter?.primaryHeadline) {
      return <>{title}</>;
    }

    return (
      <>
        Ready to Find Your
        <br className="hidden sm:block" /> Perfect College?
      </>
    );
  };

  return (
    <div className="">
      <div className="relative overflow-hidden rounded-[20px] md:rounded-[30px] bg-[url('/images/footer-bg.png')] bg-cover bg-bottom px-4 py-10 md:px-10 md:py-16 lg:py-20 text-center text-white">
        <div className="relative flex flex-col items-center gap-4 md:gap-6 max-w-[800px] mx-auto">
          <h2 className="text-[22px] font-medium leading-tight tracking-[-0.04em] sm:text-[28px] md:text-[36px] lg:text-[44px] xl:text-[52px]">
            <HeadingContent />
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-white/85 sm:text-base md:text-lg">
            {footer?.newsletter?.subHeadline ? (
              description
            ) : (
              <>
                Join thousands of students who found their dream college through
                <span className="font-medium"> Clarix Education.</span>
              </>
            )}
          </p>

          <div className="mt-6 flex justify-center">
            <Link href={buttonLink}>
              <Button
                variant="secondaryRound"
                size="lg"
                className="gap-4 border border-[#c6abff] bg-white text-[#513392] shadow-[0_14px_40px_rgba(0,0,0,0.25)] sm:px-8 sm:text-base"
              >
                <span>{buttonText}</span>
                <ArrowRightIcon width={24} height={24} fill="#513392" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
