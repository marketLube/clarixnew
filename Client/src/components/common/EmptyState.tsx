import React, { ReactNode } from "react";
import { SearchX, MapPinOff, Building, GraduationCap, X } from "lucide-react";

interface EmptyStateProps {
  title?: ReactNode;
  description?: ReactNode;
  onClearFilters?: () => void;
  actionLabel?: string;
}

export default function EmptyState({
  title = "No Colleges Found",
  description = (
    <span className="flex flex-col gap-1.5 items-center justify-center mt-1">
      <span className="text-[#162447] font-medium text-base">We couldn't spot any colleges matching your exact filters right now.</span>
      <span className="opacity-80">But our universe of top institutions is always expanding! <span className="inline-block animate-pulse">🚀</span> Try tweaking your search to explore other amazing options.</span>
    </span>
  ),
  onClearFilters,
  actionLabel = "Clear Filters"
}: EmptyStateProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center py-20 px-4 mt-8 rounded-3xl border border-[#edf0f9]">
      {/* The Illustration */}
      <div className="relative mb-8 flex justify-center items-center w-64 h-64">
        {/* Background circles */}
        <div 
            className="absolute w-full h-full bg-[#f0ecfc] rounded-full opacity-60 animate-pulse" 
            style={{ animationDuration: '3s' }}
        ></div>
        <div className="absolute w-44 h-44 bg-[#e5d5ff] rounded-full opacity-80"></div>
        
        {/* Floating Elements */}
        <div 
            className="absolute top-6 left-6 bg-white p-3 rounded-2xl shadow-lg border border-[#f0f2ff] animate-bounce" 
            style={{ animationDelay: '0ms', animationDuration: '3s' }}
        >
          <SearchX className="w-6 h-6 text-[#ff4b4b]" />
        </div>
        
        <div 
            className="absolute bottom-10 left-4 bg-white p-3 rounded-2xl shadow-lg border border-[#f0f2ff] animate-bounce" 
            style={{ animationDelay: '500ms', animationDuration: '3.5s' }}
        >
          <MapPinOff className="w-6 h-6 text-[#513392]" />
        </div>
        
        <div 
            className="absolute top-10 right-4 bg-white p-3 rounded-2xl shadow-lg border border-[#f0f2ff] animate-bounce" 
            style={{ animationDelay: '1000ms', animationDuration: '2.5s' }}
        >
          <Building className="w-6 h-6 text-[#767e92]" />
        </div>

        {/* Central Icon */}
        <div className="relative z-10 bg-white p-6 rounded-[32px] shadow-[0_20px_40px_rgba(81,51,146,0.12)] border border-[#f0f2ff]">
          <div className="bg-gradient-to-br from-[#513392] to-[#8064bd] w-20 h-20 rounded-2xl flex items-center justify-center shadow-inner">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <h3 className="w-full text-2xl md:text-3xl font-poppins font-bold text-[#162447] text-center mb-3">
        {title}
      </h3>
      <p className="w-full text-[#767e92] font-poppins text-center text-sm md:text-base leading-relaxed mb-8">
        {description}
      </p>
      
      {onClearFilters && (
        <button 
          onClick={onClearFilters}
          className="bg-[#513392] text-white px-8 py-3.5 rounded-full font-poppins font-medium hover:bg-[#3d2770] transition-all shadow-[0_8px_20px_rgba(81,51,146,0.2)] hover:shadow-[0_12px_24px_rgba(81,51,146,0.3)] hover:-translate-y-0.5 flex items-center gap-2"
        >
          <X className="w-4 h-4" />
          {actionLabel}
        </button>
      )}
    </div>
  );
}
