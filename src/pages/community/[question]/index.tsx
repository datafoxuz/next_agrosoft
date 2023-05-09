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
      title: "Agro jamiyat",
      url: "/community",
    },
    {
      title: `${router.query.question}`,
      url: `/community/${router.query.question}`,
    },
  ];

  return (
    <SEO metaTitle={`${router.query.question}`}>
      <SNavbar siteWay={siteWay} innerPage />
      <InternalPage questions />
    </SEO>
  );
};

export default index;
