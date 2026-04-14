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
    <div className="flex items-start gap-3">
      <div className="h-9 w-9 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white text-sm p-[10px] md:p-0">
        {icon}
      </div>
      <div>
        <p className="text-[12px] leading-[20px] text-[var(--text-sub)] font-poppins">
          {title}
        </p>
        <p className="text-[14px] leading-[20px] text-[var(--text-headline)] font-poppins md:text-[16px]">
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
    <div className="max-w-[15rem] md:max-w-[24rem] space-y-6 self-start">
      <SectionHeading title={title} />
      <SectionDescription className="max-w-[426px]">
        {description}
      </SectionDescription>

      <div className="space-y-[24px]">
        {/* Office Locations */}
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white text-sm p-[10px] md:p-0 flex-shrink-0">
            <MapPin />
          </div>
          <div>
            <p className="text-[12px] leading-[20px] text-[var(--text-sub)] font-poppins">
              Our Offices
            </p>
            <div className="flex flex-col gap-2 mt-1">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] flex-shrink-0" />
                <p className="text-[14px] leading-[20px] text-[var(--text-headline)] font-poppins md:text-[16px]">
                  Kochi, Kerala, India
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] flex-shrink-0" />
                <p className="text-[14px] leading-[20px] text-[var(--text-headline)] font-poppins md:text-[16px]">
                  Calicut, Kerala, India
                </p>
              </div>
            </div>
          </div>
        </div>

        <InfoItem icon={<PhoneIcon />} title="Call us" value={phone} />
        <InfoItem icon={<MailIcon />} title="Email" value={email} />
      </div>
    </div>
  );
}
