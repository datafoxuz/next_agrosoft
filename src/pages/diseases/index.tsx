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
      title: "Agro Kasalliklar",
      url: "/diseases",
    },
  ];

  return (
    <SEO metaTitle="Diseases">
      <SNavbar siteWay={siteWay} title="Agro Kasalliklar" filter article />
      <Collections data={cardsForExample} title="Agro Kasalliklar" />
    </SEO>
  );
};

export default index;
