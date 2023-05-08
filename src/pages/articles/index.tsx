import { Collections, SNavbar } from "@/components";
import React from "react";
import { cardsForExample } from "@/data";

import styles from "./articles.module.scss";

const index = () => {
  const siteWay = [
    {
      title: "Bosh sahifa",
      url: "/",
    },
    {
      title: "Agro maqolalar",
      url: "/articles",
    },
  ];

  return (
    <div className={styles.articles}>
      <SNavbar siteWay={siteWay} title="Agro maqolalar" filter article />
      <Collections data={cardsForExample} />
    </div>
  );
};

export default index;
