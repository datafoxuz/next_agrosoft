import React, { useState } from "react";
import SEO from "@/layouts/seo/seo";
import WeatherLayout from "@/layouts/weather/WeatherLayout";
import { useMyContext } from "@/hooks/useMyContext";
import { ParsedUrlQuery } from "querystring";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { districtTypes } from "@/data/interfaces";
import dynamic from "next/dynamic";
import { request } from "@/lib/request";
import { RegionsApiResponse } from "@/data/interfaces/regions";
import { DistrictsApiResponse } from "@/data/interfaces/districts";

const SNavbar = dynamic(() => import("@/components/secondNavbar/SecondNavbar"));
const RealPage = dynamic(() => import("./components/realPage/RealPage"));
const Template = dynamic(() => import("./components/template/Template"));

const WeatherPage = ({
  regions,
  districts,
}: {
  regions: RegionsApiResponse;
  districts: DistrictsApiResponse;
}) => {
  const { t } = useTranslation("common");
  //States==============================================================
  const { weatherData, locationInfo } = useMyContext();
  const [regionItem, setRegionItem] = useState<string>(
    locationInfo ? locationInfo.regionNmae : regions ? regions.data.regions[0].name : ""
  );
  const [districtItem, setDistrictItem] = useState<districtTypes>({
    districtName: locationInfo
      ? locationInfo.districtName
      : districts
      ? districts.data.districts[0].name
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
  let regionsData = null;
  let districtData = null;

  regionsData = await request(`/data/1/regions`, "GET", null, false, locale);
  districtData = await request(
    regionId ? `/data/${regionId}/districts` : `/data/1/districts`,
    "GET",
    null,
    false,
    locale
  );

  return {
    props: {
      regions: regionsData.data,
      districts: districtData.data,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default WeatherPage;
