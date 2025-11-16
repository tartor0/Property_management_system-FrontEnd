import { HiHome, HiMenu, HiX } from "react-icons/hi";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-800/90 backdrop-blur-sm font-poppins shadow-lg py-4 px-6 md:px-12 transition-all duration-300">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-cyan-500 flex items-center gap-2">
          <HiHome className="w-6 h-6" />
          Tartor's Properties
        </h1>

        <ul className="hidden md:flex text-white gap-8">
          <li>
            <a
              href="/"
              className="hover:text-cyan-400 transition-colors duration-300"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#properties"
              className="hover:text-cyan-400 transition-colors duration-300"
            >
              Properties
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="hover:text-cyan-400 transition-colors duration-300"
            >
              About
            </a>
          </li>
        </ul>

        {/*Contact Button */}
        <a
          href="/contact"
          className="hidden md:inline-block text-white bg-cyan-500 px-5 py-2 rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
        >
          Contact Us
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white text-3xl"
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden mt-4 bg-gray-800 rounded-xl p-5 space-y-4 text-white animate-fadeIn">
          <a href="/" className="block hover:text-cyan-400 transition-colors">
            Home
          </a>
          <a
            href="/properties"
            className="block hover:text-cyan-400 transition-colors"
          >
            Properties
          </a>
          <a
            href="/about"
            className="block hover:text-cyan-400 transition-colors"
          >
            About
          </a>
          <a
            href="/contact"
            className="block text-center bg-cyan-500 py-2 rounded-xl hover:scale-105 transition-transform"
          >
            Contact Us
          </a>
        </div>
      )}
    </nav>
  );
}
