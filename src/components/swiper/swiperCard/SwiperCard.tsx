import React from "react";
import { StaticImageData } from "next/image";

import card_image from "@/assets/images/articles.png";

import styles from "./swipercard.module.scss";

interface swiperProps {
  image: StaticImageData;
  url: string;
  title: string;
}

const SwiperCard = ({
  item,
  cardDate,
}: {
  item?: swiperProps;
  cardDate?: string;
}) => {
  return (
    <div className={styles.card}>
      <img
        src={card_image.src}
        alt={`image about`}
        className={styles.card_image}
      />
      <div className={styles.card_desc}>
        <p className={styles.card_title}>Karam parvarishiga oid maslahatlar</p>
        {cardDate ? <p className={styles.card_date}>{cardDate}</p> : null}
      </div>
    </div>
  );
};

export default SwiperCard;
