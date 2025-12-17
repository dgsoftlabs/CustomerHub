import { Menu } from "lucide-react";

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white dark:bg-gray-950 dark:border-gray-800">
      <div className="flex h-16 items-center px-4">
        <button
          className="mr-4 md:hidden"
          onClick={onMenuClick}
          aria-label="Toggle Menu"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="flex items-center gap-2 font-bold text-xl">
          CustomerHub
        </div>
      </div>
    </header>
  );
}
