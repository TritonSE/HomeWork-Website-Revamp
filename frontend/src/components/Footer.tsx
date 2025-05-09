// // "use client";

// // //import { StaticImport } from "next/dist/shared/lib/get-img-props";
// // import Image from "next/image";
// // import Link from "next/link";
// // import React, { useState } from "react";

// // import { post } from "../api/requests";

// // //import AdminLogin from "@/../public/images/adminLogin.svg";
// // //import Facebook from "@/../public/images/facebook.svg";
// // //import Logo from "@/../public/images/homeworkLogo.png";
// // //import Instagram from "@/../public/images/instagram.svg";

// // type LinkProps = {
// //   text: string;
// //   url: string;
// //   isHeader?: boolean;
// // };

// // type ErrorMessage = {
// //   message: string;
// // };

// // const FooterLink: React.FC<{ links: LinkProps[] }> = ({ links }) => {
// //   return (
// //     <div
// //       className="
// //             flex flex-col justify-start gap-3.5 sm:gap-5 basis-5/12 md:basis-auto
// //             w-1/5
// //             text-base"
// //     >
// //       {links.map((link, index) => (
// //         <Link
// //           key={index}
// //           href={link.url}
// //           className={`text-white ${link.isHeader ? "font-semibold" : ""}`}
// //         >
// //           {link.text}
// //         </Link>
// //       ))}
// //     </div>
// //   );
// // };

// // type SocialMediaIconProps = {
// //   icon: string;
// //   iconAlt: string;
// //   iconUrl: string;
// // };

// // const SocialMediaIcon: React.FC<SocialMediaIconProps> = ({ icon, iconAlt, iconUrl }) => {
// //   return (
// //     <a href={iconUrl} className="relative sm:w-1/12 w-1/6 h-8 flex-shrink">
// //       <Image src={icon} alt={iconAlt} fill className="object-contain" />
// //     </a>
// //   );
// // };

// // const SubscriptionForm: React.FC = () => {
// //   const [email, setEmail] = useState("");
// //   const [fullName, setFullName] = useState("");
// //   const [formResult, setFormResult] = useState({ success: false, result: "" });
// //   const [showMessage, setShowMessage] = useState(false);

// //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
// //     e.preventDefault();

// //     const nameParts = fullName.trim().split(" ");
// //     if (nameParts.length < 2) {
// //       setFormResult({
// //         success: false,
// //         result: "Please enter your full name (first and last name).",
// //       });
// //       setShowMessage(true);
// //       setTimeout(() => {
// //         setShowMessage(false);
// //       }, 5000);
// //       return;
// //     }

// //     const firstName = nameParts[0];
// //     const lastName = nameParts.slice(1).join(" ");
// //     try {
// //       // response is never used
// //       const _ = await post("/subscriptions/create", {
// //         firstname: firstName,
// //         lastname: lastName,
// //         email,
// //       });
// //       setFormResult({ success: true, result: "Sucessfully subscribed!" });
// //       setEmail("");
// //       setFullName("");
// //     } catch (error) {
// //       const errorText = (error as Error).message;
// //       // gets the actual message for cause of errorring
// //       let message = errorText;
// //       try {
// //         const errorJSON = JSON.parse(errorText.split(": ")[1]) as ErrorMessage;
// //         message = errorJSON.message;
// //       } finally {
// //         console.error("Error creating subscription", errorText);
// //         setFormResult({ success: false, result: message });
// //       }
// //     }

// //     setShowMessage(true);

// //     setTimeout(() => {
// //       setShowMessage(false);
// //     }, 5000);
// //   };

