import { Collections, SNavbar } from "@/components";
import { cardsForExample } from "@/data";
import React from "react";

import styles from "./news.module.scss";

const index = () => {
  const siteWay = [
    {
      title: "Bosh sahifa",
      url: "/",
    },
    {
      title: "Yangiliklar",
      url: "/news",
    },
  ];

  return (
    <div>
      <SNavbar siteWay={siteWay} title="Yangiliklar" />
      <Collections data={cardsForExample} />
    </div>
  );
};

export default index;
