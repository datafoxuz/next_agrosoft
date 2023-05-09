import React from "react";
import Link from "next/link";
import { MOTION_CONFIGS, weatherData } from "@/data";
import { AnimatePresence, motion } from "framer-motion";
import { openObjTypes } from "../../data";
import { useRouter } from "next/router";

//icons
import EastIcon from "@mui/icons-material/East";
import sun from "@/assets/icons/sun_orange.svg";

import styles from "./weather.module.scss";

const Weather = ({
  active,
  open,
  setOpen,
}: {
  active: boolean;
  open: openObjTypes;
  setOpen: (v: openObjTypes) => void;
}) => {
  const router = useRouter();

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
        <motion.div className={styles.weather} {...MOTION_CONFIGS}>
          <div className={styles.weather_big_infos}>
            <div className={styles.section}>
              <div className={styles.weather_degree}>
                <img
                  src={sun.src}
                  alt="orange sun icon"
                  className={styles.icon}
                />
                <h2 className={styles.title}>12°</h2>
              </div>

              <div className={styles.info_list}>
                <p>Precipitation: 0% </p>
                <p>Humidity: 61% </p>
                <p>Wind: 18 km/h</p>
              </div>
            </div>
            <p className={styles.link} onClick={() => handleClick()}>
              To’liq ma’lumot <EastIcon />
            </p>
          </div>

          <div className={styles.weather_degree_cards}>
            {weatherData.map((item, index) => (
              <div className={styles.card} key={index}>
                <p>{item.time}</p>
                <h3>{item.gradus}</h3>
              </div>
            ))}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Weather;
