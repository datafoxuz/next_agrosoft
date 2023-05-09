import { InternalPage, SNavbar } from "@/components";
import SEO from "@/layouts/seo/seo";
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
    <SEO metaTitle="About">
      <SNavbar siteWay={siteWay} title="Biz haqimizda" about />
      <InternalPage about />
    </SEO>
  );
};

export default index;
