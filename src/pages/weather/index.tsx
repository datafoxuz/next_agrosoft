import { FilterSelect, SNavbar } from "@/components";
import React, { useState } from "react";
import { weatherData } from "@/data";
import SEO from "@/layouts/seo/seo";

import styles from "./weather.module.scss";

import yellowSun from "@/assets/icons/NavbarIcons/sun_yellow.svg";
import weather1 from "@/assets/icons/weather1.svg";
import weather2 from "@/assets/icons/weather2.svg";
import weather3 from "@/assets/icons/weather3.svg";

const index = () => {
  const [item, setItem] = useState<string>("bir");

  const data = ["bir", "ikki", "uch"];

  const siteWay = [
    {
      title: "Bosh sahifa",
      url: "/",
    },
    {
      title: "Ob havo",
      url: "/weather",
    },
  ];

  const weatherData2 = [
    {
      date: "02.06",
      gradus: "5",
      statusImage: weather1,
    },
    {
      date: "02.06",
      gradus: "5",
      statusImage: weather2,
    },
    {
      date: "02.06",
      gradus: "5",
      statusImage: weather3,
    },
    {
      date: "02.06",
      gradus: "5",
      statusImage: weather1,
    },
    {
      date: "02.06",
      gradus: "5",
      statusImage: weather2,
    },
    {
      date: "02.06",
      gradus: "5",
      statusImage: weather3,
    },
  ];

  return (
    <SEO metaTitle="Weather">
      <SNavbar siteWay={siteWay} title="Ob havo ma’lumotlari" />

      <div className={styles.weather}>
        <div className={styles.left_section}>
          <p className={styles.date}>1-Iyun, 2022</p>

          <div className={styles.big_weather}>
            <h2>
              12 <span>°C</span>
            </h2>

            <h3 className={styles.weather_status}>
              <img src={yellowSun.src} alt="yellow sun icon" />
              Sunny
            </h3>
          </div>

          <div className={styles.other_infos}>
            <p>10 °C / 26 °C</p>
            <p>20% Humidity</p>
            <p>12 km/h Wind speed</p>
          </div>
        </div>

        <div className={styles.right_section}>
          <div className={styles.content}>
            <h3 className={styles.title}>Lokatsiya</h3>
            <div className={styles.wrapper}>
              <FilterSelect item={item} setItem={setItem} data={data} />
              <FilterSelect item={item} setItem={setItem} data={data} />
              <button type="button">O’zgartirish</button>
            </div>
          </div>
          <div className={styles.content}>
            <h3 className={styles.title}>Lokatsiya</h3>
            <div className={styles.cards_wrapper}>
              {weatherData.map((item, index) => (
                <div className={styles.card_by_hour} key={index}>
                  <p>{item.time}</p>
                  <h5>{item.gradus}</h5>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.content}>
            <h3 className={styles.title}>Boshqa kunlar</h3>
            <div className={styles.cards_wrapper}>
              {weatherData2.map((item, index) => (
                <div className={styles.card_by_day} key={index}>
                  <p>{item.date}</p>
                  <h5>{item.gradus}°</h5>
                  <img src={item.statusImage.src} alt="weather icon" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SEO>
  );
};

export default index;
