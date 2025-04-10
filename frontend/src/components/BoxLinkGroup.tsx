import React from "react";

import { BoxLink } from "./BoxLink";

const BoxLinkGroup = () => {
  return (
    <div className="w-full flex-col md:grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] flex-wrap items-end">
      <BoxLink
        tall={false}
        src={"/images/boxlink1.png"}
        header={"What We Do"}
        body={"Find out how we support our members and our community."}
        link={"/what-we-do"}
      />
      <BoxLink
        tall={true}
        src={"/images/boxlink2.png"}
        header={"About Us"}
        body={"Learn about our history, mission, vision and our incredible team."}
        link={"/what-we-do"}
      />
      <BoxLink
        tall={false}
        src={"/images/boxlink3.png"}
        header={"Get Involved"}
        body={"Join us on our mission and check out upcoming events."}
        link={"/what-we-do"}
      />
      <BoxLink
        tall={true}
        src={"/images/boxlink4.png"}
        header={"Stay Connected"}
        body={"Stay informed about our past events and get in touch with us."}
        link={"/what-we-do"}
      />
    </div>
  );
};

export default BoxLinkGroup;