// //   return (
// //     <div className="flex flex-col justify-start w-full">
// //       <form
// //         onSubmit={(e) => {
// //           void handleSubmit(e);
// //         }}
// //         className="flex flex-col gap-3 w-full"
// //       >
// //         <p className="mb-2">Subscribe to our newsletter to stay updated!</p>
// //         <label htmlFor="email" className="sr-only">
// //           Email
// //         </label>
// //         <input
// //           type="email"
// //           id="email"
// //           placeholder="Email"
// //           className="p-2 w-full sm:max-w-md text-black"
// //           required
// //           value={email}
// //           onChange={(e) => {
// //             setEmail(e.target.value);
// //           }}
// //         />
// //         <label htmlFor="fullName" className="sr-only">
// //           Full Name
// //         </label>
// //         <input
// //           type="text"
// //           id="fullName"
// //           placeholder="Full Name"
// //           className="p-2 mt-2 w-full sm:max-w-md text-black"
// //           value={fullName}
// //           onChange={(e) => {
// //             setFullName(e.target.value);
// //           }}
// //         />
// //         <div className="flex flex-row gap-3 items-center">
// //           <button
// //             type="submit"
// //             className="w-1/3 min-w-fit max-w-32 mt-2 p-2 bg-orange-600 rounded text-white text-sm"
// //           >
// //             Subscribe
// //           </button>
// //           <p className={`${showMessage ? "opacity-100" : "opacity-0"} transition-opacity text-sm`}>
// //             {formResult.result}
// //           </p>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // const AdminLoginButton: React.FC = () => {
// //   return (
// //     <Link
// //       href="/login"
// //       className="
// //                 flex flex-row justify-center items-center gap-1
// //                 p-1.5 w-fit sm:5/12 border border-gray-400 rounded-2xl
// //                 text-gray-400 text-sm"
// //     >
// //       <div className="relative w-3 h-3">
// //         <Image
// //           src="/images/adminLogin.svg"
// //           alt="Admin login logo"
// //           fill
// //           className="object-contain"
// //         />
// //       </div>
// //       <p>Admin Login</p>
// //     </Link>
// //   );
// // };

// // const HomeworkIcon: React.FC = () => {
// //   return (
// //     <div className="relative w-full sm:w-1/3 h-44">
// //       <Image src="/images/white-logo.png" alt="Homework logo" fill className="object-contain" />
// //     </div>
// //   );
// // };

// // /**
// //  * Component to render the footer section of the website
// //  *
// //  * Needs to be updated to include real social media icons and page links
// //  */
// // export const Footer = () => {
// //   // Placeholder links for page links
// //   const aboutUsLinks: LinkProps[] = [
// //     { text: "About Us", url: "/about-us", isHeader: true },
// //     { text: "Our Team", url: "/our-team" },
// //   ];

// //   const whatWeDoLinks: LinkProps[] = [
// //     { text: "What We Do", url: "/what-we-do", isHeader: true },
// //     { text: "Resources", url: "/resources" },
// //   ];

// //   const getInvolvedLinks: LinkProps[] = [
// //     { text: "Get Involved", url: "/get-involved", isHeader: true },
// //     { text: "Upcoming Events", url: "/calendar" },
// //     { text: "Donate", url: "/donate" },
// //   ];

// //   const stayConnectedLinks: LinkProps[] = [
// //     { text: "Stay Connected", url: "/stay-connected", isHeader: true },
// //     { text: "News & Past Events", url: "/events-archive" },
// //     { text: "Contact Us", url: "/contact-us" },
// //   ];

// //   // Placeholder for social media links
// //   const facebookIcon: SocialMediaIconProps = {
// //     icon: "/images/facebook.svg",
// //     iconAlt: "Facebook Icon",
// //     iconUrl: "#",
// //   };

// //   const instagramIcon: SocialMediaIconProps = {
// //     icon: "/images/instagram.svg",
// //     iconAlt: "Instagram Icon",
// //     iconUrl: "#",
// //   };

