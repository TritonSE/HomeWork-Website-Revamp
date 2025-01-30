// Card.jsx
import React from "react";

import styles from "../components/boxLink.module.css";

export interface CardProps {
  tall: boolean;
  src: string;
}

export function Card({ tall: isTall, src: imgSrc }: CardProps) {
  let contStyle = `${styles.imageContainer} ${styles.short}`;
  if (isTall) {
    contStyle = `${styles.imageContainer} ${styles.tall}`;
  }

  return (
    <a href="/what-we-do">
      <div className={contStyle}>
        <img src={imgSrc} />
        <div className={styles.textOverlay}>
          <div className={styles.textTop}>
            <h3 className={styles.title}>What We Do</h3>
            <p className={styles.description}>
              Find out how we support our members and our community.
            </p>
          </div>
          <span className={styles.learnMore}>
            Learn More
            <span className={styles.arrow}></span>
          </span>
        </div>
      </div>
    </a>
  );
}
