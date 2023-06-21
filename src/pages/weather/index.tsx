import { SNavbar } from "@/components";
import React, { useState } from "react";
import SEO from "@/layouts/seo/seo";
import WeatherLayout from "@/layouts/weather/WeatherLayout";
import { useMyContext } from "@/hooks/useMyContext";
import { ParsedUrlQuery } from "querystring";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import RealPage from "./components/realPage/RealPage";
import { districtTypes } from "@/data/interfaces";

import Template from "./components/template/Template";

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
  const [districtItem, setDistrictItem] = useState<districtTypes>({
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

  return (
    <WeatherLayout>
      <SEO metaTitle={`${t("weather.title")} - AgroSoft`}>
        <SNavbar
          siteWay={siteWay}
          title={`${t("main_topics.weather")}`}
          account
        />

        {weatherData && weatherData.data ? (
          <RealPage
            weatherData={weatherData}
            regionItem={regionItem}
            setRegionItem={setRegionItem}
            regions={regions}
            districtItem={districtItem}
            setDistrictItem={setDistrictItem}
            districts={districts}
          />
        ) : (
          <Template
            regionItem={regionItem}
            setRegionItem={setRegionItem}
            regions={regions}
            districtItem={districtItem}
            setDistrictItem={setDistrictItem}
            districts={districts}
          />
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

  await fetch(
    regionId
      ? `https://agrosoft.uz/api/v1/site/data/${regionId}/districts`
      : `https://agrosoft.uz/api/v1/site/data/1/districts`
  )
    .then((res) => res.json())
    .then((data) => {
      districtData = data;
    });

  return {
    props: {
      regions: regionsData,
      districts: districtData,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default WeatherPage;
