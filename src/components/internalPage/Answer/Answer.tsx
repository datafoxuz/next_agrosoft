import React from "react";
import Link from "next/link";

import styles from "./answer.module.scss";

import image from "@/assets/images/community.png";

const Answer = () => {
  const images = [image, image];

  return (
    <div className={styles.answer}>
      <div className={styles.text_section}>
        <p className={styles.description}>
          Bin packing, or the placement of objects of certain weights into
          different bins subject to certain constraints
        </p>

        {images.length ? (
          <div className={styles.images}>
            {images.map((item, index) => (
              <img
                src={item.src}
                alt="answer image"
                key={index}
                className={styles.image}
              />
            ))}
          </div>
        ) : null}
      </div>

      <div className={styles.person_section}>
        <img src={image.src} alt="person image" className={styles.image} />

        <div className={styles.person_info}>
          <Link href="/">Ahmad Bobojonov</Link>
          <span>21 Apr, 16:00</span>
        </div>
      </div>
    </div>
  );
};

export default Answer;
