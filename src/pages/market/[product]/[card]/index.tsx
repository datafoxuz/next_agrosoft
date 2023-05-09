import { InternalPage, SNavbar } from "@/components";
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
    {
      title: `${router.query.card}`,
      url: `/market/${router.query.product}/${router.query.card}`,
    },
  ];

  return (
    <SEO metaTitle={`${router.query.card}`}>
      <SNavbar siteWay={siteWay} innerPage />
      <InternalPage />
    </SEO>
  );
};

export default index;
