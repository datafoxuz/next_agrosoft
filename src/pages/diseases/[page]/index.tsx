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
      title: "Agro Kasalliklar",
      url: "/diseases",
    },
    {
      title: `${router.query.page}`,
      url: `/diseases/${router.query.page}`,
    },
  ];

  return (
    <SEO metaTitle={`${router.query.page}`}>
      <SNavbar siteWay={siteWay} innerPage />
      <InternalPage />
    </SEO>
  );
};

export default index;
