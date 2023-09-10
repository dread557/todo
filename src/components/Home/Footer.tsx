"use client";
import { TodoContext } from "@/contexts/TodoContext";
import Image from "next/image";
import React, { useContext } from "react";

const Footer = () => {
  const todoContext = useContext(TodoContext);
  if (!todoContext) {
    return null;
  }
  const { setShowModal } = todoContext;
  return (
    <div
      className="flex sm:hidden absolute bottom-[30px] w-[94%] left-[3%] justify-between items-center h-[4.8rem] px-4 sm:px-16 border rounded-lg border-gray-300 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] cursor-pointer"
      onClick={() => setShowModal(true)}
    >
      <span className="text-[#475467]">Input task</span>
      <Image src={"/microphone-01.svg"} alt="mic" width={24} height={24} />
    </div>
  );
};

export default Footer;
