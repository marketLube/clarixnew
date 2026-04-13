"use client";

import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

export interface MatrixItem {
  value: number | string;
  label: string;
  change?: number;
  color?: string;
  icon?: LucideIcon;

}

interface SectionMatrixProps {
  items: MatrixItem[];
  width?: string
}

export function SectionMatrix({ items, width = "140px" }: SectionMatrixProps) {
  const formatValue = (value: number | string) => {
    if (typeof value === "number") {
      return value.toLocaleString();
    }
    return value;
  };

  const formatChange = (change: number) => {
    const sign = change >= 0 ? "+" : "";
    return `${sign}${change}%`;
  };

  const getDefaultStyle = (change: number) => {
    const isIncrease = change >= 0;
    return {
      color: isIncrease ? "#0dba85" : "#a01e1e",
      icon: isIncrease ? TrendingUp : TrendingDown,
    };
  };

  return (
    <div className="flex items-center">
      {items?.map((item, index) => {
        const defaultStyle = getDefaultStyle(item?.change || 0);
        const Icon = item.icon || defaultStyle.icon;
        const color = item.color || defaultStyle.color;
        const isLast = index === items.length - 1;
        const isFirst = index === 0;

        return (
          <div key={index} className="flex items-center">
            <div
              className={`flex flex-col items-start py-2 rounded-lg w-${width} ${isFirst ? "pl-0 pr-3" : "px-3"
                }`}
            >
              <div className="flex flex-col gap-1.5 items-start w-full">
                <div className="flex gap-3 items-center w-full">
                  <p className="font-semibold leading-6 text-[24px] text-[#364440] whitespace-nowrap">
                    {formatValue(item.value)}
                  </p>
                  <div className="flex gap-1 items-center">
                    {(item.icon || item.change !== undefined) && (
                      <div
                        className="rounded-md size-4 flex items-center justify-center"
                        style={{ backgroundColor: color }}
                      >
                        <Icon className="size-3 text-white" />
                      </div>
                    )}
                    {
                      item.change && <p
                        className="font-medium leading-5 text-xs whitespace-nowrap"
                        style={{ color }}
                      >
                        {formatChange(item?.change)}
                      </p>
                    }
                  </div>
                </div>
                <p className="font-medium leading-4 text-xs text-[#868f8b] w-full">
                  {item.label}
                </p>
              </div>
            </div>

            {!isLast && (
              <div className="h-8 w-px bg-[#aac4bc] mx-2 flex-shrink-0"></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
