import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
const menuOptions = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Pricing",
    path: "/pricing",
  },
  {
    name: "Contact us",
    path: "/contact-us",
  },
];
function Header() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        {/* logo   */}
        <img src="/logo.svg" alt="Logo" width={30} height={30} />
        <h2 className="font-bold text-2xl">Ai Trip Planner</h2>
      </div>
      <div className="flex gap-8 items-center">
        {/* menu options */}
        {menuOptions.map((menu, index) => (
          <Link href={menu.path}>
            <h2 className="text-lg hover:scale-105 transition-all">
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>

      {/* get started button  */}

      <Button>Get started</Button>
    </div>
  );
}

export default Header;
