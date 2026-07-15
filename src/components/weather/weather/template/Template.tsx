import React from "react";
import Image from "next/image";
import { FilterSelect } from "@/components";
import { WeatherData, districtTypes } from "@/data/interfaces";

import styles from "../../weather.module.scss";

import sun from "@/assets/icons/sun_orange.svg";
import { weatherDataExample } from "@/data";

const Template = ({
  regionItem,
  setRegionItem,
  regions,
  districtItem,
  setDistrictItem,
  districts,
}: {
  regionItem: string;
  setRegionItem: (v: string) => void;
  regions: any;
  districtItem: districtTypes;
  setDistrictItem: (v: districtTypes) => void;
  districts: any;
}) => {
  return (
    <div className={styles.weather}>
      <div className={styles.left_section}>
        <p className={styles.date}>october 31, 2004</p>

        <div className={styles.big_weather}>
          <h2>
            25
            <span>°C</span>
          </h2>

          <h3 className={styles.weather_status}>
            <Image src={sun.src} alt="yellow sun icon" width={32} height={32} />
            Toza osmon
          </h3>
        </div>

        <div className={styles.other_infos}>
          <p>13 °C / 26 °C</p>
          <p>52% Humidity</p>
          <p>13 km/h Wind speed</p>
        </div>
      </div>

      <div className={styles.right_section}>
        <div className={styles.content}>
          <h3 className={styles.title}>Lokatsiya</h3>
          <div className={styles.wrapper}>
            <FilterSelect
              item={regionItem}
              setItem={setRegionItem}
              data={regions?.data.regions}
              region
            />
            <FilterSelect
              item={districtItem?.districtName}
              setItem={setDistrictItem}
              data={districts?.data.districts}
            />
            <button type="button">O’zgartirish</button>
          </div>
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>Soat bo’yicha</h3>
          <div className={styles.cards_wrapper}>
            {weatherDataExample.map((item, index) => (
              <div className={styles.card_by_hour} key={index}>
                <p>{item.time}</p>
                <h5>{item.gradus}°</h5>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>Boshqa kunlar</h3>
          <div className={styles.cards_wrapper}>
            {weatherDataExample.map((item, index: number) => (
              <div className={styles.card_by_day} key={index}>
                <p>{item.time}</p>
                <h5>{item.gradus}°</h5>
                <Image
                  src={sun.src}
                  alt="weather icon"
                  width={57}
                  height={57}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;
