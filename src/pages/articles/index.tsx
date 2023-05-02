import { SNavbar } from "@/components";
import React from "react";

import styles from "./articles.module.scss";

const index = () => {
  const siteWay = [
    {
      title: "Bosh sahifa",
      url: "/",
    },
    {
      title: "Barcha kategoriyalar",
      url: "/categories",
    },
  ];

  return (
    <div className={styles.articles}>
      <SNavbar siteWay={siteWay} title="Agro maqolalar" />
    </div>
  );
};

export default index;
