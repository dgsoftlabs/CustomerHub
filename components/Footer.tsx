import { Heart, Github, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-white dark:bg-gray-950 dark:border-gray-800">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          {/* About Section */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">CustomerHub</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              A modern customer management solution built with Next.js and Drizzle ORM.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Quick Links</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                  Customers
                </Link>
              </li>
              <li>
                <Link href="/settings" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                  Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Connect</h3>
            <div className="flex gap-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                title="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="mailto:contact@customerhub.com" 
                className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                title="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t dark:border-gray-800 pt-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} CustomerHub by <a href="https://dgsoftlabs.com" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-blue-500 dark:hover:text-blue-400">DGSoftLabs</a>. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
            Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
