import React from "react";
import { BoxLink, BoxLinkProps } from "./BoxLink";

export type BoxLinkGroupProps = {
  data: BoxLinkProps[];
};

export default function BoxLinkGroup({ data }: BoxLinkGroupProps) {
  return (
    <div className="w-full flex-col md:grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] flex-wrap items-end">
      {data.map((props, i) => (
        <BoxLink key={i} {...props} />
      ))}
    </div>
  );
}
