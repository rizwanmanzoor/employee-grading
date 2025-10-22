import { useState } from "react";
import { ModeToggle } from "../mode-toggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b border-border bg-background text-foreground transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* logo */}
        <a href="#" className="flex items-center gap-3">
          <img
            src="./favicon.svg"
            className="h-8"
            alt="Employee Grading Logo"
          />
          <span className="text-lg md:text-2xl font-semibold">
            Employee Grading
          </span>
        </a>

        <div className="md:flex md:items-center md:justify-between md:gap-12">
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <ul className="flex items-center gap-8 font-medium">
              <li>
                <a
                  href="#"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  Start Grading
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  Progress
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  How to Use
                </a>
              </li>
            </ul>
          </div>

          {/* right side theme toggle */}
          <div className="flex items-center gap-2 md:gap-8">
            {/* Theme toggle (always visible) */}
            <ModeToggle />

            {/* Mobile menu toggle button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-muted-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring md:hidden"
            >
              <span className="sr-only">Toggle menu</span>
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
        className={`md:hidden absolute left-0 w-full bg-background border-t border-border transition-all duration-300 ease-in-out 
          ${
            isOpen
              ? "opacity-100 max-h-screen"
              : "opacity-0 max-h-0 overflow-hidden"
          } bg-popover`}
        style={{
          height: "calc(100svh - 64px)",
          overflowY: isOpen ? "auto" : "hidden",
        }}
      >
        <ul className="flex flex-col items-start p-4 space-y-2 font-semibold text-2xl">
          <li>
            <a
              href="#"
              className="block py-2 px-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Start Grading
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Progress
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
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
