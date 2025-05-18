"use client";
import Image from "next/image";
import Link from "next/link";
import { Button, TextField } from "@tritonse/tse-constellation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { useAuthState } from "../../contexts/userContext";
import { auth } from "../../firebase/firebase";
const Navbar: React.FC = () => {
  const router = useRouter();
  const { loading, firebaseUser, logout } = useAuthState();
  const displayEmail = firebaseUser?.email;
  const displayName = firebaseUser?.displayName;
  const [open, setOpen] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const toggle = () => {
    setOpen((o) => !o);
  };
  const handleSignOut = async () => {
    await logout();
    router.replace("/login");
  };
  type Props = {
    onClose: () => void;
  };
  const ChangePassword: React.FC<Props> = ({ onClose }) => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
    const handleInputChange = (value: string) => {
      setEmail(value);
      setEmailError("");
    };

    const submitForm = async () => {
      setIsSubmitting(true);

      try {
        await sendPasswordResetEmail(auth, email);
        setIsEmailSent(true);
      } catch (error) {
        if (error instanceof Error) {
          setEmailError("Failed to send reset email. Please try again.");
        }
      } finally {
        setIsSubmitting(false);
      }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      void submitForm();
    };

    const handleTryAgain = () => {
      setIsEmailSent(false);
      setEmail("");
    };
    return (
      <div className="bg-white md:w-full w-[60%] mx-auto p-8 rounded-xl shadow-xl relative">
        <div className="w-full">
          <div className="flex justify-end">
            <button onClick={onClose} className=" text-gray-500 hover:text-black text-2xl">
              ✕
            </button>
          </div>
          <div className="mt-10 flex md:justify-start justify-center">
            <Image src="/images/homeworkLogo.png" alt="Homework Logo" width={155} height={86} />
          </div>

          {!isEmailSent ? (
            <>
              <h1 className="text-3xl mb-2 md:text-start text-center font-medium py-6">
                Change Password
              </h1>
              <p className="mb-4 text-[#909090]  w-full md:w-[40%]">
                Don&apos;t worry. Resetting your password is easy, just tell us the email address
                you registered.
              </p>

              <form onSubmit={handleSubmit}>
                <TextField
                  label="Email Address"
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                  errorText={emailError}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#F26522] text-white py-2 rounded-md hover:bg-[#d55416]"
                >
                  {isSubmitting ? "Submitting" : "Next"}
                </Button>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-3xl mb-2">Reset Your Password</h1>
              <p className="mb-4 text-[#909090]">
                We sent a reset password email to <span className="font-semibold">{email}</span>.
                Please click the reset password link to set your new password.
              </p>

              <div className="mt-4">
                <p className="text-sm text-[#000]">Haven&apos;t received the email?</p>
                <p className="text-sm text-[#000]">
                  Please check your spam folder, or{" "}
                  <button onClick={handleTryAgain} className="text-[#F26522] hover:underline">
                    try again
                  </button>
                  .
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    );
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
              <button
                onClick={() => {
                  setResetPassword(true);
                }}
                className="w-full px-4 py-2 hover:bg-gray-100 text-center"
              >
                Change Password
              </button>
              <button
                onClick={() => {
                  void handleSignOut();
                }}
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
      {resetPassword && (
        <div
          className="fixed inset-0 z-[999] bg-slate-500 bg-opacity-25 flex items-center justify-center"
          onClick={() => {
            setResetPassword(false);
          }}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <ChangePassword
              onClose={() => {
                setResetPassword(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
