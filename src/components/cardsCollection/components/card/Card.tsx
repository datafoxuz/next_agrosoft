import { cardTypes } from "@/data/interfaces";
import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";

import styles from "./card.module.scss";

import RoomIcon from "@mui/icons-material/Room";

const Card = ({ item }: { item: cardTypes }) => {
  const router = useRouter();

  function handleCardClick(title: string) {
    if (!router.query.product) {
      router.push(`/${router.asPath}/${title}`);
    } else {
      router.push(`/market/${router.query.product}/${title}`);
    }
  }

  return (
    <div className={styles.card} onClick={() => handleCardClick(item.title)}>
      <Image
        src={item.image.src}
        alt={`image about ${item.title}`}
        className={styles.image}
        width={305}
        height={205}
      />

      {item.location && (
        <div className={styles.location}>
          <RoomIcon className={styles.icon} /> {item.location}
        </div>
      )}

      <p className={styles.title}>{item.title}</p>

      {item.price && (
        <div className={styles.price}>{item.price} USD / per kg</div>
      )}
    </div>
  );
};

export default Card;
