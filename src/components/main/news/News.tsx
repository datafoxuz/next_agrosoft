import SwiperCard from "@/components/swiper/swiperCard/SwiperCard";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { ArticlesApiResponse, article } from "@/data/interfaces/articles";
import styles from "./news.module.scss";

import calendar from "@/assets/icons/calendar.svg";



const News = ({ data }: { data: ArticlesApiResponse }) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const newCard: article[] = data.success ? data.data.articles.slice(0, 2) : [];

  function handleNavigate(path: string) {
    router.push(path);
  }
  if (!data.success) return null;

  return data.success ? (
    <div className={styles.container}>
      <div className={styles.main_news}>
        <h2 className={styles.news_title}>{t("main.news.title")}</h2>
        <div className={styles.new_wrapper}>
          {newCard?.length ? (
            <SwiperCard cardDate="12.04.2023" data={newCard[0]} single/>
          ) : null}
          <div className={styles.news_section}>
            {data.data.articles.slice(0, 3).map((item, index) => (
              <div className={styles.news_list} key={index}>
                <Link href={`/articles/${item.slug}`} className={styles.news_item}>
                  {item.title}
                </Link>
                <p className={styles.news_date}>
                  <Image
                    src={calendar.src}
                    alt="calendar small icon"
                    className={styles.icon}
                    width={16}
                    height={16}
                  />
                  {item.created_at}
                </p>
              </div>
            ))}

            <button
              type="button"
              className={styles.news_button}
              onClick={() => handleNavigate("/news")}
            >
              {t("buttons.read_all")}
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default News;
