import { useState } from "react";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="dark:bg-gray-900">
      <div className="max-w-7xl flex items-center justify-between mx-auto p-4">
        {/* logo */}
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="./favicon.svg"
            className="h-8"
            alt="Employee Grading Logo"
          />
          <span className="self-center text-lg md:text-2xl font-semibold whitespace-nowrap dark:text-white">
            Employee Grading
          </span>
        </a>

        <div className="md:flex md:items-center md:justify-between md:gap-12">
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <ul className="font-medium flex items-center space-x-8 dark:text-white">
              <li>
                <a
                  href="#"
                  className="text-blue-700 dark:text-blue-500 hover:underline"
                >
                  Start Grading
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-700 dark:hover:text-blue-400"
                >
                  Progress
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-700 dark:hover:text-blue-400"
                >
                  How to Use
                </a>
              </li>
            </ul>
          </div>

          {/* Right side (theme + toggle button) */}
          <div className="flex items-center gap-2 md:gap-8">
            {/* Theme toggle (always visible) */}
            <ModeToggle />

            {/* Mobile menu toggle button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg 
                      md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 
                      dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                // Close icon
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Hamburger icon
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu (full width dropdown) */}
      <div
        className={`${
          isOpen ? "opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden transition-all duration-300 ease-in-out md:hidden absolute top-16 left-0 w-full bg-gray-50 scroll-auto 
          dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700`}
        style={{ height: "calc(100svh - 64px)" }}
      >
        <ul className="flex flex-col items-start p-4 space-y-2 font-semibold text-2xl">
          <li>
            <a
              href="#"
              className="block py-2 px-3 text-blue-700 dark:text-white rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Start Grading
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-3 text-gray-900 dark:text-white rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Progress
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-3 text-gray-900 dark:text-white rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              How to Use
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
