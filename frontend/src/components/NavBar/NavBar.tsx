import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent z-50 flex justify-between items-center px-8 py-4">
      {/* Logo */}
      <div className="flex items-center">
        <Image src="/logo.png" alt="Logo" width={176} height={98} priority />
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-10 text-lg font-semibold text-white ml-auto">
        {/* Dropdown Structure */}
        {[
          { title: "About Us", links: [{ label: "Our Team", href: "/our-team" }] },
          { title: "What We Do", links: [{ label: "Resources", href: "/resources" }] },
          {
            title: "Get Involved",
            links: [
              { label: "Upcoming Events", href: "/events" },
              { label: "Donate", href: "/donate" },
            ],
          },
          {
            title: "Stay Connected",
            links: [
              { label: "News & Past Events", href: "/news" },
              { label: "Contact", href: "/contact" },
            ],
          },
        ].map((item) => (
          <div
            key={item.title}
            className="relative"
            onMouseEnter={() => {
              setActiveDropdown(item.title);
            }}
            onMouseLeave={() => {
              setActiveDropdown(null);
            }}
          >
            <button className="hover:text-gray-300 focus:outline-none">{item.title}</button>

            {/* Dropdown Menu */}
            {activeDropdown === item.title && (
              <div className="absolute left-0 mt-2 w-auto min-w-[126px] bg-white text-black shadow-lg py-2 border border-gray-200 rounded-none">
                {item.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Donate Button */}
        <Link
          href="/donate"
          className="w-[120px] h-[48px] flex items-center justify-center px-6 py-3 
          bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition mt-[-10px]"
        >
          Donate
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
