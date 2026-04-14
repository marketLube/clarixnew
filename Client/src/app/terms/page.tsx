import ContentWrapper from "@/components/Ui/ContentWrapper";
import Breadcrumb from "@/components/common/Breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions - Clarix Education",
  description: "Terms and conditions for using the Clarix Education platform.",
};

export default function TermsPage() {
  return (
    <section className="py-6 md:py-10 min-h-screen bg-[#fdfdfd]">
      <ContentWrapper className="max-w-[800px]">
        <Breadcrumb items={[{ label: "Terms & Conditions" }]} />
        <h1 className="font-poppins font-medium text-[28px] md:text-[36px] text-[#162447] mt-4 mb-6">Terms &amp; Conditions</h1>
        <div className="prose prose-sm md:prose-base max-w-none font-poppins text-[#767e92] leading-[26px] space-y-6">
          <p className="text-[14px] md:text-[15px]"><strong>Last updated:</strong> April 15, 2026</p>

          <h2 className="text-[18px] md:text-[22px] text-[#162447] font-medium mt-8">1. Acceptance of Terms</h2>
          <p className="text-[14px] md:text-[15px]">By accessing and using Clarix Education (clarixeducation.com), you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.</p>

          <h2 className="text-[18px] md:text-[22px] text-[#162447] font-medium mt-8">2. Description of Services</h2>
          <p className="text-[14px] md:text-[15px]">Clarix Education is an education discovery and consultancy platform that provides information about colleges, courses, entrance exams, scholarships, and career opportunities. We aggregate publicly available data to help students make informed education decisions.</p>

          <h2 className="text-[18px] md:text-[22px] text-[#162447] font-medium mt-8">3. User Accounts</h2>
          <p className="text-[14px] md:text-[15px]">You may be required to create an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials. You agree to provide accurate and up-to-date information during registration.</p>

          <h2 className="text-[18px] md:text-[22px] text-[#162447] font-medium mt-8">4. Acceptable Use</h2>
          <p className="text-[14px] md:text-[15px]">You agree not to misuse our services by attempting unauthorized access, scraping data without permission, posting false reviews, impersonating others, or using our platform for any unlawful purpose.</p>

          <h2 className="text-[18px] md:text-[22px] text-[#162447] font-medium mt-8">5. Content and Accuracy</h2>
          <p className="text-[14px] md:text-[15px]">We strive to provide accurate and up-to-date information about educational institutions. However, fees, admission criteria, and placement data may change. We recommend verifying critical information directly with the respective institution before making decisions.</p>

          <h2 className="text-[18px] md:text-[22px] text-[#162447] font-medium mt-8">6. Intellectual Property</h2>
          <p className="text-[14px] md:text-[15px]">All content, design, logos, and branding on Clarix Education are owned by us or licensed to us. You may not reproduce, distribute, or create derivative works without our written consent.</p>

          <h2 className="text-[18px] md:text-[22px] text-[#162447] font-medium mt-8">7. User-Generated Content</h2>
          <p className="text-[14px] md:text-[15px]">By submitting reviews, comments, or other content, you grant us a non-exclusive, royalty-free license to use, display, and distribute that content on our platform. You are solely responsible for the accuracy and legality of your submissions.</p>

          <h2 className="text-[18px] md:text-[22px] text-[#162447] font-medium mt-8">8. Limitation of Liability</h2>
          <p className="text-[14px] md:text-[15px]">Clarix Education is provided &quot;as is&quot; without warranties of any kind. We are not liable for any decisions made based on information on our platform. Our total liability is limited to the amount you paid for our services, if any.</p>

          <h2 className="text-[18px] md:text-[22px] text-[#162447] font-medium mt-8">9. Termination</h2>
          <p className="text-[14px] md:text-[15px]">We reserve the right to suspend or terminate your account if you violate these terms. You may also delete your account at any time by contacting us.</p>

          <h2 className="text-[18px] md:text-[22px] text-[#162447] font-medium mt-8">10. Governing Law</h2>
          <p className="text-[14px] md:text-[15px]">These terms are governed by the laws of India. Any disputes shall be resolved in the courts of Bangalore, Karnataka.</p>

          <h2 className="text-[18px] md:text-[22px] text-[#162447] font-medium mt-8">11. Contact</h2>
          <p className="text-[14px] md:text-[15px]">For questions about these terms, contact us at <a href="mailto:support@clarixeducation.com" className="text-[#513392] hover:underline">support@clarixeducation.com</a>.</p>
        </div>
      </ContentWrapper>
    </section>
  );
}
