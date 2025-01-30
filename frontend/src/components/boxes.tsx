// Card.jsx
import React from "react";

import { Card } from "../components/boxLink";
import styles from "../components/boxes.module.css";

const Cards = () => {
  return (
    <div className={styles.container}>
      <Card
        tall={false}
        src={
          "https://plus.unsplash.com/premium_photo-1661497675847-2075003562fd?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29ycG9yYXRlfGVufDB8fDB8fHww"
        }
      />
      <Card
        tall={true}
        src={
          "https://plus.unsplash.com/premium_photo-1661497675847-2075003562fd?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29ycG9yYXRlfGVufDB8fDB8fHww"
        }
      />
      <Card
        tall={false}
        src={
          "https://plus.unsplash.com/premium_photo-1661497675847-2075003562fd?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29ycG9yYXRlfGVufDB8fDB8fHww"
        }
      />
      <Card
        tall={true}
        src={
          "https://plus.unsplash.com/premium_photo-1661497675847-2075003562fd?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29ycG9yYXRlfGVufDB8fDB8fHww"
        }
      />
    </div>
  );
};

export default Cards;
