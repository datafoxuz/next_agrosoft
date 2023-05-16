import React from "react";
import Link from "next/link";
import Image from "next/image";

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
              <Image
                src={item.src}
                alt="answer image"
                key={index}
                className={styles.image}
                width={133}
                height={119}
              />
            ))}
          </div>
        ) : null}
      </div>

      <div className={styles.person_section}>
        <Image
          src={image.src}
          alt="person image"
          className={styles.image}
          width={43}
          height={43}
        />

        <div className={styles.person_info}>
          <Link href="/">Ahmad Bobojonov</Link>
          <span>21 Apr, 16:00</span>
        </div>
      </div>
    </div>
  );
};

export default Answer;
