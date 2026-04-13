import type { Metadata } from "next";
import localFont from "next/font/local";
import ConditionalLayout from "@/app/components/ConditionalLayout";
import ReduxProvider from "@/global/redux/Store/ReduxProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import "./globals.css";
import FontLoader from "./components/FontLoader";
import { AntdRegistry } from '@ant-design/nextjs-registry';

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
  variable: "--font-helvetica-neue",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Clarix Education",
  description: "Clarix demo routes with placeholder pages",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${helveticaNeue.variable} antialiased flex flex-col min-h-screen overflow-x-hidden`}
      >
        <ReduxProvider>
          <ReactQueryProvider>
            <AntdRegistry>
              <FontLoader />
              <ConditionalLayout>{children}</ConditionalLayout>
            </AntdRegistry>
          </ReactQueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
