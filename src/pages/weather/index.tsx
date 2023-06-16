import { FilterSelect, SNavbar } from "@/components";
import React, { useState } from "react";
import SEO from "@/layouts/seo/seo";
import Image from "next/image";
import WeatherLayout from "@/layouts/weather/WeatherLayout";
import { useMyContext } from "@/hooks/useMyContext";
import { ParsedUrlQuery } from "querystring";
import { DailyAndHourlyWeatherType } from "@/data/interfaces";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { weatherDataExample } from "@/data";

import styles from "./weather.module.scss";

import sun from "@/assets/icons/sun_orange.svg";

const WeatherPage = ({
  regions,
  districts,
}: {
  regions: any;
  districts: any;
}) => {
  const { t } = useTranslation("common");
  //States==============================================================
  const { weatherData, locationInfo } = useMyContext();
  const [regionItem, setRegionItem] = useState<string>(
    locationInfo ? locationInfo.regionNmae : regions ? regions.data[0].name : ""
  );
  const [districtItem, setDistrictItem] = useState<{
    districtName: string;
    lang: string;
    lat: string;
  }>({
    districtName: locationInfo
      ? locationInfo.districtName
      : districts
      ? districts.data[0].name
      : "",
    lang: locationInfo ? locationInfo.lang : "0",
    lat: locationInfo ? locationInfo.lat : "0",
  });

  const siteWay = [
    {
      title: t("main_topics.main_page"),
      url: "/",
    },
    {
      title: t("weather.title"),
      url: "/weather",
    },
  ];

  //Functions========================================================

  function handleChangeLocation() {
    localStorage.setItem(
      "location",
      JSON.stringify({ ...districtItem, regionName: regionItem })
    );
  }

  return (
    <WeatherLayout>
      <SEO metaTitle={`${t("weather.title")} - AgroSoft`}>
        <SNavbar
          siteWay={siteWay}
          title={`${t("main_topics.weather")}`}
          account
        />

        {weatherData && weatherData.data ? (
          <div className={styles.weather}>
            <div className={styles.left_section}>
              <p className={styles.date}>
                {weatherData?.data?.time.split(",")[0]},{" "}
                {new Date().getFullYear()}
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

            <div className={styles.right_section}>
              <div className={styles.content}>
                <h3 className={styles.title}>
                  {t("second_navbar.filter.location")}
                </h3>
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
                            ? `${item.date
                                .toString()
                                .split(":")[0]
                                .slice(1, 3)}:${
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
          </div>
        ) : (
          <div className={styles.weather}>
            <div className={styles.left_section}>
              <p className={styles.date}>october 31, 2004</p>

              <div className={styles.big_weather}>
                <h2>
                  25
                  <span>°C</span>
                </h2>

                <h3 className={styles.weather_status}>
                  <Image
                    src={sun.src}
                    alt="yellow sun icon"
                    width={32}
                    height={32}
                  />
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
                    data={regions.data}
                    region
                  />
                  <FilterSelect
                    item={districtItem.districtName}
                    setItem={setDistrictItem}
                    data={districts.data}
                  />
                  <button type="button" onClick={() => handleChangeLocation()}>
                    O’zgartirish
                  </button>
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
        )}
      </SEO>
    </WeatherLayout>
  );
};

export async function getServerSideProps({
  query,
  locale,
}: {
  query: ParsedUrlQuery;
  locale: string;
}) {
  const { regionId } = query;
  let regionsData;
  let districtData;

  await fetch(`https://agrosoft.uz/api/v1/1/regions`)
    .then((res) => res.json())
    .then((data) => {
      regionsData = data;
    });

  if (regionId) {
    await fetch(`https://agrosoft.uz/api/v1/site/data/${regionId}/districts`)
      .then((res) => res.json())
      .then((data) => {
        districtData = data;
      });
  } else {
    await fetch(`https://agrosoft.uz/api/v1/site/data/1/districts`)
      .then((res) => res.json())
      .then((data) => {
        districtData = data;
      });
  }

  return {
    props: {
      regions: regionsData,
      districts: districtData,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default WeatherPage;
