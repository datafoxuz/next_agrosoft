import React, { useState } from "react";
import Link from "next/link";
import { BurgerMenu, WeatherModal } from "./components";
import { openObjTypes } from "./data";
import { useRouter } from "next/router";

//icons
import HamburgerIcon from "@/assets/icons/HamburgerIcon/HamburgerIcon";
import temperature from "@/assets/icons/NavbarIcons/sun_yellow.svg";
import ArrowIcon from "@/assets/icons/NavbarIcons/ArrowIcons/ArrowIcon";
import app_store from "@/assets/icons/NavbarIcons/app_store.svg";
import play_store from "@/assets/icons/NavbarIcons/play_store.svg";
import logo from "@/assets/icons/logo.svg";

//style
import styles from "./navbar.module.scss";

const Navbar = ({ isStatic = false }: { isStatic?: boolean }) => {
  const [open, setOpen] = useState<openObjTypes>({
    weatherModal: false,
    languagesModal: false,
    burgerMenu: false,
  });

  const router = useRouter();

  return (
    <div className={styles.navbar} data-static={isStatic}>
      <div className={styles.section}>
        <div
          className={styles.temperature}
          onClick={() =>
            setOpen((prevState) => ({
              ...prevState,
              weatherModal: !prevState.weatherModal,
            }))
          }
        >
          <img
            src={temperature.src}
            alt="sun icon for temperature button"
            className={styles.icon}
          />
          <div>
            <p>
              12
              <span>°C</span>
            </p>
            <ArrowIcon active={open.weatherModal} />
          </div>
        </div>

        {open.weatherModal ? <WeatherModal active={open.weatherModal} /> : null}

        <div className={styles.downloads}>
          <img
            src={app_store.src}
            alt="app store icon"
            className={styles.downloads_icon}
          />
          <img
            src={play_store.src}
            alt="play store icon"
            className={styles.downloads_icon}
          />
          <p className={styles.text}>
            <span>Yuklab oling</span>
            Agrosoft
          </p>
        </div>
      </div>

      <div
        className={`${styles.main_logo} ${
          isStatic ? styles.animated_logo : ""
        }`}
        onClick={() => router.push("/")}
      >
        <img
          src={logo.src}
          alt="main logo icon in the navbar center"
          className={styles.logo}
        />
        <h3>AgroSoft</h3>
      </div>

      <div className={`${styles.section} ${styles.r_section}`}>
        <Link href="/login">Login</Link>
        <div
          className={styles.languages}
          onClick={() =>
            setOpen((prevState) => ({
              ...prevState,
              languagesModal: !prevState.languagesModal,
              burgerMenu: false,
            }))
          }
        >
          <p className={styles.text}>Uz</p>
          <ArrowIcon active={open.languagesModal} />
          {open.languagesModal ? (
            <BurgerMenu active={open.languagesModal} language />
          ) : null}
        </div>

        <div
          className={styles.burger_menu}
          onClick={() =>
            setOpen((prevState) => ({
              ...prevState,
              burgerMenu: !prevState.burgerMenu,
              languagesModal: false,
            }))
          }
        >
          <HamburgerIcon active={open.burgerMenu} />
          <p>Menyu</p>
        </div>
        {open.burgerMenu ? <BurgerMenu active={open.burgerMenu} /> : null}
      </div>
    </div>
  );
};

export default Navbar;
