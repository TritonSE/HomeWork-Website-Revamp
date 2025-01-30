import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent z-50 flex justify-between items-center px-8 pt-6">
      {/* Logo */}
      <div className="flex items-center">
        <Image src="/logo.png" alt="Logo" width={176} height={98} priority />
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-10 text-lg font-semibold GolosText text-white ml-auto">
        {/* About Us with Dropdown */}
        <div
          className="relative"
          onMouseEnter={(_event: React.MouseEvent<HTMLDivElement>) => {
            setDropdownOpen(true);
          }}
          onMouseLeave={(_event: React.MouseEvent<HTMLDivElement>) => {
            setDropdownOpen(false);
          }}
        >
          <button
            className="hover:text-gray-400 focus:outline-none"
            onClick={() => {
              setDropdownOpen((prev) => !prev);
            }}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            About Us
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div
              className="absolute left-0 mt-2 w-64 bg-white text-black shadow-lg rounded-lg py-2"
              role="menu"
            >
              <Link href="/about" className="block px-4 py-2 hover:bg-gray-200" role="menuitem">
                About Us
              </Link>
              <Link href="/board" className="block px-4 py-2 hover:bg-gray-200" role="menuitem">
                Board Of Directors
              </Link>
              <Link
                href="/collaborators"
                className="block px-4 py-2 hover:bg-gray-200"
                role="menuitem"
              >
                Collaborating Partners
              </Link>
              <Link href="/contact" className="block px-4 py-2 hover:bg-gray-200" role="menuitem">
                Contact
              </Link>
            </div>
          )}
        </div>

        {/* Other Links */}
        <Link href="/services" className="hover:text-gray-400">
          What We Do
        </Link>
        <Link href="/involved" className="hover:text-gray-400">
          Get Involved
        </Link>

        {/* Stay Connected with Padding */}
        <Link href="/contact" className="hover:text-gray-400 pr-6">
          Stay Connected
        </Link>

        {/* Donate Button */}
        <Link
          href="/donate"
          className="w-[120px] h-[48px] flex items-center justify-center gap-1.5 px-6 py-3 
          bg-primary_orange text-white font-medium rounded-md hover:bg-[#d94e22] transition"
        >
          Donate
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
