"use client";
import Image from "next/image";
import Link from "next/link";
import { MouseEventHandler, useEffect, useState } from "react";

type DropdownContent = {
  title: string;
  href: string;
  links: { label: string; href: string }[];
};

const NavBarDropdown: React.FC<{
  content: DropdownContent;
  onClick: MouseEventHandler;
  isExpanded: boolean;
  closeNav: MouseEventHandler;
}> = ({ content, onClick, isExpanded, closeNav }) => {
  return (
    <div className="flex flex-col transition-all duration-300">
      <div className="flex flex-row">
        <Link href={content.href} onClick={closeNav}>
          {content.title}
        </Link>
        <div className="px-2 py-1 flex-grow" onClick={onClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="9"
            viewBox="0 0 14 9"
            fill="none"
            className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : "rotate-0"}`}
          >
            <path
              d="M6.14572 8.18192L-3.33786e-05 2.03617L1.53613 0.5L6.9138 5.87767L12.2915 0.5L13.8276 2.03617L7.68189 8.18192C7.47816 8.38559 7.20188 8.5 6.9138 8.5C6.62573 8.5 6.34945 8.38559 6.14572 8.18192Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
      {isExpanded && (
        <div className="mt-[12px] flex flex-col gap-[6px] text-[14px] transition-transform duration-300">
          {content.links.map((i) => {
            return (
              <Link href={i.href} key={i.label} onClick={closeNav}>
                {i.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

const MobileNavbar: React.FC<{ opaque?: boolean }> = ({ opaque = false }) => {
  const [dropdown, setDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(opaque);

  const body: DropdownContent[] = [
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
        { label: "Upcoming Events", href: "/calendar" },
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
  ];

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
        className={`overflow-hidden fixed top-0 left-0 w-screen flex flex-col z-50 py-4 px-5 transition-all duration-300
            ${isScrolled && !dropdown ? "bg-white shadow-md" : "bg-transparent"}
            ${dropdown ? "!bg-primary_orange max-h-[300px]" : "max-h-[75px]"}
            `}
      >
        <div className="w-full flex flex-row justify-between">
          <Link
            className={`transition-all duration-300 ${isScrolled && !dropdown ? "opacity-100" : "opacity-0"}`}
            href="/"
          >
            <Image
              src={`/logo-dark.png`} // Changes logo on scroll
              alt="Logo"
              width={80}
              height={40}
              priority
            />
          </Link>
          <div
            className="py-3"
            onClick={() => {
              setDropdown(!dropdown);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
            >
              <path
                d="M0 1.25C0 0.918479 0.131696 0.600537 0.366117 0.366117C0.600537 0.131696 0.918479 0 1.25 0H18.75C19.0815 0 19.3995 0.131696 19.6339 0.366117C19.8683 0.600537 20 0.918479 20 1.25C20 1.58152 19.8683 1.89946 19.6339 2.13388C19.3995 2.3683 19.0815 2.5 18.75 2.5H1.25C0.918479 2.5 0.600537 2.3683 0.366117 2.13388C0.131696 1.89946 0 1.58152 0 1.25ZM0 8.75C0 8.41848 0.131696 8.10054 0.366117 7.86612C0.600537 7.6317 0.918479 7.5 1.25 7.5H18.75C19.0815 7.5 19.3995 7.6317 19.6339 7.86612C19.8683 8.10054 20 8.41848 20 8.75C20 9.08152 19.8683 9.39946 19.6339 9.63388C19.3995 9.8683 19.0815 10 18.75 10H1.25C0.918479 10 0.600537 9.8683 0.366117 9.63388C0.131696 9.39946 0 9.08152 0 8.75ZM1.25 15C0.918479 15 0.600537 15.1317 0.366117 15.3661C0.131696 15.6005 0 15.9185 0 16.25C0 16.5815 0.131696 16.8995 0.366117 17.1339C0.600537 17.3683 0.918479 17.5 1.25 17.5H18.75C19.0815 17.5 19.3995 17.3683 19.6339 17.1339C19.8683 16.8995 20 16.5815 20 16.25C20 15.9185 19.8683 15.6005 19.6339 15.3661C19.3995 15.1317 19.0815 15 18.75 15H1.25Z"
                fill={isScrolled && !dropdown ? "black" : "white"}
              />
            </svg>
          </div>
        </div>
        <div className="mt-[20px] flex flex-col gap-[16px] font-golos text-white transition-transform">
          {body.map((content, index) => (
            <NavBarDropdown
              key={`${index}${content.title}`}
              content={content}
              onClick={() => {
                setActiveTab(activeTab === content.title ? null : content.title);
              }}
              isExpanded={activeTab === content.title}
              closeNav={() => {
                setDropdown(false);
              }}
            />
          ))}
        </div>
      </nav>
    </>
  );
};

export default MobileNavbar;
