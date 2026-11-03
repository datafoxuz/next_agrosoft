import { card } from "@/data/interfaces";
import Link from "next/link";
import React, { useState } from "react";
import CardActions from "./cardActions/CardActions";
import Image from "next/image";
import notfound from "@/assets/images/not_found.png"
import styles from "./communitycard.module.scss";

const CommunityCard = ({ data }: { data: card }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };
  const imageSrc = data.image || notfound;
  return (
    <Link
      href={`/community/${data.slug}`}
      className={styles.card}
      style={{ color: "inherit", textDecoration: "none" }}
    >
      <Image
        src={imageError ? notfound : imageSrc}
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
