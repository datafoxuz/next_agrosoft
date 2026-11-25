import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { DEFAULT_COVER, imageOr } from "@/lib/image";
import styles from "./deceasecard.module.scss";

import { deceaseItem } from "@/data/interfaces";
import DeceaseActions from "./deceaseActions/DeceaseActions";

const DeceaseCard = ({ data }: { data: deceaseItem }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };
  const imageSrc = imageOr(data.image);
  return (
    <Link
      href={`/deceases/${data.slug}`}
      className={styles.card}
      style={{ color: "inherit", textDecoration: "none" }}
    >
      <Image
        src={imageError ? DEFAULT_COVER : imageSrc}
        alt={data.name}
        className={styles.image}
        width={220}
        height={137}
        onError={handleImageError}
      />
      <div className={styles.card_infos}>
        <h3 className={styles.description}>{data.name}</h3>
        <DeceaseActions data={data} inCallection />
      </div>
    </Link>
  );
};

export default DeceaseCard;
