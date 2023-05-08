import { Collections, SNavbar } from "@/components";
import { cardsForExample } from "@/data";
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
      title: "Agro Products",
      url: `/market/${router.query.product}`,
    },
  ];

  return (
    <div>
      <SNavbar siteWay={siteWay} title="Agro Products" filter product />
      <Collections data={cardsForExample} />
    </div>
  );
};

export default index;
