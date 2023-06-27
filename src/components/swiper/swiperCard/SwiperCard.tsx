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
  single = false
}: {
  data: card;
  item?: swiperProps;
  cardDate?: string;
  single?: boolean
}) => {
  const router = useRouter();

  function handleClick(slug: string){
    if(single){
      router.push(`/news/${data.slug}`)
    }else{
      router.push(`/blogs/${data.slug}`)
    }
  }

  return (
    <div
      className={styles.card}
      onClick={() => handleClick(data.slug)}
    >
      <Image
        src={data?.image ? data.image : ""}
        alt={`image about`}
        className={styles.card_image}
        width={388}
        height={356}
      />
      <div className={styles.card_desc}>
        <p className={styles.card_title}>
          {data?.title.length < 60
            ? data.title
            : `${data.title.slice(0, 60)}...`}
        </p>
        {cardDate ? <p className={styles.card_date}>{cardDate}</p> : null}
      </div>
    </div>
  );
};

export default SwiperCard;
