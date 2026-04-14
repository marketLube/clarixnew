import SectionDescription from "@/components/common/Section/SectionDescription";
import SectionHeading from "@/components/common/Section/SectionHeading";
import { MapPin, PhoneIcon, MailIcon } from "lucide-react";
import { useCmsFooter } from "@/hooks/cms/useCmsFooter";

type InfoItemProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
};

function InfoItem({ icon, title, value }: InfoItemProps) {
  return (
    <div className="flex items-start gap-2 md:gap-3">
      <div className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[11px] md:text-[12px] leading-[16px] md:leading-[20px] text-[var(--text-sub)] font-poppins">
          {title}
        </p>
        <p className="text-[12px] md:text-[16px] leading-[16px] md:leading-[20px] text-[var(--text-headline)] font-poppins">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function ContactLeftBody() {
  const { footer } = useCmsFooter();

  const title = footer?.primaryHeadline || "Start Your Journey";
  const description =
    footer?.subHeadline ||
    "Reach out to Clarix Education for expert guidance on colleges, courses, exams, and scholarships across India.";

  const phone = footer?.contactNumber || "+91 90999 09900";
  const email = footer?.email || "hello@clarixeducation.com";

  return (
    <div className="w-full md:max-w-[24rem] space-y-3 md:space-y-6 self-start">
      <SectionHeading title={title} />
      <SectionDescription className="max-w-[426px]">
        {description}
      </SectionDescription>

      <div className="flex flex-wrap gap-x-6 gap-y-3 md:flex-col md:gap-y-5">
        {/* Office Locations */}
        <div className="flex items-start gap-2 md:gap-3">
          <div className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white shrink-0">
            <MapPin className="w-4 h-4 md:w-5 md:h-5" />
          </div>
          <div>
            <p className="text-[11px] md:text-[12px] leading-[16px] md:leading-[20px] text-[var(--text-sub)] font-poppins">
              Our Offices
            </p>
            <div className="flex flex-col gap-1 mt-0.5">
              <div className="flex items-center gap-1.5">
                <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[var(--color-primary)] flex-shrink-0" />
                <p className="text-[12px] md:text-[16px] leading-[16px] md:leading-[20px] text-[var(--text-headline)] font-poppins">
                  Kochi, Kerala, India
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[var(--color-primary)] flex-shrink-0" />
                <p className="text-[12px] md:text-[16px] leading-[16px] md:leading-[20px] text-[var(--text-headline)] font-poppins">
                  Calicut, Kerala, India
                </p>
              </div>
            </div>
          </div>
        </div>

        <InfoItem icon={<PhoneIcon className="w-4 h-4 md:w-5 md:h-5" />} title="Call us" value={phone} />
        <InfoItem icon={<MailIcon className="w-4 h-4 md:w-5 md:h-5" />} title="Email" value={email} />
      </div>
    </div>
  );
}
