// Card.jsx
import React from "react";

import { Card } from "../components/boxLink";
import styles from "../components/boxLink.module.css";

const Cards = () => {
  return (
    <div className={styles.container}>
      <Card tall={false} />
      <Card tall={true} />
      <Card tall={false} />
      <Card tall={true} />
    </div>
  );
};

export default Cards;
