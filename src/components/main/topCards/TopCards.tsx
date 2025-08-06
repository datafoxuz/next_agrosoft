import React from "react";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { cardTypes } from "@/data/interfaces";

import styles from "./topcards.module.scss";

import articles from "@/assets/images/articles.png";
import community from "@/assets/images/community.png";
import deceases from "@/assets/images/deceases.png";
import market from "@/assets/images/market.png";

const TopCards = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const topcards: cardTypes[] = [
    {
      url: "/blogs",
      image: articles,
      title: t("main_topics.blogs"),
      location: "Bukhara, Uzbekistan",
      price: "0.99 - 5.9",
    },
    {
      url: "/community",
      image: community,
      title: t("main_topics.community"),
    },
    {
      url: "/deceases",
      image: deceases,
      title: t("main_topics.diseases"),
    },
    {
      url: "/market",
      image: market,
      title: t("main_topics.market"),
    },
  ];

  return (
    <div className={styles.main_top_cards}>
      {topcards.map(
        (
          item: { url: string; image: StaticImageData; title: string },
          index: number
        ) => (
          <div
            className={styles.top_card}
            onClick={() => router.push(item.url)}
            key={index}
          >
            <Image
              src={item.image.src}
              alt={`image about ${item.title}`}
              className={styles.card_image}
              width={214}
              height={228}
            />
            <p className={styles.card_title}>{item.title}</p>
          </div>
        )
      )}
    </div>
  );
};

export default TopCards;
