import { FilterSelect, SNavbar } from "@/components";
import React, { useState } from "react";
import SEO from "@/layouts/seo/seo";
import Image from "next/image";
import WeatherLayout from "@/layouts/weather/WeatherLayout";
import { useMyContext } from "@/hooks/useMyContext";

import styles from "./weather.module.scss";
import { ParsedUrlQuery } from "querystring";
import { fetchData } from "@/lib/fetchData";
import { request } from "@/lib/request";

interface DailyWeatherType {
  date: number;
  humidity: number;
  max: number;
  min: number;
  weather_description: string;
  weather_icon: string;
  weather_icon_day: string;
  weather_icon_night: string;
  weather_main: string;
  wind_speed: string;
}

const WeatherPage = ({ regions }: { regions: any }) => {
  const [item, setItem] = useState<string>("Tashkent");
  const { weatherData } = useMyContext();

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

  return (
    <WeatherLayout>
      <SEO metaTitle="Weather">
        <SNavbar siteWay={siteWay} title="Ob havo ma’lumotlari" account />

        <div className={styles.weather}>
          <div className={styles.left_section}>
            <p className={styles.date}>
              {weatherData?.data.time.split(",")[0]}, {new Date().getFullYear()}
            </p>

            <div className={styles.big_weather}>
              <h2>
                {weatherData?.data.current_degree
                  ? Math.floor(weatherData?.data.current_degree)
                  : 0}
                <span>°C</span>
              </h2>

              <h3 className={styles.weather_status}>
                <Image
                  src={weatherData?.data.weather_icon_url}
                  alt="yellow sun icon"
                  width={32}
                  height={32}
                />
                {weatherData?.data.weather_status}
              </h3>
            </div>

            <div className={styles.other_infos}>
              <p>
                {weatherData?.data.coldest_degree
                  ? Math.floor(weatherData?.data.coldest_degree)
                  : 0}
                °C /
                {weatherData?.data.hottest_degree
                  ? Math.floor(weatherData?.data.hottest_degree)
                  : 0}
                °C
              </p>
              <p>{weatherData?.data.humidity}% Humidity</p>
              <p>{weatherData?.data.wind_speed} km/h Wind speed</p>
            </div>
          </div>

          <div className={styles.right_section}>
            <div className={styles.content}>
              <h3 className={styles.title}>Lokatsiya</h3>
              <div className={styles.wrapper}>
                <FilterSelect
                  item={item}
                  setItem={setItem}
                  data={regions.data}
                />
                <FilterSelect
                  item={item}
                  setItem={setItem}
                  data={regions.data}
                />
                <button type="button">O’zgartirish</button>
              </div>
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>Soat bo’yicha</h3>
              <div className={styles.cards_wrapper}>
                {weatherData?.data.hourly
                  .slice(0, 12)
                  .map((item: DailyWeatherType, index: number) => (
                    <div className={styles.card_by_hour} key={index}>
                      <p>{item.date}</p>
                      <h5>{Math.floor(item.max)}°</h5>
                    </div>
                  ))}
              </div>
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>Boshqa kunlar</h3>
              <div className={styles.cards_wrapper}>
                {weatherData?.data.daily.map(
                  (item: DailyWeatherType, index: number) => (
                    <div className={styles.card_by_day} key={index}>
                      <p>{item.date}</p>
                      <h5>{Math.floor(item.max)}°</h5>
                      <Image
                        src={item.weather_icon_day}
                        alt="weather icon"
                        width={57}
                        height={57}
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </SEO>
    </WeatherLayout>
  );
};

export async function getServerSideProps() {
  let regionsData;

  await fetch(`https://agrosoft.uz/api/v1/1/regions`)
    .then((res) => res.json())
    .then((data) => {
      regionsData = data;
    });

  return {
    props: {
      regions: regionsData,
    },
  };
}

export default WeatherPage;
