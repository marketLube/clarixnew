import React from "react";

// Figma image assets
const loginImage = "/images/Login-illu.png";
const logoGroup = "/images/log.png";

export const AuthRightPanel: React.FC = () => {
  return (
    <div className="hidden lg:flex lg:w-[512px] xl:w-[25%] bg-[#513392] relative overflow-hidden">
      <div className="flex flex-col items-center justify-between w-full h-full px-8 pt-8 relative z-10">
        {/* Logo */}
        <div className="pt-[80px]">
          <div className="border border-white/70 rounded-full px-8 py-1.5 shadow-[0px_0px_0px_2px_white,0px_12px_8px_0px_rgba(0,0,0,0.03)] bg-white">
            <div className="h-[50px] w-[130px] relative">
              <img
                src={logoGroup}
                alt="Clarix Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Headline Text */}
        <div className="text-center flex-1 flex items-center justify-center mb-[100px]">
          <p className="font-helvetica font-medium text-[48px] leading-[48px] text-white tracking-[-0.96px] max-w-[410px]">
            Your education journey starts here.
          </p>
        </div>

        {/* Login Illustration */}
        <div className="mt-auto w-full max-w-[500px] h-[300px] relative mb-0 self-end">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0">
              <img
                src={loginImage}
                alt="Login Illustration"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
