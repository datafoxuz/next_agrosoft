import { cardTypes } from "@/data/interfaces";
import { useRouter } from "next/router";
import React from "react";
import CardActions from "./cardActions/CardActions";

import styles from "./communitycard.module.scss";

const CommunityCard = ({ data }: { data: cardTypes }) => {
  const router = useRouter();

  return (
    <div
      className={styles.card}
      onClick={() => router.push(`${router.asPath}/${data.title}`)}
    >
      <img
        src={data.image.src}
        alt={`image about ${data.title}`}
        className={styles.image}
      />
      <div className={styles.card_infos}>
        <h3 className={styles.description}>{data.title}</h3>
        <CardActions data={data} inCallection />
      </div>
    </div>
  );
};

export default CommunityCard;
