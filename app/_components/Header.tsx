"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUser, SignInButton, useClerk } from "@clerk/nextjs";
import { Moon, Sun, User, LogOut, Settings, CreditCard, ChevronDown } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

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
  const { signOut } = useClerk();
  const { theme, toggleTheme } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setIsProfileOpen(false);
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-900 border-b dark:border-gray-800 transition-colors">
      <div className="flex gap-2 items-center">
        {/* logo   */}
        <img src="/logo.svg" alt="Logo" width={30} height={30} />
        <h2 className="font-bold text-2xl dark:text-white">AI Trip Planner</h2>
      </div>
      <div className="flex gap-8 items-center">
        {/* menu options */}
        {menuOptions.map((menu) => (
          <Link key={menu.path} href={menu.path}>
            <h2 className="text-lg hover:scale-105 transition-all hover:text-primary dark:text-gray-300 dark:hover:text-primary">
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-3">
        {/* Theme toggle button */}
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="relative dark:border-gray-700 dark:hover:bg-gray-800"
          title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>

        {/* User section */}
        {!user ? (
          <SignInButton mode="modal">
            <Button>Get Started</Button>
          </SignInButton>
        ) : (
          <div className="flex items-center gap-3">
            <Link href="/create-new-trip">
              <Button>Create new Trip</Button>
            </Link>
            
            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <img
                  src={user.imageUrl}
                  alt={user.fullName || "User"}
                  className="w-9 h-9 rounded-full border-2 border-primary"
                />
                <ChevronDown className={`h-4 w-4 text-gray-600 dark:text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 py-2 z-50">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.imageUrl}
                        alt={user.fullName || "User"}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white truncate">
                          {user.fullName}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {user.primaryEmailAddress?.emailAddress}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <Link href="/profile">
                      <button
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        <span>My Profile</span>
                      </button>
                    </Link>

                    <Link href="/my-trips">
                      <button
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Settings className="h-4 w-4" />
                        <span>My Trips</span>
                      </button>
                    </Link>

                    <Link href="/subscription">
                      <button
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <CreditCard className="h-4 w-4" />
                        <span>Subscription</span>
                      </button>
                    </Link>
                  </div>

                  {/* Logout */}
                  <div className="border-t dark:border-gray-700 pt-2">
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
