"use client";

import { Search, MessageCircle, Bell } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/src/components/ui/avatar";

export function AdminHeader() {
  return (
    <div className="relative w-full h-full flex items-center gap-4">
      {/* Search Bar */}
      <div className="flex-1 bg-white border-[0.5px] border-[#aac4bc] border-solid flex items-center px-3 py-1.5 rounded-[14px]">
        <div className="flex items-center gap-1.5 flex-1">
          <Search className="w-4 h-4 text-[#7f9788] flex-shrink-0" />
          <Input
            type="text"
            placeholder="Search"
            className="border-0 bg-transparent p-0 text-sm leading-4 text-[#7f9788] placeholder:text-[#7f9788] focus-visible:ring-0 focus-visible:ring-offset-0 h-auto flex-1"
          />
        </div>
        <div className="bg-[#eaeaea] flex items-center h-5 w-8 overflow-hidden pl-1 pr-1.5 py-0.5 rounded ml-3 flex-shrink-0">
          <span className="font-medium text-xs leading-4 text-[#888989]">
            ⌘K
          </span>
        </div>
      </div>

      {/* Right side buttons and avatar */}
      <div className="flex items-center gap-3">
        {/* Message button with gradient */}
        <Button
          variant="ghost"
          size="icon"
          className="p-2 rounded-[14px] hover:opacity-90 transition-opacity w-8 h-8"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(140,218,194,1) 0%, rgba(108,210,179,1) 25%, rgba(76,202,163,1) 50%, rgba(45,194,148,1) 75%, rgba(29,190,141,1) 87.5%, rgba(13,186,133,1) 100%)",
          }}
        >
          <MessageCircle className="w-5 h-5 text-white" />
        </Button>

        {/* Bell button with notification */}
        <Button
          variant="ghost"
          size="icon"
          className="p-2 rounded-[14px] bg-white border-[0.5px] border-[#aac4bc] border-solid hover:bg-gray-50 transition-colors relative w-8 h-8"
        >
          <Bell className="w-5 h-5 text-[#888989]" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
        </Button>

        {/* Profile Avatar */}
        <Avatar className="w-8 h-8 rounded-full">
          <AvatarImage
            src="https://img.freepik.com/free-vector/cute-boy-with-thumbs-up-cartoon-vector-icon-illustration-people-holiday-icon-isolated-flat-vector_138676-14665.jpg?semt=ais_hybrid&w=740&q=80"
            alt="Profile"
            className="rounded-full object-cover"
          />
          <AvatarFallback className="bg-gray-200 text-gray-600">
            User
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
