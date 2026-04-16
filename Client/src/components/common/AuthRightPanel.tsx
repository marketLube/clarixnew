import React from "react";
import Image from "next/image";

// Figma image assets
const loginImage = "/images/Login-illu.png";
const logoGroup = "/images/log.png";

export const AuthRightPanel: React.FC = () => {
  return (
    <div className="hidden lg:flex lg:w-[460px] xl:w-[25%] bg-[#513392] relative overflow-hidden">
      <div className="flex flex-col items-center justify-between w-full h-full px-6 xl:px-8 pt-6 xl:pt-8 relative z-10">
        {/* Logo */}
        <div className="pt-[40px] xl:pt-[60px]">
          <div className="border border-white/70 rounded-full px-6 xl:px-8 py-1.5 shadow-[0px_0px_0px_2px_white,0px_12px_8px_0px_rgba(0,0,0,0.03)] bg-white">
            <div className="h-[44px] xl:h-[50px] w-[110px] xl:w-[130px] relative">
              <Image
                src={logoGroup}
                alt="Clarix Education logo"
                fill
                className="object-contain"
                sizes="130px"
              />
            </div>
          </div>
        </div>

        {/* Headline Text */}
        <div className="text-center flex-1 flex items-center justify-center mb-[60px] xl:mb-[100px]">
          <p className="font-poppins font-medium text-[28px] lg:text-[32px] xl:text-[40px] leading-[1.15] text-white tracking-[-0.4px] xl:tracking-[-0.8px] max-w-[400px]">
            Your education journey starts here.
          </p>
        </div>

        {/* Login Illustration */}
        <div className="mt-auto w-full max-w-[500px] h-[240px] xl:h-[300px] relative mb-0 self-end">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src={loginImage}
                alt="Students exploring education opportunities on Clarix platform"
                fill
                className="object-contain"
                sizes="500px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
