import { InternalPage, SNavbar } from "@/components";
import React from "react";

const index = () => {
  const siteWay = [
    {
      title: "Bosh sahifa",
      url: "/",
    },
    {
      title: "Agro maqolalar",
      url: "/community",
    },
  ];
  return (
    <>
      <SNavbar siteWay={siteWay} innerPage />
      <InternalPage />
    </>
  );
};

export default index;
