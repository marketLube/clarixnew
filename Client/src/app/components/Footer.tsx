import ContentWrapper from "@/components/Ui/ContentWrapper";
import Contact from "./common/Contact/Contact";
import FooterCTA from "./FooterCTA";
import FooterMain from "./FooterMain";

export default function Footer() {
  return (
    <footer className="md:mt-24 mt-2 text-[#162447] bg-[#f6f7ff]">
      <ContentWrapper>
        <Contact />
        <FooterCTA />
        <FooterMain />
      </ContentWrapper>
    </footer>
  );
}
