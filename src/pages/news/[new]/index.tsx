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
      title: "Yangiliklar",
      url: "/news",
    },
    {
      title: `${router.query.new}`,
      url: `/articles/${router.query.new}`,
    },
  ];

  return (
    <div>
      <SNavbar siteWay={siteWay} innerPage />
      <InternalPage />
    </div>
  );
};

export default index;
