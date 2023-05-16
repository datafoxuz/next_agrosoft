import React from "react";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/router";

import card_image from "@/assets/images/articles.png";

import styles from "./swipercard.module.scss";

interface swiperProps {
  image: StaticImageData;
  url: string;
  title: string;
}

const SwiperCard = ({
  cardDate,
}: {
  item?: swiperProps;
  cardDate?: string;
}) => {
  const router = useRouter();

  return (
    <div className={styles.card} onClick={() => router.push("/articles")}>
      <Image
        src={card_image.src}
        alt={`image about`}
        className={styles.card_image}
        width={388}
        height={356}
      />
      <div className={styles.card_desc}>
        <p className={styles.card_title}>Karam parvarishiga oid maslahatlar</p>
        {cardDate ? <p className={styles.card_date}>{cardDate}</p> : null}
      </div>
    </div>
  );
};

export default SwiperCard;
