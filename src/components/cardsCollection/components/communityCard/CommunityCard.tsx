import { card } from "@/data/interfaces";
import { useRouter } from "next/router";
import React from "react";
import CardActions from "./cardActions/CardActions";
import Image from "next/image";
import notfound from "@/assets/images/notfound.png"
import styles from "./communitycard.module.scss";

const CommunityCard = ({ data }: { data: card }) => {
  const router = useRouter();

  return (
    <div
      className={styles.card}
      onClick={() => router.push(`${router.pathname}/${data.slug}`)}
    >
      <Image
        src={data.image ? data.image : notfound}
        alt={`image about ${data.title}`}
        className={styles.image}
        width={220}
        height={137}
      />
      <div className={styles.card_infos}>
        <h3 className={styles.description}>{data.title}</h3>
        <CardActions data={data} inCallection />
      </div>
    </div>
  );
};

export default CommunityCard;
