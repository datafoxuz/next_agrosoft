import Link from "next/link";
import React from "react";
import Image, { StaticImageData } from "next/image";
import notfound from "@/assets/images/not_found.png";

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
  data: any;
  item?: swiperProps;
  cardDate?: string;
  single?: boolean
}) => {

  const href = `${single ? "/news" : "/blogs"}/${data.slug}`;
  const title: string = data?.title ?? "";

  return (
    <Link href={href} className={styles.card} style={{ color: "inherit", textDecoration: "none" }}>
      <Image
        src={data?.image ? data.image : notfound}
        alt={title}
        className={styles.card_image}
        width={388}
        height={356}
      />
      <div className={styles.card_desc}>
        <p className={styles.card_title}>
          {title.length < 60 ? title : `${title.slice(0, 60)}...`}
        </p>
        {cardDate ? <p className={styles.card_date}>{cardDate}</p> : null}
      </div>
    </Link>
  );
};

export default SwiperCard;
