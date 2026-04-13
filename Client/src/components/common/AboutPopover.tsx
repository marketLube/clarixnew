"use client";

import Link from "next/link";
import { Popover } from "antd";
import { ReactNode } from "react";

interface AboutPopoverProps {
  children: ReactNode;
}

export default function AboutPopover({ children }: AboutPopoverProps) {
  const aboutPopoverContent = (
    <div className="flex flex-col gap-1 p-0 w-[350px] bg-white">
      <Link
        href="/about"
        className="flex flex-col p-3 rounded-[10px] transition-colors duration-150 ease-in-out no-underline cursor-pointer w-full box-border items-start"
      >
        <p className="text-[#162447] text-base font-medium leading-6 tracking-[-0.32px] m-0">
          About Clarix
        </p>
        <p className="text-[#767e92] text-xs leading-[18px] tracking-[-0.24px] m-0">
          Empower students with world-class education
        </p>
      </Link>
      <Link
        href="/career"
        className="flex flex-col p-3 rounded-[10px] transition-colors duration-150 ease-in-out no-underline cursor-pointer w-full box-border items-start"
      >
        <p className="text-[#162447] text-base font-medium leading-6 tracking-[-0.32px] m-0">
          Careers
        </p>
        <p className="text-[#767e92] text-xs leading-[18px] tracking-[-0.24px] m-0">
          Join our team to shape education's future
        </p>
      </Link>
    </div>
  );

  return (
    <Popover
      content={aboutPopoverContent}
      trigger="hover"
      placement="bottomLeft"
      overlayClassName="about-popover-wrapper"
      mouseEnterDelay={0.15}
      mouseLeaveDelay={0.15}
      overlayStyle={{ padding: 0 }}
      rootClassName="about-popover-root"
    >
      {children}
    </Popover>
  );
}
