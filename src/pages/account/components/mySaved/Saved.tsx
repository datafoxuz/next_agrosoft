import React, { useState } from "react";
import FilterDrawer from "../filterDrawer/filterDrawer";
import CardsCollection from "@/components/cardsCollection/CardsCollection";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { data } from "@/data/interfaces";
import { NotFound } from "@/components";

import styles from "../../profile.module.scss";

const Saved = ({ data }: { data: data }) => {
  const { t } = useTranslation("common");
  const [contentTab, setContentTab] = useState<string>("blogs");
  const router = useRouter()

  const contentTabLinks = [
    {
      title: t("account.saved.blog"),
      type: "blogs",
    },
    {
      title: t("main_topics.news"),
      type: "articles",
    },
    {
      title: t("main_topics.diseases"),
      type: "deceases",
    },
    {
      title: t("account.saved.products"),
      type: "products",
    },
  ];

  function handleChangeTab(type: string) {
    setContentTab(type)
    router.push(
      `${router.pathname}?type=${type}`
    );
  }

  return (
    <div className={styles.content}>
      <div className={styles.content_head}>
        <h3 className={styles.title}>{t("account.saved.title")}</h3>

        <div className={styles.tab_titles}>
          {contentTabLinks.map((item) => (
            <h3
              className={styles.title}
              key={item.type}
              data-active={item.type == contentTab}
              onClick={() => handleChangeTab(item.type)}
            >
              {item.title}
            </h3>
          ))}
        </div>

        <FilterDrawer />
      </div>

      {
        data?.data && data?.data.length ? (
          <CardsCollection data={data?.data} account />
        ) : (
          <NotFound />
        )
      }
    </div>
  );
};

export default Saved;
