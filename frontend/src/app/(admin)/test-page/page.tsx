"use client";
import { Icon } from "@tritonse/tse-constellation";
// import TestPageComponent from "../../../components/testPageComponent";
import Image from "next/image";
import Link from "next/link";

const testPage = () => {
  // return <TestPageComponent />;

  return (
    <div className="pageWrapper" style={{ margin: "107px 122px" }}>
      <div className="linkWrapper">
        <Link href="/" className="text-[#B4B4B4] hover:underline flex gap-2">
          <Icon name="ic_arrowback" fill="#B4B4B4" size={16} />
          Back to Homework website
        </Link>
      </div>

      <div
        className="messageWrapper"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "80px",
        }}
      >
        <Image
          src="/icons/ic_success.svg"
          width={250}
          height={250}
          alt={"transaction success"}
          style={{ display: "block", margin: "0 auto" }}
        ></Image>
        <div
          className="text-[#000000]"
          style={{
            fontWeight: "500",
            fontSize: "48px",
            lineHeight: "130%",
            letterSpacing: "0px",
            textAlign: "center",
            width: "648px",
            maxHeight: "213px",
            marginBottom: "17px",
          }}
        >
          Thank you for your donation!
        </div>

        <div
          className="text-[#6C6C6C;]"
          style={{
            fontWeight: "400",
            fontSize: "24px",
            lineHeight: "150%",
            letterSpacing: "2%",
            textAlign: "center",
            width: "648px",
            maxHeight: "72px",
            marginBottom: "32px",
          }}
        >
          Your donation directly contributes to empowering individuals to thrive post-incarceration.
        </div>

        <div
          className="text-[#6C6C6C;]"
          style={{
            fontWeight: "400",
            fontSize: "18px",
            lineHeight: "150%",
            letterSpacing: "2%",
            textAlign: "center",
            width: "454px",
            maxHeight: "54px",
            marginBottom: "28px",
          }}
        >
          Check out our{" "}
          <Link href="/calendar" className="fontStyle: underline">
            upcoming events calendar
          </Link>{" "}
          to find more ways to get involved{" "}
        </div>
        <Image
          src="../../logo-dark.png"
          width={133}
          height={73}
          alt={"HomeWork Logo"}
          style={{ display: "block", margin: "0 auto" }}
        ></Image>
      </div>
    </div>
  );
};

export default testPage;
