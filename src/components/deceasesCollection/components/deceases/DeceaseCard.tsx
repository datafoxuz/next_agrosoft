import { useRouter } from "next/router";
import React, { useState } from "react";
import Image from "next/image";
import notfound from "@/assets/images/not_found.png"
import styles from "./deceasecard.module.scss";

import { deceaseItem } from "@/data/interfaces";
import DeceaseActions from "./deceaseActions/DeceaseActions";

const DeceaseCard = ({ data }: { data: deceaseItem }) => {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };
  const imageSrc = data.image || notfound;
  return (
    <div
      className={styles.card}
      onClick={() => router.push(`${router.pathname}/${data.slug}`)}
    >
      <Image
        src={imageError ? notfound : imageSrc}
        alt={`image about ${data.name}`}
        className={styles.image}
        width={220}
        height={137}
        onError={handleImageError}
      />
      <div className={styles.card_infos}>
        <h3 className={styles.description}>{data.name}</h3>
        <DeceaseActions data={data} inCallection />
      </div>
    </div>
  );
};

export default DeceaseCard;
