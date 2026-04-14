"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Nav from "./Nav";
import Footer from "./Footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isLoginPage =
    pathname === "/login" ||
    pathname === "/login/otp" ||
    pathname === "/sign-in";
  const shouldHideNav = isLoginPage || isHomePage;

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <>
      {!shouldHideNav && <Nav />}
      <main id="main-content" className={isLoginPage ? "w-full h-screen" : "flex-1 w-full"}>
        {children}
      </main>
      {!isLoginPage && <Footer />}
    </>
  );
}
