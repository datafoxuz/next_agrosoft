import { Collections, SNavbar } from "@/components";
import { cardsForExample } from "@/data";
import SEO from "@/layouts/seo/seo";
import React from "react";

const index = () => {
  const siteWay = [
    {
      title: "Bosh sahifa",
      url: "/",
    },
    {
      title: "Yangiliklar",
      url: "/news",
    },
  ];

  return (
    <SEO metaTitle="News">
      <SNavbar siteWay={siteWay} title="Yangiliklar" filter article />
      <Collections data={cardsForExample} title="Yangiliklar" />
    </SEO>
  );
};

export default index;
