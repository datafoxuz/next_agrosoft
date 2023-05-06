import { Collections, SNavbar } from "@/components";
import { cardsForExample } from "@/data";
import React from "react";

import styles from "./community.module.scss";

const index = () => {
  const siteWay = [
    {
      title: "Bosh sahifa",
      url: "/",
    },
    {
      title: "Agro jamiyat",
      url: "/community",
    },
  ];

  return (
    <div className={styles.community}>
      <SNavbar siteWay={siteWay} title="Agrojamiyat" community />
      <Collections data={cardsForExample} community />
    </div>
  );
};

export default index;