// //   return (
// //     <div className="bg-black p-10 text-white font-golos">
// //       {/* Desktop/Tablet layout */}
// //       <div className="hidden sm:block">
// //         <div className="w-full h-fit flex flex-row justify-between gap-5 mb-7 text-base">
// //           <SubscriptionForm />
// //           <div className="flex flex-row flex-wrap gap-y-5 justify-evenly gap-2 sm:gap-4 w-full">
// //             <FooterLink links={aboutUsLinks} />
// //             <FooterLink links={whatWeDoLinks} />
// //             <FooterLink links={getInvolvedLinks} />
// //             <FooterLink links={stayConnectedLinks} />
// //           </div>
// //         </div>
// //         <div className="w-full h-fit flex flex-row justify-between items-center">
// //           <div className="flex flex-col gap-5 text-sm">
// //             <div className="flex flex-row justify-start items-center gap-4 w-full h-full">
// //               <SocialMediaIcon {...facebookIcon} />
// //               <SocialMediaIcon {...instagramIcon} />
// //               <p>
// //                 FKA: Building Justice <br />
// //                 DBA: Homework SD <br />
// //                 Nonprofit EIN: 84-3930979
// //               </p>
// //             </div>
// //             <p>Copyright © 2025 Homework - All rights reserved.</p>
// //             <AdminLoginButton />
// //           </div>
// //           <HomeworkIcon />
// //         </div>
// //       </div>

// //       {/* Mobile Layout */}
// //       <div className="block sm:hidden">
// //         <div className="flex flex-col gap-7">
// //           <HomeworkIcon />
// //           <SubscriptionForm />
// //           <div className="flex flex-row flex-wrap gap-y-7 justify-around gap-5 w-full">
// //             <FooterLink links={aboutUsLinks} />
// //             <FooterLink links={whatWeDoLinks} />
// //             <FooterLink links={getInvolvedLinks} />
// //             <FooterLink links={stayConnectedLinks} />
// //           </div>

// //           <div className="flex flex-col justify-center items-center gap-5 w-full">
// //             <div className="flex flex-row justify-center items-center gap-3 mb-2 w-full">
// //               <SocialMediaIcon {...facebookIcon} />
// //               <SocialMediaIcon {...instagramIcon} />
// //             </div>
// //             <AdminLoginButton />
// //             <p className="text-center text-xs">
// //               FKA: Building Justice | DBA: Homework SD | Nonprofit EIN: 84-3930979
// //             </p>
// //             <p className="text-center text-xs">Copyright © 2025 Homework - All rights reserved.</p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// import React, { useState } from "react";
// import "./Modal.css";
// import "@fontsource/golos-text/500.css";
// import { post } from "../api/requests"; // Assuming you have a post method for API requests

// type ContactModalProps = {
//   isOpen: boolean;
//   onClose: () => void;
// };

// const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [formResult, setFormResult] = useState({ success: false, result: "" });
//   const [showMessage, setShowMessage] = useState(false);
//   const [membership, setMembership] = useState<string>("community");
//   const [status, setStatus] = useState<string>("active");

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // Basic validation to check if required fields are filled
//     if (!firstName || !lastName || !email) {
//       setFormResult({
//         success: false,
//         result: "Please fill in all required fields.",
//       });
//       setShowMessage(true);
//       setTimeout(() => setShowMessage(false), 3000); // Show message for 3 seconds
//       return;
//     }

//     // Log the form data for debugging
//     console.log("Submitting form with data:", { firstName, lastName, email, status, membership });

//     try {
//       // Send the form data to the backend
//       const response = await post("/subscriptions/create", {
//         firstName,
//         lastName,
//         email,
//         status, // Include status in the payload
//         membership, // Include membership in the payload
//       });

//       console.log("Form response:", response); // Log the response for debugging

//       // Update the form result on successful submission
//       setFormResult({
//         success: true,
//         result: `Successfully submitted! Hello, ${firstName} ${lastName}!`,
//       });

//       // Reset the form fields
//       setFirstName("");
//       setLastName("");
//       setEmail("");
//     } catch (error) {
//       console.error("Error submitting the form:", error); // Log any error

//       setFormResult({
//         success: false,
//         result: "Error submitting the form. Please try again.",
//       });
//     }

