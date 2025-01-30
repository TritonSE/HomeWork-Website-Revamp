import React from "react";
import styles from "../components/PageHeader.module.css";
import { NavBar } from "./NavBar";

type NavBarProps = {
  imageUrl: string;
  header: string;
  subheader: string;
};

export function PageHeader({ imageUrl, header, subheader }: NavBarProps) {
  return (
    <div
      className={styles.outerDiv}
      style={{
        backgroundImage: `url(${imageUrl})`, // Apply the background image here
        backgroundSize: "cover", // Optional: Scale the image to cover the div
        backgroundPosition: "center", // Optional: Center the image
        background: `linear-gradient(180deg, rgba(0, 0, 0, 0.36) 0%, rgba(0, 0, 0, 0.6) 100%), url(${imageUrl})`,
      }}
    >
      <NavBar></NavBar>
      <div className={styles.textContainer}>
        <div className={styles.headerContainer}>{header}</div>
        <div className={styles.subheaderContainer}>{subheader}</div>
      </div>
    </div>
  );
}
