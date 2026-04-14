"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  SearchIcon,
  BellIcon,
  UserIcon,
} from "../../components/common/Icons";
import ContentWrapper from "../../components/Ui/ContentWrapper";
import NotificationsDrawer from "@/components/common/NotificationsDrawer";
import AboutPopover from "@/components/common/AboutPopover";
import { useAppSelector } from "@/global/redux/hooks";
import ExplorePopover from "@/components/common/ExplorePopover";

const ProfilePopover = dynamic(
  () => import("@/components/common/ProfilePopover"),
  { ssr: false }
);
const navLinks = [
  { href: "/blog", label: "Blog", hasDropdown: false },
  { href: "/about", label: "About", hasDropdown: true },
];

export default function Nav() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isLoggedIn = useAppSelector((state: any) => state.auth.isLoggedIn);

  return (
    <header
      className={`${isHomePage
        ? "absolute top-0 left-0 right-0 z-50 bg-linear-to-b from-[#0b0f2f2d]/90 via-[#0b0f2f32]/60 to-transparent"
        : "border-b border-white/10 bg-linear-to-r from-[#0e1a55] via-[#11307c] to-[#0e1a55] backdrop-blur-xl"
        } text-white transition-all duration-300`}
    >
      <ContentWrapper className="flex items-center justify-between gap-4 px-4 sm:px-4 md:px-0 !lg:px-0 !xl:px-0 !mt-0 py-4  ">
        {/* Mobile navigation (Figma-style) */}
        <div className="flex w-full items-center justify-between xl:hidden">
          {/* Hamburger icon */}
          <button
            type="button"
            aria-label="Open navigation menu"
            className="flex flex-col justify-center gap-[4px]"
          >
            <span className="block h-[2px] w-6 rounded-full bg-white" />
            <span className="block h-[2px] w-6 rounded-full bg-white" />
            <span className="block h-[2px] w-6 rounded-full bg-white" />
          </button>

          {/* Center logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/clarixlogo.svg"
              alt="Clarix Education"
              width={120}
              height={40}
              className="h-auto"
            />
          </Link>

          {/* Right icons: search + notifications */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Search"
              className="flex items-center justify-center"
            >
              <SearchIcon
                width={24}
                height={24}
                fill="white"
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="relative flex items-center justify-center"
              aria-label="Notifications"
            >
              <BellIcon
                width={22}
                height={24}
                fill="white"
                aria-hidden="true"
              />
              <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500" />
            </button>
          </div>
        </div>

        {/* Desktop / tablet navigation */}
        <div className="hidden w-full items-center justify-between gap-4 xl:flex ">
          {/* Left section: logo + Explore */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center">
              <Image
                src="/clarixlogo.svg"
                alt="Clarix Education"
                width={130}
                height={50}
                className="h-auto"
              />
            </Link>
            <ExplorePopover>
              <button className="hidden md:inline-flex items-center gap-1 rounded-[999px] px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors cursor-pointer">
                <span className="font-poppins tracking-[-0.02em]">
                  Explore
                </span>
                <ChevronDownIcon
                  width={18}
                  height={18}
                  fill="white"
                  aria-hidden="true"
                />
              </button>
            </ExplorePopover>
          </div>

          {/* Center section: search input (desktop only, matches hero search input) */}
          <form
            className="hidden lg:flex min-w-[420px] max-w-[650px] flex-1 items-center gap-3 rounded-full border border-white/60 bg-white/10 px-5 py-2 text-sm text-white/80 backdrop-blur-lg shadow-[0_6px_24px_rgba(0,0,0,0.25)]"
            role="search"
            onSubmit={(e) => e.preventDefault()}
          >
            <SearchIcon
              width={24}
              height={24}
              fill="white"
              aria-hidden="true"
            />
            <input
              type="search"
              name="q"
              className="w-full bg-transparent text-sm leading-5 text-white placeholder:text-white/70 focus:outline-none"
              placeholder="Search colleges, courses, exams, or scholarships…"
              aria-label="Search colleges, courses, exams, or scholarships"
            />
          </form>

          {/* Right section: links + profile + cta */}
          <div className="flex items-center gap-4">
            <nav className="hidden lg:flex items-center gap-4 font-poppins">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  pathname?.startsWith(link.href + "/");

                const linkContent = (
                  <span
                    className={`relative inline-flex items-center gap-1 px-2 py-1 text-sm font-medium tracking-[-0.02em] transition-colors ${isActive ? "text-white" : "text-white/80 hover:text-white"
                      }`}
                  >
                    {link.label}
                    {link.hasDropdown && (
                      <ChevronDownIcon
                        width={18}
                        height={18}
                        fill="white"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                );

                if (link.hasDropdown) {
                  return (
                    <AboutPopover key={link.href}>
                      <Link href={link.href} className="cursor-pointer" aria-current={isActive ? "page" : undefined}>
                        {linkContent}
                      </Link>
                    </AboutPopover>
                  );
                }

                return (
                  <Link key={link.href} href={link.href} aria-current={isActive ? "page" : undefined}>
                    {linkContent}
                  </Link>
                );
              })}
            </nav>

            {/* profile / notification icon */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="hidden sm:flex relative items-center justify-center p-[8px] cursor-pointer"
              aria-label="Notifications"
            >
              <BellIcon
                width={20}
                height={22}
                fill="white"
                aria-hidden="true"
              />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            </button>

            {!isLoggedIn ? (
              <Link
                href="/login"
                className="hidden text-sm font-medium text-white/90 transition-colors hover:text-white sm:inline"
              >
                Login
              </Link>
            ) : (
              <ProfilePopover>
                <button
                  type="button"
                  className="backdrop-blur-[8.75px] backdrop-filter bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.5)] border-solid flex items-center gap-1 px-[1rem] py-[6px] rounded-[50px] cursor-pointer transition-colors hover:bg-[rgba(255,255,255,0.25)]"
                  aria-label="Profile menu"
                >
                  <UserIcon
                    width={20}
                    height={20}
                    fill="white"
                    className="shrink-0"
                    aria-hidden="true"
                  />
                  <ChevronDownIcon
                    width={18}
                    height={18}
                    fill="white"
                    className="shrink-0"
                    aria-hidden="true"
                  />
                </button>
              </ProfilePopover>
            )}

            <Link
              href="/signup"
              className="inline-flex items-center gap-3 rounded-[40px] border-2 border-[rgba(255,255,255,0.23)] bg-white px-[2px] py-[2px] pl-[10px] text-sm font-medium text-[#513392] shadow-[0_2px_1px_rgba(255,255,255,0.2)] transition hover:bg-gray-100"
            >
              <span className="font-['Poppins',system-ui,sans-serif] leading-5">
                Start Free
              </span>
              <span className="inline-flex items-center justify-center rounded-full bg-[#513392] p-1.5 border border-white">
                <ChevronRightIcon width={18} height={18} fill="#ffffff" />
              </span>
            </Link>
          </div>
        </div>
      </ContentWrapper>

      {/* Notifications Drawer */}
      <NotificationsDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </header>
  );
}
