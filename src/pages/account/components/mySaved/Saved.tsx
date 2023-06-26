import React, { useState } from "react";
import FilterDrawer from "../filterDrawer/filterDrawer";
import CardsCollection from "@/components/cardsCollection/CardsCollection";
import { useTranslation } from "next-i18next";

import styles from "../../profile.module.scss";

const Saved = () => {
  const { t } = useTranslation("common");
  const [contentTab, setContentTab] = useState<string>("a");

  const contentTabLinks = [
    {
      title: t("account.saved.blog"),
      id: "a",
    },
    {
      title: t("main_topics.news"),
      id: "b",
    },
    {
      title: t("main_topics.diseases"),
      id: "c",
    },
    {
      title: t("account.saved.products"),
      id: "d",
    },
  ];

  return (
    <div className={styles.content}>
      <div className={styles.content_head}>
        <h3 className={styles.title}>{t("account.saved.title")}</h3>

        <div className={styles.tab_titles}>
          {contentTabLinks.map((item) => (
            <h3
              className={styles.title}
              key={item.id}
              data-active={item.id == contentTab}
              onClick={() => setContentTab(item.id)}
            >
              {item.title}
            </h3>
          ))}
        </div>

        <FilterDrawer />
      </div>

      {contentTab == "a" ? (
        <CardsCollection data={[]} account />
      ) : contentTab == "b" ? (
        <p>Cards</p>
      ) : contentTab == "c" ? (
        <CardsCollection data={[]} account />
      ) : (
        <CardsCollection data={[]} account />
      )}
    </div>
  );
};

export default Saved;
