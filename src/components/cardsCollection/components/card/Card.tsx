import { card } from "@/data/interfaces";
import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";

import styles from "./card.module.scss";

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

      {/* {item.location && (
        <div className={styles.location}>
          <RoomIcon className={styles.icon} /> {item.location}
        </div>
      )}


      {item.price && (
        <div className={styles.price}>{item.price} USD / per kg</div>
        )} */}
      <p className={styles.title}>{item.title}</p>
    </div>
  );
};

export default Card;
