import React from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { DownloadLinks } from "@/components/navbar/components";

import styles from "./hero.module.scss";

import leaf from "@/assets/images/leaf.png";

const Hero = () => {
  const { t } = useTranslation("common");
  const { locale } = useRouter();

  return (
    <div className={styles.main_hero}>
      <div className={styles.hero_text}>
        <DownloadLinks classN />
        <h4>Agrosoft</h4>
        <h1 className={styles.title}>{t("title")}</h1>
        <p className={styles.text}>Barcha agro-ma’lumotlar bir yerda! </p>

        {locale == "uz" && (
          <Image
            src={leaf.src}
            alt="leaf image top right"
            className={styles.leaf_img}
            width={362}
            height={254}
          />
        )}
      </div>
    </div>
  );
};

export default Hero;
