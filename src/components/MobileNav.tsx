import React from "react";
import Image from "next/image";

const MobileNav = () => {
  return (
    <nav className="hidden sm:flex gap-[1.4rem]">
      <button>
        <Image src={"/setting.svg"} width={20} height={20} alt="settings" />
      </button>
      <button>
        <Image src={"/bel.svg"} width={20} height={20} alt="notification" />
      </button>
      <button>
        <Image src={"/avatar.png"} width={40} height={40} alt="avatar" />
      </button>
    </nav>
  );
};

export default MobileNav;
