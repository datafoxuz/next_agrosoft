import { Collections, SNavbar } from "@/components";
import { cardsForExample, topcards } from "@/data";
import SEO from "@/layouts/seo/seo";
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
      title: `${router.query.product}`,
      url: `/market/${router.query.product}`,
    },
  ];

  return (
    <SEO metaTitle={`${router.query.product}`}>
      <SNavbar
        siteWay={siteWay}
        title={`${router.query.product}`}
        filter
        article
        product
      />
      <Collections data={topcards} />
    </SEO>
  );
};

export default index;
