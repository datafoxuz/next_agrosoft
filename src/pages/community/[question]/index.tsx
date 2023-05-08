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
      url: "/community",
    },
    {
      title: `${router.query.question}`,
      url: "/articles",
    },
  ];

  return (
    <div>
      <SNavbar siteWay={siteWay} innerPage />
      <InternalPage questions />
    </div>
  );
};

export default index;
