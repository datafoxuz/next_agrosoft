import { card } from "@/data/interfaces";
import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";

import styles from "./card.module.scss";

import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";

const Card = ({ item }: { item: card }) => {
  const router = useRouter();

  function handleCardClick(slug: string) {
    if (router.query.page) {
      router.push(`${router.pathname}/${slug}`);
    } else {
      if (!router.query.product) {
        router.push(`/${router.pathname}/${slug}`);
      } else {
        router.push(`/market/${router.query.product}/${slug}`);
      }
    }
  }

  return (
    <div className={styles.card} onClick={() => handleCardClick(item.slug)}>
      <Image
        src={item.image ? item.image : ""}
        alt={`image about ${item.title}`}
        className={styles.image}
        width={305}
        height={205}
      />

      {item.country_name && (
        <div className={styles.location}>
          <FmdGoodOutlinedIcon className={styles.icon} />{" "}
          {item.region_name && item.region_name}, {item.country_name}
        </div>
      )}

      <p className={styles.title}>{item.title}</p>
      {item.high_price && (
        <div className={styles.price}>{item.high_price} USD / per kg</div>
      )}
    </div>
  );
};

export default Card;
