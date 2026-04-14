"use client";

import { Drawer } from "antd";
import {
  BellIcon,
  DocIcon,
  SettingsIcon,
  CheckmarkIcon,
} from "@/components/common/Icons";
import { useBlogs } from "@/hooks/blog/useBlogs";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface NotificationsDrawerProps {
  open: boolean;
  onClose: () => void;
  onMarkAllAsRead?: () => void;
  onSettingsClick?: () => void;
}

export default function NotificationsDrawer({
  open,
  onClose,
  onMarkAllAsRead,
  onSettingsClick,
}: NotificationsDrawerProps) {
  const { data } = useBlogs({ page: 1, limit: 15 });
  const router = useRouter();

  const notifications = useMemo(() => {
    if (!data?.blogs?.length) return [];
    return data.blogs.map((blog) => ({
      id: blog._id,
      title: blog.title,
      description: blog.excerpt || blog.category || "",
      timestamp: formatTimeAgo(blog.createdAt),
      slug: blog.slug,
      category: blog.category,
    }));
  }, [data]);

  const handleNotificationClick = (slug: string) => {
    router.push(`/blog/${slug}`);
    onClose();
  };

  return (
    <Drawer
      title={null}
      placement="right"
      onClose={onClose}
      open={open}
      width={420}
      closable={false}
      rootClassName="notifications-drawer-wrapper"
      className="notifications-drawer"
      styles={{
        body: {
          padding: 0,
          backgroundColor: "#fdfdfd",
          overflow: "hidden",
          height: "100%",
        },
        header: { display: "none" },
        mask: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
      }}
    >
      <div className="bg-[#fdfdfd] h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#fdfdfd] shrink-0 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] px-4 pt-4 pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-2 items-start flex-1">
              <BellIcon width={22} height={22} fill="#162447" />
              <div>
                <h2 className="font-poppins font-medium text-[#162447] text-[18px] leading-[24px]">
                  Notifications
                </h2>
                <p className="font-poppins text-[#767e92] text-[13px] leading-[18px] mt-1">
                  Latest updates and articles
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onSettingsClick}
                className="border border-[#e2e4e8] flex items-center gap-1 px-2 py-1.5 rounded-lg hover:opacity-80 transition-opacity"
              >
                <SettingsIcon width={16} height={16} fill="#162447" />
                <span className="font-poppins text-[#162447] text-[13px]">Settings</span>
              </button>
            </div>
          </div>
          <button
            onClick={onMarkAllAsRead}
            className="flex items-center gap-1 mt-2 hover:opacity-80 transition-opacity"
          >
            <CheckmarkIcon width={16} height={16} fill="#513392" />
            <span className="font-poppins text-[#513392] text-[13px]">Mark all as read</span>
          </button>
        </div>

        {/* Notifications List */}
        <div className="px-3 pt-3 pb-4 overflow-y-auto flex-1">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <BellIcon width={40} height={40} fill="#e0e4f0" />
              <p className="font-poppins text-[#767e92] text-[14px] mt-3">No notifications yet</p>
            </div>
          ) : (
            <>
              <p className="font-poppins font-medium text-[#767e92] text-[11px] leading-[14px] uppercase tracking-wider mb-2 px-1">
                Latest Articles
              </p>
              <div className="flex flex-col gap-1.5">
                {notifications.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => handleNotificationClick(n.slug)}
                    className="flex items-start gap-2.5 px-2.5 py-2 rounded-lg hover:bg-[#f6f7ff] transition-colors text-left w-full"
                  >
                    <div className="bg-[#f6f7ff] p-2 rounded-full shrink-0 mt-0.5">
                      <DocIcon width={18} height={18} fill="#513392" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-poppins font-medium text-[#162447] text-[13px] leading-[17px] line-clamp-2">
                        {n.title}
                      </p>
                      {n.category && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-[#f5eefe] text-[#513392] text-[10px] font-poppins font-medium rounded-full">
                          {n.category}
                        </span>
                      )}
                      <p className="font-poppins text-[#767e92] text-[11px] leading-[14px] mt-1">
                        {n.timestamp}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Drawer>
  );
}

function formatTimeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}
