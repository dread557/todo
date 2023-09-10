import React, { ReactNode } from "react";

interface CustomButtonProps {
  children: ReactNode;
  onClick: () => void;
  mode: "primary" | "secondary";
  width: string;
  height?: string;
  className?: string;
  type?: "submit" | "button" | "reset" | undefined;
}

const Button: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  mode,
  width,
  height,
  className,
  type,
}) => {
  return (
    <button
      className={`${
        mode === "primary"
          ? "bg-custom-blue text-white"
          : "bg-white text-gray-700 border"
      } flex items-center justify-center font-semibold rounded-lg gap-2 text-[1.4rem] ${className}`}
      style={{
        width: width,
        height: height ? height : "4rem",
      }}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
