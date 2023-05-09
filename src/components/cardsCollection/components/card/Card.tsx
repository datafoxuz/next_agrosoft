import { cardTypes } from "@/data/interfaces";
import { useRouter } from "next/router";
import React from "react";

import styles from "./card.module.scss";

import RoomIcon from "@mui/icons-material/Room";

const Card = ({ item }: { item: cardTypes }) => {
  const router = useRouter();

  return (
    <div
      className={styles.card}
      onClick={() => router.push(`${router.route}/${item.title}`)}
    >
      <img
        src={item.image.src}
        alt={`image about ${item.title}`}
        className={styles.image}
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