//     // Show the success or error message
//     setShowMessage(true);
//     setTimeout(() => {
//       setShowMessage(false);
//     }, 5000);
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal-backdrop" aria-hidden="true">
//       <div className="modal-container" role="dialog" aria-labelledby="contact-modal-header">
//         <div id="contact-modal-header" className="header">
//           Add Contact
//         </div>
//         <form
//           onSubmit={handleSubmit} // Correctly attach the handleSubmit function to the onSubmit event
//           className="form"
//           aria-describedby="form-result"
//         >
//           {/* First Name */}
//           <div className="subheader">First Name</div>
//           <input
//             type="text"
//             id="firstName"
//             placeholder="First Name"
//             className="p-2 mt-2 w-full text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
//             required
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//           />

//           {/* Last Name */}
//           <div className="subheader">Last Name</div>
//           <input
//             type="text"
//             id="lastName"
//             placeholder="Last Name"
//             className="p-2 mt-2 w-full text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
//             required
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//           />

//           {/* Email */}
//           <div className="subheader">Email</div>
//           <input
//             type="email"
//             id="email"
//             placeholder="Email"
//             className="p-2 mt-2 w-full text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           {/* Status */}
//           <div className="subheader-big">Status</div>
//           <div className="toggle-container">
//             <button
//               type="button"
//               onClick={() => setStatus("active")}
//               aria-pressed={status === "active"}
//               className={`status-button ${status === "active" ? "selected" : ""}`}
//             >
//               <div className={`status-box ${status === "active" ? "active-box" : ""}`} />
//               <div className="button-color-green">
//                 <span>Active</span>
//               </div>
//             </button>
//             <button
//               type="button"
//               onClick={() => setStatus("inactive")}
//               aria-pressed={status === "inactive"}
//               className={`status-button ${status === "inactive" ? "selected" : ""}`}
//             >
//               <div className={`status-box ${status === "inactive" ? "inactive-box" : ""}`} />
//               <div className="button-color-red">
//                 <span>Inactive</span>
//               </div>
//             </button>
//           </div>

//           {/* Membership */}
//           <div className="subheader-big">Membership</div>
//           <div className="toggle-container">
//             <button
//               type="button"
//               onClick={() => setMembership("community")}
//               aria-pressed={membership === "community"}
//               className={`status-button ${membership === "community" ? "selected" : ""}`}
//             >
//               <div className="button-color-yellow">
//                 <span>Community</span>
//               </div>
//             </button>
//             <button
//               type="button"
//               onClick={() => setMembership("family")}
//               aria-pressed={membership === "family"}
//               className={`status-button ${membership === "family" ? "selected" : ""}`}
//             >
//               <div className={`status-box ${membership === "family" ? "inactive-box" : ""}`} />
//               <div className="button-color-purple">
//                 <span>Family</span>
//               </div>
//             </button>
//           </div>

//           {/* Submit and Cancel */}
//           <div className="flex flex-row gap-3 items-center justify-end">
//             {/* cancel button */}
//             <button type="button" onClick={onClose} className="cancel">
//               <>
//                 <img src="cross_exit.svg" width={14} height={14} alt="Discard" />
//                 DISCARD CONTACT
//               </>
//             </button>

//             {/* submit button */}
//             <button type="submit" className="submit">
//               <>
//                 <img src="submit_check.svg" width={24} height={24} alt="Save" />
//                 SAVE CONTACT
//               </>
//             </button>
//           </div>
//         </form>

//         {/* Success/Failure Message */}
//         {showMessage && (
//           <div className={`form-result ${formResult.success ? "success" : "error"}`}>
//             {formResult.result}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ContactModal;

