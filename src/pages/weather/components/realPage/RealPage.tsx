import React from "react";
import LeftSection from "../leftSection/LeftSection";
import RightSection from "../rightSection/RightSection";
import { WeatherData, districtTypes } from "@/data/interfaces";

import styles from "../../weather.module.scss";

const RealPage = ({
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
  return (
    <div className={styles.weather}>
      <LeftSection weatherData={weatherData} />

      <RightSection
        weatherData={weatherData}
        regionItem={regionItem}
        setRegionItem={setRegionItem}
        regions={regions}
        districtItem={districtItem}
        setDistrictItem={setDistrictItem}
        districts={districts}
      />
    </div>
  );
};

export default RealPage;
