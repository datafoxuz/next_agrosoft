import { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import { SwiperCards } from "@/components";
import SEO from "@/layouts/seo/seo";
import Link from "next/link";
import SwiperCard from "@/components/swiper/swiperCard/SwiperCard";
import { topcards } from "@/data";

import styles from "@/styles/home.module.scss";

// icons and images
import leaf from "@/assets/images/leaf.png";
import diseases from "@/assets/images/diseases.png";
import half_logo from "@/assets/images/half_logo.png";
import comment from "@/assets/icons/comment.svg";
import cotton from "@/assets/images/cotton.png";
import leaf_small from "@/assets/images/leaf_small.png";
import calendar from "@/assets/icons/calendar.svg";

export default function Home() {
  const router = useRouter();

  function handleNavigate(path: string) {
    router.push(path);
  }

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

  const diseasesData = [
    {
      title: "Shot Hole Disease",
      image: diseases,
    },
    {
      title: "Shot Hole Disease",
      image: diseases,
    },
    {
      title: "Shot Hole Disease",
      image: diseases,
    },
    {
      title: "Shot Hole Disease",
      image: diseases,
    },
    {
      title: "Shot Hole Disease",
      image: diseases,
    },
    {
      title: "Shot Hole Disease",
      image: diseases,
    },
    {
      title: "Shot Hole Disease",
      image: diseases,
    },
    {
      title: "Shot Hole Disease",
      image: diseases,
    },
  ];

  return (
    <SEO>
      <div className={styles.main}>
        {/* Header and Hero section */}
        <div className={styles.main_hero}>
          <div className={styles.hero_text}>
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

        {/* Hero cards */}
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
                <img
                  src={item.image.src}
                  alt={`image about ${item.title}`}
                  className={styles.card_image}
                />
                <p className={styles.card_title}>{item.title}</p>
              </div>
            )
          )}
        </div>

        {/* About */}
        <div className={styles.main_about}>
          <h2 className={styles.about_title}>Loyiha haqida</h2>
          <p className={styles.about_text}>
            Bu veb-portali qishloq xo‘jaligi sohasidagi muhim yangiliklar va
            foydali maqolalar yoritib borish uchun tashkil etilgan. Saytga
            tashrif buyuruvchilarni sifatli va foydali maʼlumotlar bilan
            taʼminlash – bizning oldimizga qo‘ygan asosiy maqsadimiz.
          </p>
        </div>

        {/* Latest articles */}
        <div className={styles.main_l_articles}>
          <img
            src={half_logo.src}
            alt="half logo"
            className={styles.half_logo_image}
          />
          <div className={styles.articles_left_section}>
            <h2 className={styles.articles_title}>sO’NGGI mAQOLALAR</h2>
            <button
              className={styles.articles_button}
              onClick={() => handleNavigate("/articles")}
            >
              Barchasini o’qish
            </button>
          </div>

          <SwiperCards />
        </div>

        {/* Community */}
        <div className={styles.main_community}>
          <h3 className={styles.community_title}>Agro jamiyat</h3>
          <p className={styles.community_text}>
            Qizg’in muhokamalar, savol-javoblar
          </p>
          <img
            src={cotton.src}
            alt="cotton image"
            className={styles.top_cotton_img}
          />
          <div className={styles.community_questions}>
            {communityData.map((item, index) => (
              <Link
                href={`/community/${item.title}`}
                className={styles.question}
                key={index}
              >
                <p className={styles.text}>
                  Pomidorning falon kasalligiga qanday kurashish mumkin?
                </p>
                <div className={styles.comment_section}>
                  <img
                    src={comment.src}
                    alt="comment icon"
                    className={styles.icon}
                  />
                  <span>{item.comments}</span>
                </div>
              </Link>
            ))}
          </div>
          <button
            type="button"
            className={styles.community_button}
            onClick={() => handleNavigate("/community")}
          >
            Barchasini o’qish
          </button>
          <img
            src={leaf_small.src}
            alt="cotton image"
            className={styles.leaf_small_img}
          />
        </div>

        {/* Diseases */}
        <div className={styles.main_diseases}>
          <h2 className={styles.diseases_title}>Agrokasalliklar</h2>
          <p className={styles.diseases_text}>
            123 dan ortiq kasalliklar tashxislari bilan
          </p>

          <div
            className={styles.diseases_grid}
            data-length={diseasesData.length == 8}
          >
            {diseasesData.map((item, index) => (
              <div
                className={styles.card}
                key={index}
                onClick={() => handleNavigate(`/diseases/${item.title}`)}
              >
                <img
                  src={item.image.src}
                  alt="diseasess image"
                  className={styles.image}
                />
                <p className={styles.title}>{item.title}</p>
              </div>
            ))}
          </div>

          <button
            type="button"
            className={styles.diseases_button}
            onClick={() => handleNavigate(`/diseases`)}
          >
            Barcha kasalliklarni ko’rish
          </button>
        </div>

        {/* Agro Market*/}
        <div className={styles.main_market}>
          <div className={styles.main_desc}>
            <h2 className={styles.market_title}>Agromarket</h2>
            <p className={styles.market_text}>
              500+ xil mahsulotlardan iborat katta marketpleys
            </p>
          </div>
          <div className={styles.market_section}>
            <h2 className={styles.section_title}>yirik Ulgurji sotuvchilar</h2>
          </div>

          <button
            type="button"
            className={styles.market_button}
            onClick={() => handleNavigate("/market")}
          >
            Marketga kirish
          </button>
        </div>

        {/* News */}
        <div className={styles.main_news}>
          <h2 className={styles.news_title}>So’nggi yangiliklar</h2>
          <div className={styles.new_wrapper}>
            <SwiperCard cardDate="12.04.2023" />
            <div className={styles.news_section}>
              {communityData.slice(0, 3).map((item, index) => (
                <div className={styles.news_list} key={index}>
                  <Link
                    href={`/news/${item.title}`}
                    className={styles.news_item}
                  >
                    100 ming gektardan ziyod yer maydoni qishloq xo‘jaligi
                    sohasiga qayta foydalanishga kiritiladi
                  </Link>
                  <p className={styles.news_date}>
                    <img
                      src={calendar.src}
                      alt="calendar small icon"
                      className={styles.icon}
                    />{" "}
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
    </SEO>
  );
}
