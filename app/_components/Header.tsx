"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUser, SignInButton } from "@clerk/nextjs";
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
  const {user} = useUser();
  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex gap-2 items-center">
        {/* logo   */}
        <img src="/logo.svg" alt="Logo" width={30} height={30} />
        <h2 className="font-bold text-2xl">AI Trip Planner</h2>
      </div>
      <div className="flex gap-8 items-center">
        {/* menu options */}
        {menuOptions.map((menu, index) => (
          <Link href={menu.path}>
            <h2 className="text-lg hover:scale-105 transition-all hover:text-primary">
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>

      {/* get started button  */}
       {!user? <SignInButton mode="modal">
      <Button>Get Started</Button>
      </SignInButton>:
    <Link href="/create-trip">
      <Button>Create new Trip</Button>
      </Link>}
    </div>
  );
}

export default Header;
