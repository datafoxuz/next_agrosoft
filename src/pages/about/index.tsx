import { InternalPage, SNavbar } from "@/components";
import React from "react";

const index = () => {
  const siteWay = [
    {
      title: "Bosh sahifa",
      url: "/",
    },
    {
      title: "Biz haqimizda",
      url: "/about",
    },
  ];
  return (
    <div>
      <SNavbar siteWay={siteWay} title="Biz haqimizda" about />
      <InternalPage about />
    </div>
  );
};

export default index;
