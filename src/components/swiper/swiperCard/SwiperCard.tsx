import React from "react";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import { card } from "@/data/interfaces";

import styles from "./swipercard.module.scss";

interface swiperProps {
  image: StaticImageData;
  url: string;
  title: string;
}

const SwiperCard = ({
  cardDate,
  data,
}: {
  data: card;
  item?: swiperProps;
  cardDate?: string;
}) => {
  const router = useRouter();

  return (
    <div
      className={styles.card}
      onClick={() => router.push(`/articles/${data.slug}`)}
    >
      <Image
        src={data?.image}
        alt={`image about`}
        className={styles.card_image}
        width={388}
        height={356}
      />
      <div className={styles.card_desc}>
        <p className={styles.card_title}>{data?.title}</p>
        {cardDate ? <p className={styles.card_date}>{cardDate}</p> : null}
      </div>
    </div>
  );
};

export default SwiperCard;
