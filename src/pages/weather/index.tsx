import React, { useEffect, useState } from "react";
import SEO from "@/layouts/seo/seo";
import WeatherLayout from "@/layouts/weather/WeatherLayout";
import { useMyContext } from "@/hooks/useMyContext";
import { ParsedUrlQuery } from "querystring";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { districtTypes, WeatherData } from "@/data/interfaces";
import { DEFAULT_COORDS } from "@/context";
import dynamic from "next/dynamic";
import { request } from "@/lib/request";
import { RegionsApiResponse } from "@/data/interfaces/regions";
import { DistrictsApiResponse } from "@/data/interfaces/districts";
import RealPage from "@/components/weather/realPage/RealPage";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";

const SNavbar = dynamic(() => import("@/components/secondNavbar/SecondNavbar"));

const WeatherPage = ({
  regions,
  districts,
  regionId,
  initialWeather,
}: {
  regions: RegionsApiResponse;
  districts: DistrictsApiResponse;
  regionId: number;
  initialWeather: WeatherData | null;
}) => {
  const { t } = useTranslation("common");
  //States==============================================================
  const { weatherData: clientWeather, locationInfo } = useMyContext();
  // Server-rendered forecast until the client one (user location) arrives.
  const weatherData = clientWeather ?? initialWeather;
  const router = useRouter();
  const routerRegionId = router.query.regionId ? Number(router.query.regionId) : null;
  const regionList = regions?.data?.regions ?? [];
  const districtList = districts?.data?.districts ?? [];
  const [regionItem, setRegionItem] = useState<string>(
    regionList.find((r) => r.id === regionId)?.name ?? regionList[0]?.name ?? ""
  );
  const [districtItem, setDistrictItem] = useState<districtTypes>({
    districtName: districtList[0]?.name ?? "",
    lat: districtList[0]?.lat ?? "",
    long: districtList[0]?.long ?? "",
  });

  // Show the location the user saved earlier (when it belongs to this region list).
  useEffect(() => {
    if (locationInfo?.regionName && !routerRegionId) {
      setRegionItem(locationInfo.regionName);
      if (locationInfo.districtName)
        setDistrictItem({
          districtName: locationInfo.districtName,
          lat: String(locationInfo.lat ?? ""),
          long: String(locationInfo.long ?? ""),
        });
    }
  }, [locationInfo, routerRegionId]);

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
      <SEO metaTitle={t("seo.weather.title")} metaDescription={t("seo.weather.description")}>
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
          <div style={{ padding: "80px 0", textAlign: "center" }} aria-busy="true">
            <CircularProgress color="success" />
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
  // Default: Toshkent shahri (region id 22).
  const regionId = Number(query.regionId) || 22;

  const [regionsData, districtData] = await Promise.all([
    request(`/data/1/regions`, "GET", null, { locale }),
    request(`/data/${regionId}/districts`, "GET", null, { locale }),
  ]);

  const first = districtData?.data?.data?.districts?.[0];
  const lat = Number(first?.lat);
  const long = Number(first?.long);
  const coords =
    lat > 37 && lat < 46 && long > 55 && long < 74 ? { lat, long } : DEFAULT_COORDS;
  let initialWeather = null;
  try {
    const w = await request(`/weather?lat=${coords.lat}&long=${coords.long}`, "GET", null, { locale });
    initialWeather = w?.data?.success ? w.data : null;
  } catch {
    initialWeather = null;
  }

  return {
    props: {
      regionId,
      initialWeather,
      regions: regionsData.data,
      districts: districtData.data,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default WeatherPage;
