import { cardTypes } from "@/data";
import { useRouter } from "next/router";
import React from "react";

import styles from "./card.module.scss";

const Card = ({ item }: { item: cardTypes }) => {
  const router = useRouter();
  return (
    <div className={styles.card} onClick={() => router.push(item.url)}>
      <img
        src={item.image.src}
        alt={`image about ${item.title}`}
        className={styles.image}
      />
      <p className={styles.title}>{item.title}</p>
    </div>
  );
};

export default Card;
