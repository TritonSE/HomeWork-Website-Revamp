"use client";

import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import React from "react";

import Facebook from "@/../public/images/facebook.svg";
import AdminLogin from "@/../public/images/adminLogin.svg";
import Logo from "@/../public/images/homeworkLogo.png";
import Instagram from "@/../public/images/instagram.svg";

type LinkProps = {
  text: string;
  url: string;
  isHeader?: boolean;
};

const FooterLink: React.FC<{ links: LinkProps[] }> = ({ links }) => {
  return (
    <div
      className="
            flex flex-col justify-start gap-5 basis-5/12 md:basis-auto 
            w-1/5 
            text-sm md:text-base"
    >
      {links.map((link, index) => (
        <a
          key={index}
          href={link.url}
          className={`text-white ${link.isHeader ? "font-semibold" : ""}`}
        >
          {link.text}
        </a>
      ))}
    </div>
  );
};

type SocialMediaIconProps = {
  icon: StaticImport;
  iconAlt: string;
  iconUrl: string;
};

const SocialMediaIcon: React.FC<SocialMediaIconProps> = ({ icon, iconAlt, iconUrl }) => {
  return (
    <a href={iconUrl} className="relative w-1/12 h-8 flex-shrink">
      <Image src={icon} alt={iconAlt} layout="fill" objectFit="contain" />
    </a>
  );
};

/**
 * Component to render the footer section of the website
 *
 * Needs to be updated to include real social media icons and page links
 */
export const Footer = () => {
  // Placeholder links for page links
  const aboutUsLinks: LinkProps[] = [
    { text: "About Us", url: "#", isHeader: true },
    { text: "Our Team", url: "#" },
  ];

  const whatWeDoLinks: LinkProps[] = [
    { text: "What We Do", url: "#", isHeader: true },
    { text: "Resources", url: "#" },
  ];

  const getInvolvedLinks: LinkProps[] = [
    { text: "Get Involved", url: "#", isHeader: true },
    { text: "Upcoming Events", url: "#" },
    { text: "Donate", url: "#" },
  ];

  const stayConnectedLinks: LinkProps[] = [
    { text: "Stay Connected", url: "#", isHeader: true },
    { text: "News & Past Events", url: "#" },
    { text: "Contact Us", url: "#" },
  ];

  // Placeholder for social media links
  const FacebookIcon: SocialMediaIconProps = {
    icon: Facebook as StaticImport,
    iconAlt: "Facebook Icon",
    iconUrl: "#",
  };

  const InstagramIcon: SocialMediaIconProps = {
    icon: Instagram as StaticImport,
    iconAlt: "Instagram Icon",
    iconUrl: "#",
  };

  // Placeholder for admin login functionality
  const handleAdminLoginClick = () => {
    console.log("Admin login clicked");
  };

  return (
    <div className="bg-black p-10 text-white font-golos">
      {/* Top row of footer */}
      <div className="w-full h-fit flex flex-row justify-between gap-5 mb-7 text-sm md:text-base">
        {/* Container for subscribe section */}
        <div className="flex flex-col justify-start w-full">
          <form className="flex flex-col gap-3 w-full">
            <p className="mb-2">Subscribe to our newsletter to stay updated!</p>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="p-2 w-full max-w-md text-black"
            />
            <label htmlFor="fullName" className="sr-only">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Full Name"
              className="p-2 mt-2 w-full max-w-md text-black"
            />
            <button
              type="submit"
              className="w-1/3 min-w-fit max-w-32 mt-2 p-2 bg-orange-600 rounded text-white text-sm"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Container for page link section */}
        <div className="flex flex-row flex-wrap gap-y-5 justify-evenly gap-2 sm:gap-4 w-full">
          <FooterLink links={aboutUsLinks} />
          <FooterLink links={whatWeDoLinks} />
          <FooterLink links={getInvolvedLinks} />
          <FooterLink links={stayConnectedLinks} />
        </div>
      </div>
      {/* Bottom row of footer */}
      <div className="w-full h-fit flex flex-row justify-between items-center">
        {/* Social media and miscelaneous info section */}
        <div className="flex flex-col gap-5 text-xs md:text-sm">
          <div className="flex flex-row justify-start items-center gap-4 w-full h-full">
            <SocialMediaIcon {...FacebookIcon} />
            <SocialMediaIcon {...InstagramIcon} />
            <p>
              FKA: Building Justice <br />
              DBA: Homework SD <br />
              Nonprofit EIN: 84-3930979
            </p>
          </div>
          <p>Copyright © 2025 Homework - All rights reserved.</p>
          <button
            onClick={handleAdminLoginClick}
            className="
                            flex flex-row justify-center items-center gap-1 
                            pt-1 pb-1 w-5/12 border border-gray-400 rounded-2xl 
                            text-gray-400"
          >
            <div className="relative w-3 h-3">
              <Image
                src={AdminLogin as StaticImport}
                alt="Admin login logo"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <p>Admin Login</p>
          </button>
        </div>
        {/* Homework Logo */}
        <div className="relative w-1/3 h-44">
          <Image src={Logo as StaticImport} alt="Homework logo" layout="fill" objectFit="contain" />
        </div>
      </div>
    </div>
  );
};
