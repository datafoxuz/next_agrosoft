import React from "react";
import Image from "next/image";
import {
  MOTION_CONFIGS,
  SORT_MOTION_CONFIGS,
  weatherDataExample,
} from "@/data";
import { DailyAndHourlyWeatherType } from "@/data/interfaces";
import { AnimatePresence, motion } from "framer-motion";
import { openObjTypes } from "../../../data";
import { useRouter } from "next/router";
import { useMyContext } from "@/hooks/useMyContext";
import { useTranslation } from "next-i18next";

//icons
import EastIcon from "@mui/icons-material/East";
import sun from "@/assets/icons/sun_orange.svg";

import styles from "./weather.module.scss";

const WeatherModal = ({
  active,
  open,
  setOpen,
}: {
  active: boolean;
  open: openObjTypes;
  setOpen: (v: openObjTypes) => void;
}) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { weatherData } = useMyContext();

  function handleClick() {
    router.push("/weather");
    setOpen({
      ...open,
      weatherModal: !open.weatherModal,
    });
  }

  return (
    <AnimatePresence>
      {active ? (
        weatherData && weatherData.data ? (
          <motion.div className={styles.weather} {...SORT_MOTION_CONFIGS}>
            <div className={styles.weather_big_infos}>
              <div className={styles.section}>
                <div className={styles.weather_degree}>
                  <Image
                    src={weatherData?.data?.weather_icon_url}
                    alt="orange sun icon"
                    className={styles.icon}
                    width={56}
                    height={56}
                  />
                  <h2 className={styles.title}>
                    {Math.floor(weatherData.data.current_degree)}°
                  </h2>
                </div>

                <div className={styles.info_list}>
                  <p>
                    {t("main.weather.humidity")} {weatherData.data.humidity}%{" "}
                  </p>
                  <p>
                    {t("main.weather.wind")}{" "}
                    {Math.floor(weatherData.data.wind_speed)}km/h
                  </p>
                </div>
              </div>
              <p className={styles.link} onClick={() => handleClick()}>
                {t("main.weather.full_info")} <EastIcon />
              </p>
            </div>

            <div className={styles.weather_degree_cards}>
              {weatherData?.data?.hourly
                .slice(0, 12)
                .map((item: DailyAndHourlyWeatherType, index: number) => (
                  <div className={styles.card} key={index}>
                    <p>
                      {item.date.toString().split(":")[0].length > 2
                        ? `${item.date.toString().split(":")[0].slice(1, 3)}:${
                            item.date.toString().split(":")[1]
                          }`
                        : item.date}{" "}
                    </p>
                    <h3>{Math.floor(item.max)}°</h3>
                  </div>
                ))}
            </div>
          </motion.div>
        ) : (
          <motion.div className={styles.weather} {...SORT_MOTION_CONFIGS}>
            <div className={styles.weather_big_infos}>
              <div className={styles.section}>
                <div className={styles.weather_degree}>
                  <Image
                    src={sun.src}
                    alt="orange sun icon"
                    className={styles.icon}
                    width={56}
                    height={56}
                  />
                  <h2 className={styles.title}>12°</h2>
                </div>

                <div className={styles.info_list}>
                  <p>{t("main.weather.humidity")} 52% </p>
                  <p>{t("main.weather.wind")} 13 km/h</p>
                </div>
              </div>
              <p className={styles.link} onClick={() => handleClick()}>
                {t("main.weather.full_info")} <EastIcon />
              </p>
            </div>

            <div className={styles.weather_degree_cards}>
              {weatherDataExample.map((item, index) => (
                <div className={styles.card} key={index}>
                  <p>{item.time}</p>
                  <h3>{item.gradus}</h3>
                </div>
              ))}
            </div>
          </motion.div>
        )
      ) : null}
    </AnimatePresence>
  );
};

export default WeatherModal;
