// Card.jsx
import React from "react";

import { BoxLink } from "./boxLink";

const BoxLinkGroup = () => {
  return (
    <div className="w-full h-[662px] grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] flex-wrap items-end">
      <BoxLink
        tall={false}
        src={
          "https://plus.unsplash.com/premium_photo-1661497675847-2075003562fd?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29ycG9yYXRlfGVufDB8fDB8fHww"
        }
        header={"What We Do"}
        body={"Lorem ipsum t labore et dolore magna aliqua."}
        link={"/what-we-do"}
      />
      <BoxLink
        tall={true}
        src={
          "https://plus.unsplash.com/premium_photo-1661497675847-2075003562fd?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29ycG9yYXRlfGVufDB8fDB8fHww"
        }
        header={"What We Do"}
        body={"Lorem ipsum dol aliqua."}
        link={"/what-we-do"}
      />
      <BoxLink
        tall={false}
        src={
          "https://plus.unsplash.com/premium_photo-1661497675847-2075003562fd?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29ycG9yYXRlfGVufDB8fDB8fHww"
        }
        header={"What We Do"}
        body={"Lorem ipsum dolor sit amet ut labore et dolore magna aliqua."}
        link={"/what-we-do"}
      />
      <BoxLink
        tall={true}
        src={
          "https://plus.unsplash.com/premium_photo-1661497675847-2075003562fd?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29ycG9yYXRlfGVufDB8fDB8fHww"
        }
        header={"What We Do"}
        body={"Lorem ipsum dolor sit amet, consectetur."}
        link={"/what-we-do"}
      />
    </div>
  );
};

export default BoxLinkGroup;
