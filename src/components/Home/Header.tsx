"use client";
import { getGreeting } from "@/lib/greeting";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import MobileNav from "../MobileNav";
import Button from "../UI/Button";

const Header = () => {
  const [screenSize, setscreenSize] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [showMenu, setShowMenu] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => setscreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize >= 640) {
      setShowMenu(false);
    }
  }, [screenSize]);
  return (
    <header className="py-8 px-4 sm:px-16 mt-12">
      <nav className="flex justify-between  text-[2.4rem] font-bold">
        <h1>ToDo</h1>
        <button onClick={() => setShowMenu(!showMenu)}>
          <Image
            className="block sm:hidden"
            src={!showMenu ? "/menu.svg" : "/close.svg"}
            alt="menu"
            width={24}
            height={24}
          />
        </button>
        <MobileNav />
      </nav>
      {/* mobile menu */}
      {showMenu && (
        <ul className="flex items-center pt-24 flex-col gap-16 text-5xl text-[#3F5BF6] font-semibold h-[90vh] bg-[rgba(63,91,246,0.25)]">
          <li>Profile</li>
          <li>Settings</li>
          <li>Notifications</li>
        </ul>
      )}
    </header>
  );
};

export default Header;
