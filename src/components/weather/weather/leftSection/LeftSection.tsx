import React from "react";
import { WeatherData } from "@/data/interfaces";
import Image from "next/image";
import { useTranslation } from "next-i18next";

import styles from "../../weather.module.scss";

const LeftSection = ({ weatherData }: { weatherData: WeatherData }) => {
  const { t } = useTranslation("common");
  return (
    <div className={styles.left_section}>
        <p className={styles.date}>
          {weatherData?.data?.time.split(",")[0]}, {new Date().getFullYear()}
        </p>

        <div className={styles.big_weather}>
          <h2>
            {Math.floor(weatherData?.data?.current_degree)}
            <span>°C</span>
          </h2>

          <h3 className={styles.weather_status}>
            <Image
              src={weatherData?.data?.weather_icon_url}
              alt="yellow sun icon"
              width={32}
              height={32}
            />
            {weatherData?.data?.weather_status}
          </h3>
        </div>

        <div className={styles.other_infos}>
          <p>
            {Math.floor(weatherData?.data?.coldest_degree)}
            °C /{Math.floor(weatherData?.data?.hottest_degree)}
            °C
          </p>
          <p>
            {t("main.weather.humidity")}
            {weatherData?.data?.humidity}%
          </p>
          <p>
            {t("main.weather.wind")}
            {weatherData?.data?.wind_speed} km/h
          </p>
        </div>
      </div>
  );
};

export default LeftSection;
