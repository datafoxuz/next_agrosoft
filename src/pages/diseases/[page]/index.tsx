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
      title: "Agro Kasalliklar",
      url: "/diseases",
    },
    {
      title: `${router.query.page}`,
      url: `/diseases/${router.query.page}`,
    },
  ];

  return (
    <>
      <SNavbar siteWay={siteWay} innerPage />
      <InternalPage />
    </>
  );
};

export default index;
