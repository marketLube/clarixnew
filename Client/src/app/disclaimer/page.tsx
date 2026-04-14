import ContentWrapper from "@/components/Ui/ContentWrapper";
import Breadcrumb from "@/components/common/Breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer - Clarix Education",
  description: "Important disclaimers about the information provided on Clarix Education.",
};

export default function DisclaimerPage() {
  return (
    <section className="py-6 md:py-10 min-h-screen bg-[#fdfdfd]">
      <ContentWrapper className="max-w-[800px]">
        <Breadcrumb items={[{ label: "Disclaimer" }]} />
        <h1 className="font-poppins font-medium text-[28px] md:text-[36px] text-[#162447] mt-4 mb-6">Disclaimer</h1>
        <div className="prose prose-sm md:prose-base max-w-none font-poppins text-[#767e92] leading-[26px] space-y-6">
          <p className="text-[14px] md:text-[15px]"><strong>Last updated:</strong> April 15, 2026</p>

          <h2 className="text-[18px] md:text-[22px] text-[#162447] font-medium mt-8">General Information</h2>
          <p className="text-[14px] md:text-[15px]">The information provided on Clarix Education (clarixeducation.com) is for general informational purposes only. While we strive to keep the information accurate and up-to-date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or availability of the information, products, services, or related graphics contained on the website.</p>

          <h2 className="text-[18px] md:text-[22px] text-[#162447] font-medium mt-8">Educational Data Accuracy</h2>
          <p className="text-[14px] md:text-[15px]">College fees, placement statistics, admission criteria, scholarship details, and other educational data displayed on our platform are sourced from publicly available information, official college websites, and government databases. This data may change without prior notice. We strongly recommend verifying all information directly with the respective educational institution before making any admission or financial decisions.</p>

          <h2 className="text-[18px] md:text-[22px] text-[#162447] font-medium mt-8">No Professional Advice</h2>
          <p className="text-[14px] md:text-[15px]">The content on this website does not constitute professional education counseling, financial advice, or legal advice. Any reliance you place on information from our platform is strictly at your own risk. For critical decisions regarding education, career, or finances, please consult qualified professionals.</p>

          <h2 className="text-[18px] md:text-[22px] text-[#162447] font-medium mt-8">Third-Party Links</h2>
          <p className="text-[14px] md:text-[15px]">Our website may contain links to external websites operated by third parties. We have no control over the content, privacy policies, or practices of these sites and accept no responsibility for them. The inclusion of any link does not imply endorsement or recommendation.</p>

          <h2 className="text-[18px] md:text-[22px] text-[#162447] font-medium mt-8">User Reviews and Testimonials</h2>
          <p className="text-[14px] md:text-[15px]">Reviews and testimonials displayed on our platform are submitted by users and represent their personal opinions and experiences. We do not verify the accuracy of user-generated content. These reviews should not be taken as guaranteed outcomes or official representations of any institution.</p>

          <h2 className="text-[18px] md:text-[22px] text-[#162447] font-medium mt-8">Images and Media</h2>
          <p className="text-[14px] md:text-[15px]">Some images used on our platform are sourced from publicly available resources including Wikimedia Commons, Unsplash, and institutional websites for informational purposes. If you believe any content infringes on your copyright, please contact us for prompt removal.</p>

          <h2 className="text-[18px] md:text-[22px] text-[#162447] font-medium mt-8">Limitation of Liability</h2>
          <p className="text-[14px] md:text-[15px]">In no event shall Clarix Education be liable for any loss or damage, including without limitation, indirect or consequential loss or damage, arising from the use of information provided on this website.</p>

          <h2 className="text-[18px] md:text-[22px] text-[#162447] font-medium mt-8">Contact Us</h2>
          <p className="text-[14px] md:text-[15px]">If you have concerns about any content on our platform, please reach out to <a href="mailto:support@clarixeducation.com" className="text-[#513392] hover:underline">support@clarixeducation.com</a>.</p>
        </div>
      </ContentWrapper>
    </section>
  );
}