import React, { useState } from "react";
import "./Modal.css";
import "@fontsource/golos-text/500.css";
import { post } from "../api/requests"; // Assuming you have a post method for API requests

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [formResult, setFormResult] = useState({ success: false, result: "" });
  const [showMessage, setShowMessage] = useState(false);
  const [membership, setMembership] = useState<string>("community");
  const [status, setStatus] = useState<string>("active");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation to check if required fields are filled
    if (!firstName || !lastName || !email) {
      setFormResult({
        success: false,
        result: "Please fill in all required fields.",
      });
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000); // Show message for 3 seconds
      return;
    }

    // Log the form data for debugging
    console.log("Submitting form with data:", { firstName, lastName, email, status, membership });

    try {
      // Send the form data to the backend
      const response = await post("/subscriptions/create", {
        firstName,
        lastName,
        email,
        status, // Include status in the payload
        membership, // Include membership in the payload
      });

      console.log("Form response:", response); // Log the response for debugging

      // Update the form result on successful submission
      setFormResult({
        success: true,
        result: `Successfully submitted! Hello, ${firstName} ${lastName}!`,
      });

      // Reset the form fields
      setFirstName("");
      setLastName("");
      setEmail("");
    } catch (error) {
      console.error("Error submitting the form:", error); // Log any error

      setFormResult({
        success: false,
        result: "Error submitting the form. Please try again.",
      });
    }

    // Show the success or error message
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" aria-hidden="true">
      <div className="modal-container" role="dialog" aria-labelledby="contact-modal-header">
        <div id="contact-modal-header" className="header">
          Add Contact
        </div>
        <form
          onSubmit={handleSubmit} // Correctly attach the handleSubmit function to the onSubmit event
          className="form"
          aria-describedby="form-result"
        >
          {/* First Name */}
          <div className="subheader">First Name</div>
          <input
            type="text"
            id="firstName"
            placeholder="First Name"
            className="p-2 mt-2 w-full text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          {/* Last Name */}
          <div className="subheader">Last Name</div>
          <input
            type="text"
            id="lastName"
            placeholder="Last Name"
            className="p-2 mt-2 w-full text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          {/* Email */}
          <div className="subheader">Email</div>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="p-2 mt-2 w-full text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Status */}
          <div className="subheader-big">Status</div>
          <div className="toggle-container">
            <button
              type="button"
              onClick={() => setStatus("active")}
              aria-pressed={status === "active"}
              className={`status-button ${status === "active" ? "selected" : ""}`}
            >
              <div className={`status-box ${status === "active" ? "active-box" : ""}`} />
              <div className="button-color-green">
                <span>Active</span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setStatus("inactive")}
              aria-pressed={status === "inactive"}
              className={`status-button ${status === "inactive" ? "selected" : ""}`}
            >
              <div className={`status-box ${status === "inactive" ? "inactive-box" : ""}`} />
              <div className="button-color-red">
                <span>Inactive</span>
              </div>
            </button>
          </div>

          {/* Membership */}
          <div className="subheader-big">Membership</div>
          <div className="toggle-container">
            <button
              type="button"
              onClick={() => setMembership("community")}
              aria-pressed={membership === "community"}
              className={`status-button ${membership === "community" ? "selected" : ""}`}
            >
              <div className="button-color-yellow">
                <span>Community</span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setMembership("family")}
              aria-pressed={membership === "family"}
              className={`status-button ${membership === "family" ? "selected" : ""}`}
            >
              <div className={`status-box ${membership === "family" ? "inactive-box" : ""}`} />
              <div className="button-color-purple">
                <span>Family</span>
              </div>
            </button>
          </div>

          {/* Submit and Cancel */}
          <div className="flex flex-row gap-3 items-center justify-end">
            {/* cancel button */}
            <button type="button" onClick={onClose} className="cancel">
              <>
                <img src="cross_exit.svg" width={14} height={14} alt="Discard" />
                DISCARD CONTACT
              </>
            </button>

            {/* submit button */}
            <button type="submit" className="submit">
              <>
                <img src="submit_check.svg" width={24} height={24} alt="Save" />
                SAVE CONTACT
              </>
            </button>
          </div>
        </form>

        {/* Success/Failure Message */}
        {showMessage && (
          <div className={`form-result ${formResult.success ? "success" : "error"}`}>
            {formResult.result}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
