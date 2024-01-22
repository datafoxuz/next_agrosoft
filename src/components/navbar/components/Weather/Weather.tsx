import React, { useEffect, useRef } from "react";
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
  const weatherRef = useRef<any>(null);

  const handleClickOutside = (event: any) => {
    if (weatherRef.current && !weatherRef.current.contains(event.target)) {
      // Click occurred outside the Weather component
      setOpen({
        weatherModal: false,
        burgerMenu: open.burgerMenu,
        languagesModal: open.languagesModal,
      });
    }
  };

  // Add event listener when the component mounts
  useEffect(() => {
    if (open.weatherModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.modal_wrapper} ref={weatherRef}>
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
