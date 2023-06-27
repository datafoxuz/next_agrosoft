import SwiperCard from "@/components/swiper/swiperCard/SwiperCard";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { card, data } from "@/data/interfaces";
import { useTranslation } from "next-i18next";
import FindError from "@/components/findError/FindError";

import styles from "./news.module.scss";

import calendar from "@/assets/icons/calendar.svg";

const News = ({ data }: { data: data }) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const newCard: card[] = data.status == 200 ? data.data.slice(0, 2) : [];

  function handleNavigate(path: string) {
    router.push(path);
  }

  return data.status === 200 ? (
    <div className={styles.container}>
      <div className={styles.main_news}>
        <h2 className={styles.news_title}>{t("main.news.title")}</h2>
        <div className={styles.new_wrapper}>
          {newCard?.length ? (
            <SwiperCard cardDate="12.04.2023" data={newCard[0]} single/>
          ) : null}
          <div className={styles.news_section}>
            {data.data.slice(0, 3).map((item, index) => (
              <div className={styles.news_list} key={index}>
                <Link href={`/news/${item.slug}`} className={styles.news_item}>
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
  ) : (
    <FindError statusCode={data.status} />
  );
};

export default News;
