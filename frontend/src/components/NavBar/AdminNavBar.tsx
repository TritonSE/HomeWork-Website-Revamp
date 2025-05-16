"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthState } from "../../contexts/userContext";
const Navbar: React.FC = () => {
  const router = useRouter();
  const { loading, firebaseUser, logout } = useAuthState();
  const displayEmail = firebaseUser?.email;
  const displayName = firebaseUser?.displayName;
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen((o) => !o);
  };
  const handleSignOut = async () => {
    await logout();
    router.replace("/login");
  };
  return (
    <>
      <nav className="fixed top-0 left-0 z-50 flex flex-col px-8 h-screen w-[276px] border-r-2 border-[#f0ecec]">
        <div className="mx-auto mt-12">
          <Link href="/">
            <Image src="/logo-dark.png" alt="Logo" width={176} height={98} priority />
          </Link>
        </div>

        <div className="absolute top-1/3 text-[20px] font-GolosText text-[#1B1B1B] font-normal">
          {[
            {
              title: "Page Editor",
              href: "/page-editor",
              icon: "/images/adminNavBar/pageEditorIcon.svg",
            },
            {
              title: "Event Manager",
              href: "/events",
              icon: "/images/adminNavBar/eventManagerIcon.svg",
            },
            {
              title: "Mailing List",
              href: "/mailinglist",
              icon: "/images/adminNavBar/mailingListIcon.svg",
            },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="w-full px-6 py-3 mt-4 flex items-center hover:bg-[#D9D9D9] transition-colors duration-150 rounded-xl"
            >
              <Image
                src={item.icon}
                alt={`${item.title} icon`}
                width={16}
                height={16}
                className="mr-4"
              />
              {item.title}
            </Link>
          ))}
        </div>
        <div className="mt-auto mb-8">
          {open && (
            <div className=" w-48 bg-white border shadow-lg overflow-hidden">
              <Link
                href="/create-account"
                className="block px-4 py-2 hover:bg-gray-100 text-center"
              >
                Create an Account
              </Link>
              <Link
                href="/change-password"
                className="block px-4 py-2 hover:bg-gray-100 text-center"
              >
                Change Password
              </Link>
              <button
                onClick={() => void handleSignOut()}
                className="w-full px-4 py-2 hover:bg-gray-100 text-center"
              >
                Sign Out
              </button>
            </div>
          )}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={toggle}>
            <div className="flex flex-col">
              <span className="text-[20px] font-medium">
                {loading ? "Loading..." : firebaseUser ? displayName : "Not signed in"}
              </span>
              <span className="text-[16px] font-normal">{displayEmail}</span>
            </div>
            <Image
              src="/images/adminNavBar/downArrow.svg"
              alt="toggle arrow"
              width={16}
              height={16}
              className={`object-contain flex-shrink-0 transition-transform duration-150
              ${open ? "rotate-180" : ""}`}
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
