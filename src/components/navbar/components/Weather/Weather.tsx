import React from "react";
import Link from "next/link";
import { MOTION_CONFIGS } from "@/data";
import { AnimatePresence, motion } from "framer-motion";

//icons
import EastIcon from "@mui/icons-material/East";
import sun from "@/assets/icons/sun_orange.svg";

import styles from "./weather.module.scss";

const Weather = ({ active }: { active: boolean }) => {
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
            <Link href="/">
              To’liq ma’lumot <EastIcon />
            </Link>
          </div>

          <div className={styles.weather_degree_cards}>
            <div className={styles.card}>
              <p>00:00</p>
              <h3>5°</h3>
            </div>
            <div className={styles.card}>
              <p>00:00</p>
              <h3>5°</h3>
            </div>
            <div className={styles.card}>
              <p>00:00</p>
              <h3>5°</h3>
            </div>
            <div className={styles.card}>
              <p>00:00</p>
              <h3>5°</h3>
            </div>
            <div className={styles.card}>
              <p>00:00</p>
              <h3>5°</h3>
            </div>
            <div className={styles.card}>
              <p>00:00</p>
              <h3>5°</h3>
            </div>
            <div className={styles.card}>
              <p>00:00</p>
              <h3>5°</h3>
            </div>
            <div className={styles.card}>
              <p>00:00</p>
              <h3>5°</h3>
            </div>
            <div className={styles.card}>
              <p>00:00</p>
              <h3>5°</h3>
            </div>
            <div className={styles.card}>
              <p>00:00</p>
              <h3>5°</h3>
            </div>
            <div className={styles.card}>
              <p>00:00</p>
              <h3>5°</h3>
            </div>
            <div className={styles.card}>
              <p>00:00</p>
              <h3>5°</h3>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Weather;
