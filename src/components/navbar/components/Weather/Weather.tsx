import React from "react";
import { openObjTypes } from "../../data";
import { useMyContext } from "@/hooks/useMyContext";
import Image from "next/image";
import WeatherModal from "./WeatherModal/WeatherModal";

import styles from "../../navbar.module.scss";

import temperature from "@/assets/icons/NavbarIcons/sun_yellow.svg";
import ArrowIcon from "@/assets/icons/NavbarIcons/ArrowIcons/ArrowIcon";

const Weather = ({
  open,
  setOpen,
}: {
  open: openObjTypes;
  setOpen: (v: openObjTypes) => void;
}) => {
  const { weatherData } = useMyContext();
  return (
    <div className={styles.modal_wrapper}>
      <div
        className={styles.temperature}
        onClick={() =>
          setOpen({
            weatherModal: !open.weatherModal,
            burgerMenu: false,
            languagesModal: false,
          })
        }
      >
        {weatherData && weatherData.data ? (
          <>
            <Image
              src={weatherData?.data?.weather_icon_url}
              alt="sun icon for temperature button"
              className={styles.icon}
              width={32}
              height={32}
            />
            <div>
              <p>
                {Math.floor(weatherData.data.current_degree)}
                <span>°C</span>
              </p>
              <ArrowIcon active={open.weatherModal} />
            </div>
          </>
        ) : (
          <>
            <Image
              src={temperature.src}
              alt="sun icon for temperature button"
              className={styles.icon}
              width={32}
              height={32}
            />
            <div>
              <p>
                12
                <span>°C</span>
              </p>
              <ArrowIcon active={open.weatherModal} />
            </div>
          </>
        )}
      </div>

      {open.weatherModal && (
        <WeatherModal
          active={open.weatherModal}
          setOpen={setOpen}
          open={open}
        />
      )}
    </div>
  );
};

export default Weather;
