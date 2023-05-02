import { Collections, SNavbar } from "@/components";
import React from "react";

import styles from "./articles.module.scss";

import card1 from "@/assets/images/community.png";
import card2 from "@/assets/images/articles.png";
import card3 from "@/assets/images/market.png";

const index = () => {
  const siteWay = [
    {
      title: "Bosh sahifa",
      url: "/",
    },
    {
      title: "Barcha kategoriyalar",
      url: "/categories",
    },
  ];

  const data = [
    {
      image: card1,
      title:
        "Anomal sovuq bog‘larni zararladi. Bu meva narxiga qanday ta’sir qiladi?",
      url: "/login",
    },
    {
      image: card2,
      title:
        "“Davlat gazni eksport narxida bizga sotsa ham mayli” -issiqxonachilikdagi muammolar haqida",
      url: "/registration",
    },
    {
      image: card3,
      title:
        "Qishloq xo‘jaligi texnikasi xaridini moliyalashtirish uchun 2,6 trillion so‘m yo‘naltiriladi – prezident qarori",
      url: "/login",
    },
    {
      image: card1,
      title:
        "Anomal sovuq bog‘larni zararladi. Bu meva narxiga qanday ta’sir qiladi?",
      url: "/login",
    },
    {
      image: card2,
      title:
        "Anomal sovuq bog‘larni zararladi. Bu meva narxiga qanday ta’sir qiladi?",
      url: "/login",
    },
  ];

  return (
    <div className={styles.articles}>
      <SNavbar siteWay={siteWay} title="Agro maqolalar" />
      <Collections data={data} />
    </div>
  );
};

export default index;
