import React from "react";
import { FilterSelect } from "@/components";
import {
  DailyAndHourlyWeatherType,
  WeatherData,
  districtTypes,
} from "@/data/interfaces";
import Image from "next/image";
import { useTranslation } from "next-i18next";

import styles from "../../weather.module.scss";

const RightSection = ({
  weatherData,
  regionItem,
  setRegionItem,
  regions,
  districtItem,
  setDistrictItem,
  districts,
}: {
  weatherData: WeatherData;
  regionItem: string;
  setRegionItem: (v: string) => void;
  regions: any;
  districtItem: districtTypes;
  setDistrictItem: (v: districtTypes) => void;
  districts: any;
}) => {
  const { t } = useTranslation("common");

  function handleChangeLocation() {
    localStorage.setItem(
      "location",
      JSON.stringify({ ...districtItem, regionName: regionItem })
    );
  }

  return (
    <div className={styles.right_section}>
      <div className={styles.content}>
        <h3 className={styles.title}>{t("second_navbar.filter.location")}</h3>
        <div className={styles.wrapper}>
          <FilterSelect
            item={regionItem}
            setItem={setRegionItem}
            data={regions.data}
            region
          />
          <FilterSelect
            item={districtItem.districtName}
            setItem={setDistrictItem}
            data={districts.data}
          />
          <button type="button" onClick={() => handleChangeLocation()}>
            {t("buttons.change")}
          </button>
        </div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{t("weather.by_hour")}</h3>
        <div className={styles.cards_wrapper}>
          {weatherData?.data?.hourly
            .slice(0, 12)
            .map((item: DailyAndHourlyWeatherType, index: number) => (
              <div className={styles.card_by_hour} key={index}>
                <p>
                  {item.date.toString().split(":")[0].length > 2
                    ? `${item.date.toString().split(":")[0].slice(1, 3)}:${
                        item.date.toString().split(":")[1]
                      }`
                    : item.date}
                </p>
                <h5>{Math.floor(item.max)}°</h5>
              </div>
            ))}
        </div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{t("weather.by_day")}</h3>
        <div className={styles.cards_wrapper}>
          {weatherData?.data?.daily.map(
            (item: DailyAndHourlyWeatherType, index: number) => (
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
  );
};

export default RightSection;
