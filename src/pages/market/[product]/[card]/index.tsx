import { InternalPage, SNavbar } from "@/components";
import { useRouter } from "next/router";
import React from "react";

const index = () => {
  const router = useRouter();

  const siteWay = [
    {
      title: "Bosh sahifa",
      url: "/",
    },
    {
      title: "Agromarket",
      url: "/market",
    },
    {
      title: "Agromarket",
      url: "/market",
    },
  ];

  console.log(router);
  return (
    <>
      <SNavbar siteWay={siteWay} innerPage />
      <InternalPage />
    </>
  );
};

export default index;
