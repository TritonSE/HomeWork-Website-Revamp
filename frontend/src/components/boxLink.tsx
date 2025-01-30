// Card.jsx
import React from "react";

import styles from "../components/boxLink.module.css";

export interface CardProps {
  tall: boolean;
}

export function Card({ tall: isTall }: CardProps) {
  let contStyle = `${styles.imageContainer} ${styles.short}`;
  if (isTall) {
    contStyle = `${styles.imageContainer} ${styles.tall}`;
  }

  return (
    <a href="/what-we-do">
      <div className={contStyle}>
        <img src="https://plus.unsplash.com/premium_photo-1661497675847-2075003562fd?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29ycG9yYXRlfGVufDB8fDB8fHww" />
        <div className={styles.textOverlay}>
          <div className={styles.textTop}>
            <h3 className={styles.title}>What We Do</h3>
            <p className={styles.description}>
              Find out how we support our members and our community.
            </p>
          </div>
          <span className={styles.learnMore}>Learn More </span>
        </div>
      </div>
    </a>
  );
}
