import { AddProduct, Collections, SNavbar } from "@/components";
import { cardsForExample } from "@/data";
import { questionTypes } from "@/data/interfaces";
import SEO from "@/layouts/seo/seo";
import React, { useState } from "react";

const index = () => {
  const [market, setMarket] = useState<questionTypes>({
    active: false,
  });

  const siteWay = [
    {
      title: "Bosh sahifa",
      url: "/",
    },
    {
      title: "Agromarket",
      url: "/market",
    },
  ];

  return (
    <SEO metaTitle="Agromarket">
      <SNavbar
        siteWay={siteWay}
        title="Agromarket"
        filter
        market
        state={market}
        setState={setMarket}
      />

      {market.active ? (
        <AddProduct state={market} setState={setMarket} />
      ) : (
        <Collections data={cardsForExample} market />
      )}
    </SEO>
  );
};

export default index;
