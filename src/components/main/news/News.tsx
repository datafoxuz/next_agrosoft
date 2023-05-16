import SwiperCard from "@/components/swiper/swiperCard/SwiperCard";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import styles from "./news.module.scss";

import calendar from "@/assets/icons/calendar.svg";

const News = () => {
  const communityData = [
    {
      title: "Pomidorning falon kasalligiga qanday kurashish mumkin?",
      comments: 12,
    },
    {
      title: "Pomidorning falon kasalligiga qanday kurashish mumkin?",
      comments: 14,
    },
    {
      title: "Pomidorning falon kasalligiga qanday kurashish mumkin?",
      comments: 16,
    },
    {
      title: "Pomidorning falon kasalligiga qanday kurashish mumkin?",
      comments: 12,
    },
    {
      title: "Pomidorning falon kasalligiga qanday kurashish mumkin?",
      comments: 11,
    },
  ];

  const router = useRouter();

  function handleNavigate(path: string) {
    router.push(path);
  }

  return (
    <div className={styles.container}>
      <div className={styles.main_news}>
        <h2 className={styles.news_title}>So’nggi yangiliklar</h2>
        <div className={styles.new_wrapper}>
          <SwiperCard cardDate="12.04.2023" />
          <div className={styles.news_section}>
            {communityData.slice(0, 3).map((item, index) => (
              <div className={styles.news_list} key={index}>
                <Link href={`/news/${item.title}`} className={styles.news_item}>
                  100 ming gektardan ziyod yer maydoni qishloq xo‘jaligi
                  sohasiga qayta foydalanishga kiritiladi
                </Link>
                <p className={styles.news_date}>
                  <Image
                    src={calendar.src}
                    alt="calendar small icon"
                    className={styles.icon}
                    width={16}
                    height={16}
                  />
                  12.04.2023
                </p>
              </div>
            ))}
            <button
              type="button"
              className={styles.news_button}
              onClick={() => handleNavigate("/news")}
            >
              Barcha yangiliklarni o’qish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
