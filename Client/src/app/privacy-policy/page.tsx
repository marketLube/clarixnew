import ContentWrapper from "@/components/Ui/ContentWrapper";
import Breadcrumb from "@/components/common/Breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Clarix Education",
  description: "Learn how Clarix Education collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="py-6 md:py-10 min-h-screen bg-[#fdfdfd]">
      <ContentWrapper className="max-w-[800px]">
        <Breadcrumb items={[{ label: "Privacy Policy" }]} />
        <h1 className="font-poppins font-medium text-[28px] md:text-[36px] text-[#162447] mt-4 mb-6">Privacy Policy</h1>
        <div className="prose prose-sm md:prose-base max-w-none font-poppins text-[#767e92] leading-[26px] space-y-6">
          <p className="text-[14px] md:text-[15px]"><strong>Last updated:</strong> April 15, 2026</p>

          <h2 className="text-[18px] md:text-[22px] text-[#162447] font-medium mt-8">1. Information We Collect</h2>
          <p className="text-[14px] md:text-[15px]">We collect information you provide directly, including your name, email address, phone number, and educational preferences when you create an account, submit enquiries, or use our services. We also automatically collect usage data such as pages visited, search queries, device type, and IP address through cookies and analytics tools.</p>

          <h2 className="text-[18px] md:text-[22px] text-[#162447] font-medium mt-8">2. How We Use Your Information</h2>
          <p className="text-[14px] md:text-[15px]">We use your information to provide personalized college and course recommendations, send relevant updates about admissions and deadlines, improve our platform, respond to your enquiries, and communicate important service updates. We never sell your personal data to third parties.</p>

          <h2 className="text-[18px] md:text-[22px] text-[#162447] font-medium mt-8">3. Data Storage and Security</h2>
          <p className="text-[14px] md:text-[15px]">Your data is stored on secure servers with industry-standard encryption. We implement SSL/TLS encryption for data in transit and use access controls to limit who can view your information. We retain your data only as long as necessary to provide our services or as required by law.</p>

          <h2 className="text-[18px] md:text-[22px] text-[#162447] font-medium mt-8">4. Cookies and Tracking</h2>
          <p className="text-[14px] md:text-[15px]">We use cookies to remember your preferences, analyze site traffic, and personalize your experience. You can control cookie settings through your browser. Third-party analytics services (such as Google Analytics) may also set cookies to help us understand how you use our site.</p>

          <h2 className="text-[18px] md:text-[22px] text-[#162447] font-medium mt-8">5. Third-Party Sharing</h2>
          <p className="text-[14px] md:text-[15px]">We may share limited data with partner colleges when you express interest in their programs (e.g., submitting an enquiry form). We also use trusted service providers for email delivery, analytics, and hosting. All partners are bound by confidentiality agreements.</p>

          <h2 className="text-[18px] md:text-[22px] text-[#162447] font-medium mt-8">6. Your Rights</h2>
          <p className="text-[14px] md:text-[15px]">You have the right to access, correct, or delete your personal data at any time. You can unsubscribe from marketing emails using the link in each email. To request data deletion, contact us at <a href="mailto:support@clarixeducation.com" className="text-[#513392] hover:underline">support@clarixeducation.com</a>.</p>

          <h2 className="text-[18px] md:text-[22px] text-[#162447] font-medium mt-8">7. Children&apos;s Privacy</h2>
          <p className="text-[14px] md:text-[15px]">Our services are intended for users aged 16 and above. We do not knowingly collect personal information from children under 16. If we become aware of such collection, we will promptly delete the data.</p>

          <h2 className="text-[18px] md:text-[22px] text-[#162447] font-medium mt-8">8. Changes to This Policy</h2>
          <p className="text-[14px] md:text-[15px]">We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date. Continued use of our services constitutes acceptance of the revised policy.</p>

          <h2 className="text-[18px] md:text-[22px] text-[#162447] font-medium mt-8">9. Contact Us</h2>
          <p className="text-[14px] md:text-[15px]">If you have questions about this privacy policy, please contact us at <a href="mailto:support@clarixeducation.com" className="text-[#513392] hover:underline">support@clarixeducation.com</a>.</p>
        </div>
      </ContentWrapper>
    </section>
  );
}
