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
      title: "Agro maqolalar",
      url: "/articles",
    },
    {
      title: `${router.query.article}`,
      url: `/articles/${router.query.article}`,
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
