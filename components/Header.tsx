"use client";

import { Menu, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth";

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const { logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white dark:bg-gray-950 dark:border-gray-800">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <button
            className="mr-2 md:hidden"
            onClick={onMenuClick}
            aria-label="Toggle Menu"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="font-bold text-xl">
            CustomerHub
          </div>
        </div>
        
        <button
          onClick={logout}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          title="Logout"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
