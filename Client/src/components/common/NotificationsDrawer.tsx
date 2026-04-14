"use client";

import { Drawer } from "antd";
import {
  BellIcon,
  GraduationCapIcon,
  DocIcon,
  SettingsIcon,
  CheckmarkIcon,
} from "@/components/common/Icons";
import { defaultNotifications } from "@/app/utilities/DummyData";

export interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  icon: "graduation" | "document";
  isRead: boolean;
  group: "today" | "yesterday";
}

interface NotificationsDrawerProps {
  open: boolean;
  onClose: () => void;
  notifications?: Notification[];
  onMarkAllAsRead?: () => void;
  onSettingsClick?: () => void;
}

export default function NotificationsDrawer({
  open,
  onClose,
  notifications = defaultNotifications as Notification[],
  onMarkAllAsRead,
  onSettingsClick,
}: NotificationsDrawerProps) {
  const todayNotifications = notifications.filter((n) => n.group === "today");
  const yesterdayNotifications = notifications.filter(
    (n) => n.group === "yesterday"
  );

  const renderNotificationIcon = (icon: "graduation" | "document") => {
    if (icon === "graduation") {
      return <GraduationCapIcon width={28} height={28} fill="#513392" />;
    }
    return <DocIcon width={28} height={28} fill="#513392" />;
  };

  const renderNotificationItem = (notification: Notification) => {
    const isUnread = !notification.isRead;
    const baseClasses = `relative flex items-center px-3 py-2.5 rounded-[10px] transition-opacity ${
      isUnread
        ? "bg-[#f6f7ff] border border-[#e2d9ff] hover:opacity-90 cursor-pointer"
        : "bg-[#fdfdfd]"
    }`;

    const content = (
      <div className="flex gap-3 items-start flex-1">
        <div className="bg-[#f6f7ff] p-3 rounded-[50px] shrink-0 flex items-center justify-center">
          {renderNotificationIcon(notification.icon)}
        </div>
        <div className="flex flex-col gap-2 flex-1 text-left">
          <p className="font-['Poppins',sans-serif] font-medium text-[#162447] text-[14px] leading-[18px]">
            {notification.title}
          </p>
          <p className="font-['Poppins',sans-serif] text-[#767e92] text-[14px] leading-[18px]">
            {notification.description}
          </p>
          <p className="font-['Poppins',sans-serif] text-[#767e92] text-[11px] leading-[14px]">
            {notification.timestamp}
          </p>
        </div>
      </div>
    );

    if (isUnread) {
      return (
        <button key={notification.id} className={baseClasses}>
          {content}
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>
      );
    }

    return (
      <div key={notification.id} className={baseClasses}>
        {content}
      </div>
    );
  };

  return (
    <Drawer
      title={null}
      placement="right"
      onClose={onClose}
      open={open}
      size={680}
      closable={false}
      rootClassName="notifications-drawer-wrapper"
      className="notifications-drawer"
      styles={{
        body: {
          padding: 0,
          backgroundColor: "#fdfdfd",
          overflow: "hidden",
          height: "100%",
          borderRadius: "0",
        },
        header: {
          display: "none",
        },
        mask: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <div className="bg-[#fdfdfd] h-full flex flex-col overflow-hidden">
        {/* Header Section */}
        <div className="bg-[#fdfdfd] shrink-0 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] px-5 pt-5 pb-4 relative">
          <div className="flex gap-[140px] items-stretch mb-4">
            {/* Left side: Icon + Title/Subtitle */}
            <div className="flex gap-[6px] items-start flex-1 h-full">
              <div className="flex items-center shrink-0 mt-1">
                <BellIcon width={24} height={24} fill="#162447" />
              </div>
              <div className="flex flex-col gap-[10px] items-start">
                <h2 className="font-poppins font-medium leading-[28px] text-[#162447] text-[24px] tracking-[-0.48px]">
                  Your Notifications
                </h2>
                <p className="font-['Poppins',sans-serif] font-normal leading-[20px] text-[#767e92] text-[16px] max-w-[310px]">
                  Never miss a deadline, offer, or update all your personalized
                  alerts live here.
                </p>
              </div>
            </div>
            {/* Right side: Settings Button */}
            <div className="flex flex-col gap-[10px] items-end shrink-0 justify-between h-full">
              <button
                onClick={onSettingsClick}
                className="border-[0.5px] border-[#e2e4e8] border-solid flex flex-col items-start p-[6px] rounded-[10px] shrink-0 w-[109px] hover:opacity-80 transition-opacity"
              >
                <div className="flex gap-[4px] items-center w-full">
                  <SettingsIcon width={20} height={20} fill="#162447" />
                  <span className="font-['Poppins',sans-serif] font-normal leading-[20px] text-[#162447] text-[16px] whitespace-nowrap">
                    Settings
                  </span>
                </div>
              </button>
              <button
                onClick={onMarkAllAsRead}
                className="flex gap-[4px] items-center hover:opacity-80 transition-opacity"
              >
                <CheckmarkIcon width={20} height={20} fill="#513392" />
                <span className="font-['Poppins',sans-serif] font-normal leading-[20px] text-[#513392] text-[16px] whitespace-nowrap">
                  Mark all as read
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Notifications Content */}
        <div className="px-4 pt-6 pb-4 overflow-y-auto flex-1">
          {/* TODAY Section */}
          {todayNotifications.length > 0 && (
            <div className="flex flex-col gap-4 mb-8">
              <p className="font-['Poppins',sans-serif] font-medium text-[#767e92] text-[14px] leading-[18px]">
                TODAY
              </p>
              <div className="flex flex-col gap-2">
                {todayNotifications.map(renderNotificationItem)}
              </div>
            </div>
          )}

          {/* YESTERDAY Section */}
          {yesterdayNotifications.length > 0 && (
            <div className="flex flex-col gap-4">
              <p className="font-['Poppins',sans-serif] font-medium text-[#767e92] text-[14px] leading-[18px]">
                YESTERDAY
              </p>
              <div className="flex flex-col gap-2">
                {yesterdayNotifications.map(renderNotificationItem)}
              </div>
            </div>
          )}
        </div>
      </div>
    </Drawer>
  );
}
