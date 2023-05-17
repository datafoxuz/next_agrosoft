import React from "react";
import { useRouter } from "next/router";
import SwiperCards from "@/components/swiper/SwiperCards";
import Image from "next/image";
import { articles } from "@/data/interfaces";

import styles from "./articles.module.scss";

import half_logo from "@/assets/images/half_logo.png";

const Articles = ({ data }: { data: articles[] }) => {
  const router = useRouter();
  function handleNavigate(path: string) {
    router.push(path);
  }

  return (
    <div className={styles.main_l_articles}>
      <Image
        src={half_logo.src}
        alt="half logo"
        className={styles.half_logo_image}
        width={128}
        height={350}
      />
      <div className={styles.articles_left_section}>
        <h2 className={styles.articles_title}>sO’NGGI mAQOLALAR</h2>
        <button
          className={styles.articles__top_button}
          onClick={() => handleNavigate("/articles")}
        >
          Barchasini o’qish
        </button>
      </div>

      <SwiperCards data={data} />

      <button
        className={styles.articles__bottom_button}
        onClick={() => handleNavigate("/articles")}
      >
        Barchasini o’qish
      </button>
    </div>
  );
};

export default Articles;
