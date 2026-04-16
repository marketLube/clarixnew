import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import ConditionalLayout from "@/app/components/ConditionalLayout";
import ReduxProvider from "@/global/redux/Store/ReduxProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import GoogleAnalytics from "@/components/common/GoogleAnalytics";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

const helveticaNeue = localFont({
  src: [
    {
      path: "./../../public/Fonts/HelveticaNeue-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "./../../public/Fonts/HelveticaNeue-ThinItalic.woff2",
      weight: "100",
      style: "italic",
    },
    {
      path: "./../../public/Fonts/HelveticaNeue-UltraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "./../../public/Fonts/HelveticaNeue-UltraLightItalic.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "./../../public/Fonts/HelveticaNeue-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./../../public/Fonts/HelveticaNeue-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "./../../public/Fonts/HelveticaNeue.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./../../public/Fonts/HelveticaNeue-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./../../public/Fonts/HelveticaNeue-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./../../public/Fonts/HelveticaNeue-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "./../../public/Fonts/HelveticaNeue-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./../../public/Fonts/HelveticaNeue-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "./../../public/Fonts/HelveticaNeue-CondensedBold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./../../public/Fonts/HelveticaNeue-CondensedBlack.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-poppins-neue",
  display: "swap",
});

const siteTitle =
  "Clarix Education - Find Your Perfect College, Course & Career";
const siteDescription =
  "Discover top colleges, courses, entrance exams, scholarships, and career opportunities across India. Clarix Education helps students make informed decisions about their academic and professional future.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.clarixeducation.com"
  ),
  title: {
    default: siteTitle,
    template: "%s | Clarix Education",
  },
  description: siteDescription,
  keywords: [
    "colleges in India",
    "courses",
    "entrance exams",
    "scholarships",
    "career guidance",
    "higher education",
    "university admissions",
    "engineering colleges",
    "medical colleges",
    "MBA colleges",
    "study abroad",
    "jobs for freshers",
    "Clarix Education",
  ],
  authors: [{ name: "Clarix Education" }],
  creator: "Clarix Education",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Clarix Education",
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || undefined,
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${helveticaNeue.variable} ${poppins.variable} antialiased flex flex-col min-h-screen overflow-x-hidden`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-white focus:px-4 focus:py-2 focus:text-[#513392] focus:rounded focus:shadow-lg"
        >
          Skip to main content
        </a>
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Clarix Education",
              url: "https://www.clarixeducation.com",
              description: siteDescription,
              logo: "https://www.clarixeducation.com/favicon.ico",
              sameAs: [],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer support",
                availableLanguage: ["English", "Hindi"],
              },
            }),
          }}
        />
        <ReduxProvider>
          <ReactQueryProvider>
            <AntdRegistry>
              <ConditionalLayout>{children}</ConditionalLayout>
            </AntdRegistry>
          </ReactQueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
