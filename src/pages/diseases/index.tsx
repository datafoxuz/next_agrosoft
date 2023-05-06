import { Collections, SNavbar } from "@/components";
import { cardsForExample } from "@/data";
import React from "react";

import styles from "./diseases.module.scss";

const index = () => {
  const siteWay = [
    {
      title: "Bosh sahifa",
      url: "/",
    },
    {
      title: "Agro Kasalliklar",
      url: "/diseases",
    },
  ];

  return (
    <div className={styles.diseases}>
      <SNavbar siteWay={siteWay} title="Agro Kasalliklar" />
      <Collections data={cardsForExample} />
    </div>
  );
};

export default index;
