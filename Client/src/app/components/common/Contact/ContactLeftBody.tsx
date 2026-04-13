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
  const description = footer?.subHeadline || "Contact us for more details";

  const location = footer?.locationLink || "Calicut, Kerala, India";
  const phone = footer?.contactNumber || "+91 90999 09900";
  const email = footer?.email || "hello@clarixeducation.com";

  return (
    <div className="max-w-[15rem] md:max-w-[24rem] space-y-6 self-start">
      <SectionHeading title={title} />
      <SectionDescription className="max-w-[426px]">
        {description}
      </SectionDescription>

      <div className="space-y-[24px]">
        <InfoItem
          icon={<MapPin />}
          title="Location"
          value={location}
        />
        <InfoItem icon={<PhoneIcon />} title="Call us" value={phone} />
        <InfoItem
          icon={<MailIcon />}
          title="Email"
          value={email}
        />
      </div>
    </div>
  );
}
