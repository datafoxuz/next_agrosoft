import { Collections, SNavbar } from "@/components";
import { cardsForExample } from "@/data";
import React from "react";

import styles from "./market.module.scss";

const index = () => {
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
      <SNavbar siteWay={siteWay} title="Agromarket" />
      <Collections data={cardsForExample} />
    </div>
  );
};

export default index;
