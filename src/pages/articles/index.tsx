import { Collections, SNavbar } from "@/components";
import React from "react";
import { cardsForExample } from "@/data";
import SEO from "@/layouts/seo/seo";

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
    <SEO metaTitle="Articles">
      <div className={styles.articles}>
        <SNavbar siteWay={siteWay} title="Agro maqolalar" filter article />
        <Collections data={cardsForExample} />
      </div>
    </SEO>
  );
};

export default index;
