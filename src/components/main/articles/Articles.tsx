import React from "react";
import { useRouter } from "next/router";
import SwiperCards from "@/components/swiper/SwiperCards";
import Image from "next/image";
import FindError from "@/components/findError/FindError";
import { BlogsApiResponse, data } from "@/data/interfaces";
import { useTranslation } from "next-i18next";

import styles from "./articles.module.scss";

import half_logo from "@/assets/images/half_logo.png";

const Articles = ({ blogs }: { blogs: BlogsApiResponse }) => {
  const { t } = useTranslation("common");
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
        <h2 className={styles.articles_title}>{t("main.blogs.title")}</h2>
        <button
          className={styles.articles__top_button}
          onClick={() => handleNavigate("/blogs")}
        >
          {t("buttons.read_all")}
        </button>
      </div>
      <SwiperCards data={blogs?.data.blogs} />

      <button
        className={styles.articles__bottom_button}
        onClick={() => handleNavigate("/blogs")}
      >
        {t("buttons.read_all")}
      </button>
    </div>
  );
  
};

export default Articles;
