import { card } from "@/data/interfaces";
import Link from "next/link";
import React, { useState } from "react";
import CardActions from "./cardActions/CardActions";
import Image from "next/image";
import { DEFAULT_COVER, imageOr } from "@/lib/image";
import styles from "./communitycard.module.scss";

const CommunityCard = ({ data }: { data: card }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };
  const imageSrc = imageOr(data.image);
  return (
    <Link
      href={`/community/${data.slug}`}
      className={styles.card}
      style={{ color: "inherit", textDecoration: "none" }}
    >
      <Image
        src={imageError ? DEFAULT_COVER : imageSrc}
        alt={data.title}
        className={styles.image}
        width={220}
        height={137}
        onError={handleImageError}
      />
      <div className={styles.card_infos}>
        <h3 className={styles.description}>{data.title}</h3>
        <CardActions data={data} inCallection />
      </div>
    </Link>
  );
};

export default CommunityCard;
