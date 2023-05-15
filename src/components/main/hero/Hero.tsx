import React from "react";

import { DownloadLinks } from "@/components/navbar/components";

import styles from "./hero.module.scss";

import leaf from "@/assets/images/leaf.png";

const Hero = () => {
  return (
    <div className={styles.main_hero}>
      <div className={styles.hero_text}>
        <DownloadLinks classN />
        <h4>Agrosoft</h4>
        <h1 className={styles.title}>Sizning Agro yordamchingiz!</h1>
        <p className={styles.text}>Barcha agro-ma’lumotlar bir yerda! </p>

        <img
          src={leaf.src}
          alt="leaf image top right"
          className={styles.leaf_img}
        />
      </div>
    </div>
  );
};

export default Hero;
