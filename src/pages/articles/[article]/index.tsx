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
      title: "Agro maqolalar",
      url: "/articles",
    },
    {
      title: `${router.query.article}`,
      url: `/articles/${router.query.article}`,
    },
  ];

  return (
    <SEO metaTitle={`${router.query.article}`}>
      <SNavbar siteWay={siteWay} innerPage />
      <InternalPage />
    </SEO>
  );
};

export default index;
