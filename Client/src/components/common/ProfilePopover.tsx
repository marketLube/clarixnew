"use client";

import Link from "next/link";
import { Popover } from "antd";
import { ReactNode, useState } from "react";
import {
  HelpIcon,
  HeadphoneIcon,
  LogoutIcon,
  LoveIcon,
} from "./Icons";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/global/redux/slices/authSlice";
import { useRouter } from "next/navigation";

interface ProfilePopoverProps {
  children: ReactNode;
}

export default function ProfilePopover({ children }: ProfilePopoverProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: any) => state.auth.user);
  const [open, setOpen] = useState(false);


  if (!user) {
    return (
      <Link
        href="/login"
        className="hidden text-sm font-medium text-white/90 transition-colors hover:text-white sm:inline"
      >
        Login
      </Link>
    );
  }

  const getInitials = () => {
    if (user?.name) {
      const names = user.name.split(" ");
      return names
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (user?.email) {
      return user.email[0].toUpperCase() + (user.email[1]?.toUpperCase() || "");
    }
    return "US";
  };

  const userName = user?.name;
  const userEmail = user?.email;
  const userInitials = getInitials();

  const handleLogout = () => {
    dispatch(logout());
    setOpen(false);
    router.push("/");
  };

  const handleSavedItems = () => {
    setOpen(false);
    router.push("/saved");
  };

  const profilePopoverContent = (
    <div className="flex flex-col gap-[6px] p-0 w-[316px] bg-white">
      {/* User Info Section */}
      <div className="flex flex-col gap-[10px] items-start pb-0 px-[16px]">
        <div className="flex gap-[10px] items-center w-full">
          {/* Avatar */}
          <div className="bg-[rgba(147,97,255,0.23)] rounded-[70px] w-[50px] h-[50px] flex items-center justify-center shrink-0">
            <p className="font-helvetica font-medium text-[20px] leading-[28px] text-[#513392] tracking-[-0.48px] m-0">
              {userInitials}
            </p>
          </div>
          {/* Name and Email */}
          <div className="flex flex-col gap-[6px] items-start flex-1 min-w-0">
            <p className="font-helvetica font-medium text-[20px] leading-[28px] text-[#162447] tracking-[-0.4px] m-0 truncate w-full">
              {userName}
            </p>
            <p className="font-poppins text-[16px] leading-[20px] text-[#767e92] m-0 truncate w-full">
              {userEmail}
            </p>
          </div>
        </div>
        {/* Divider */}
        <div className="h-px w-full bg-[#e5e7eb] mt-[6px]" />
      </div>

      {/* Saved Items */}
      <div className="px-[16px]">
        <div
          onClick={() => handleSavedItems()}
          className="flex gap-[12px] items-center pl-[6px] pr-[16px] py-[8px] rounded-[8px] transition-colors duration-150 ease-in-out no-underline cursor-pointer w-full hover:bg-[rgba(0,0,0,0.04)]"
        >
          <LoveIcon
            width={20}
            height={20}
            fill="#767e92"
            className="shrink-0"
          />
          <p className="font-poppins text-[16px] leading-[20px] text-[#767e92] m-0 whitespace-nowrap">
            Saved Items
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-[#e5e7eb] px-[16px]" />

      {/* Support & Exit Section */}
      <div className="flex flex-col gap-[8px] items-start pb-[16px]">
        <p className="font-poppins font-medium text-[16px] leading-[20px] text-[#162447] m-0 w-full">
          SUPPORT & EXIT
        </p>
        <div className="flex flex-col gap-[4px] items-start w-full px-[16px]">
          {/* Help Centre */}
          <Link
            href="/help"
            className="flex gap-[6px] items-center px-[6px] py-[8px] rounded-[8px] transition-colors duration-150 ease-in-out no-underline cursor-pointer w-full hover:bg-[rgba(0,0,0,0.04)]"
          >
            <HelpIcon
              width={16}
              height={16}
              fill="#767e92"
              className="shrink-0"
            />
            <p className="font-poppins text-[16px] leading-[20px] text-[#767e92] m-0 whitespace-nowrap">
              Help Centre
            </p>
          </Link>

          {/* Talk to a Counsellor */}
          <Link
            href="/counsellor"
            className="flex gap-[6px] items-center px-[6px] py-[8px] rounded-[8px] transition-colors duration-150 ease-in-out no-underline cursor-pointer w-full hover:bg-[rgba(0,0,0,0.04)]"
          >
            <HeadphoneIcon
              width={16}
              height={16}
              fill="#006bff"
              className="shrink-0"
            />
            <p className="font-poppins text-[16px] leading-[20px] text-[#006bff] m-0 whitespace-nowrap">
              Talk to a Counsellor
            </p>
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex gap-[6px] items-center px-[6px] py-[8px] rounded-[8px] transition-colors duration-150 ease-in-out cursor-pointer w-full hover:bg-[rgba(0,0,0,0.04)] bg-transparent border-none text-left"
          >
            <LogoutIcon
              width={16}
              height={16}
              fill="#f63f3f"
              className="shrink-0"
            />
            <p className="font-poppins text-[16px] leading-[20px] text-[#f63f3f] m-0 whitespace-nowrap">
              Logout
            </p>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      content={profilePopoverContent}
      trigger="hover"
      placement="bottomLeft"
      overlayClassName="profile-popover-wrapper"
      overlayStyle={{ padding: 0 }}
      rootClassName="profile-popover-root"
    >
      {children}
    </Popover>
  );
}

