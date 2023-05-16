import React from "react";
import { topcards } from "@/data";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/router";

import styles from "./topcards.module.scss";

const TopCards = () => {
  const router = useRouter();

  return (
    <div className={styles.main_top_cards}>
      {topcards.map(
        (
          item: { url: string; image: StaticImageData; title: string },
          index: number
        ) => (
          <div
            className={styles.top_card}
            onClick={() => router.push(item.url)}
            key={index}
          >
            <Image
              src={item.image.src}
              alt={`image about ${item.title}`}
              className={styles.card_image}
              width={214}
              height={228}
            />
            <p className={styles.card_title}>{item.title}</p>
          </div>
        )
      )}
    </div>
  );
};

export default TopCards;
