// components/Header.js
import React from "react";
import styles from "./Header.module.css"; // Import CSS Module for styling
import "@fontsource/golos-text"; // Defaults to weight 400

export type HeaderComponents = {
  imageUrl: string;
  header: string;
  subheader: string;
};

const Header = ({ imageUrl, header, subheader }: HeaderComponents) => {
  return (
    <div
      className={styles.headerContainer}
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.36) 0%, rgba(0, 0, 0, 0.6) 100%), url(${imageUrl})`,
        backgroundSize: "cover", // Ensure the background image covers the entire area
        backgroundPosition: "center", // Center the image
      }}
    >
      <div className={styles.textContainer}>
        <div className={styles.header}>{header}</div>
        <div className={styles.subheader}>{subheader}</div>
      </div>
    </div>
  );
};

export default Header;
