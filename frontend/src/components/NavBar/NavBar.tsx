import { Button } from "@tritonse/tse-constellation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar: React.FC<{ opaque?: boolean }> = ({ opaque = false }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(opaque);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(opaque || window.scrollY > 250); //header length
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {
        /*If opaque, render padding: literally just a dummy navbar*/
        opaque ? <div className="w-[176px] h-[98px]" /> : <></>
      }
      <nav
        className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src={isScrolled ? "/logo-dark.png" : "/logo.png"} // Changes logo on scroll
              alt="Logo"
              width={176}
              height={98}
              priority
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <div
          className={`hidden md:flex space-x-10 text-[16px] font-GolosText font-semibold ml-auto transition-all duration-300 ${
            isScrolled ? "text-[#525252EE]" : "text-white"
          }`}
        >
          {[
            {
              title: "About Us",
              href: "/about-us",
              links: [{ label: "Our Team", href: "/our-team" }],
            },
            {
              title: "What We Do",
              href: "/what-we-do",
              links: [],
            },
            {
              title: "Get Involved",
              href: "/get-involved",
              links: [
                { label: "Upcoming Events", href: "/events" },
                { label: "Donate", href: "/donate" },
              ],
            },
            {
              title: "Stay Connected",
              href: "/stay-connected",
              links: [
                { label: "News & Past Events", href: "/events-archive" },
                { label: "Contact", href: "/contact" },
              ],
            },
          ].map((item) => (
            <div
              key={item.title}
              className="relative group"
              onMouseEnter={() => {
                setActiveDropdown(item.title);
              }}
              onMouseLeave={() => {
                setActiveDropdown(null);
              }}
            >
              <Link href={item.href}>
                <button className="w-full h-full px-6 py-9 focus:outline-none group-hover:underline decoration-2 underline-offset-4">
                  {item.title}
                </button>
              </Link>

              {activeDropdown === item.title && item.links.length > 0 && (
                <div className="absolute left-0 mt-2 w-auto min-w-[126px] bg-white text-[#525252EE] font-GolosText shadow-lg py-2 border border-gray-200 rounded-none">
                  <div className="absolute -top-2 left-0 w-full h-4"></div>

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
            className="w-[120px] h-[48px] flex items-center justify-center transition mt-5"
          >
            <Button>Donate</Button>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
