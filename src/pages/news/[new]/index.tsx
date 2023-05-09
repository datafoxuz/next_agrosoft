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
      title: "Yangiliklar",
      url: "/news",
    },
    {
      title: `${router.query.new}`,
      url: `/articles/${router.query.new}`,
    },
  ];

  return (
    <SEO metaTitle={`${router.query.new}`}>
      <SNavbar siteWay={siteWay} innerPage />
      <InternalPage />
    </SEO>
  );
};

export default index;
