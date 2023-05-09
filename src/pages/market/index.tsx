import { AddProduct, Collections, SNavbar } from "@/components";
import { cardsForExample } from "@/data";
import { questionTypes } from "@/data/interfaces";
import React, { useState } from "react";

import styles from "./market.module.scss";

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
    <div className={styles.market}>
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
        <Collections data={cardsForExample} />
      )}
    </div>
  );
};

export default index;
