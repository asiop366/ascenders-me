"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { routes } from "@/config/routes";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";

export function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="border-b border-zinc-800 bg-black">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href={routes.home} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Image 
            src="/logo.png" 
            alt="Ascenders Logo" 
            width={40} 
            height={40}
            className="rounded-lg"
          />
          <span className="text-2xl font-bold">Ascenders</span>
        </Link>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center justify-center font-bold">
              U
            </div>
            <ChevronDown className="w-4 h-4" />
          </button>

          {isDropdownOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsDropdownOpen(false)}
              />

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg z-20">
                <div className="p-3 border-b border-zinc-800">
                  <div className="font-medium">Username</div>
                  <div className="text-sm text-gray-400">user@example.com</div>
                </div>

                <div className="py-2">
                  <Link
                    href={routes.user("username")}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-zinc-800 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>

                  <Link
                    href={routes.settings}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-zinc-800 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </Link>

                  <div className="border-t border-zinc-800 my-2" />

                  <button
                    onClick={() => {
                      // TODO: Implement sign out logic
                      console.log("Sign out");
                      setIsDropdownOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-zinc-800 transition-colors w-full text-left text-red-400"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
