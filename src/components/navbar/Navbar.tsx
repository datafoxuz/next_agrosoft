import React, { useState } from "react";
import Link from "next/link";
import {
  BurgerMenu,
  DownloadLinks,
  LanguagesModal,
  WeatherModal,
} from "./components";
import { openObjTypes } from "./data";
import { useRouter } from "next/router";
import Image from "next/image";

//icons
import HamburgerIcon from "@/assets/icons/HamburgerIcon/HamburgerIcon";
import temperature from "@/assets/icons/NavbarIcons/sun_yellow.svg";
import ArrowIcon from "@/assets/icons/NavbarIcons/ArrowIcons/ArrowIcon";
import logo from "@/assets/icons/NavbarIcons/logo.svg";
import logo_white from "@/assets/icons/logo_white.svg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

//style
import styles from "./navbar.module.scss";

const Navbar = ({
  isStatic = false,
  auth = false,
}: {
  isStatic?: boolean;
  auth?: boolean;
}) => {
  const router = useRouter();

  const [open, setOpen] = useState<openObjTypes>({
    weatherModal: false,
    languagesModal: false,
    burgerMenu: false,
  });

  return (
    <div className={styles.navbar} data-static={isStatic} data-auth={auth}>
      <div className={styles.section}>
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
          </div>

          {open.weatherModal && (
            <WeatherModal
              active={open.weatherModal}
              setOpen={setOpen}
              open={open}
            />
          )}
        </div>

        <DownloadLinks />
      </div>

      <div className={`${styles.main_logo}`} onClick={() => router.push("/")}>
        {isStatic ? (
          <Image
            src={logo_white.src}
            alt="main logo icon in the navbar center"
            className={styles.logo}
            width={46}
            height={50}
          />
        ) : (
          <Image
            src={logo.src}
            alt="main logo icon in the navbar center"
            className={styles.logo}
            width={84}
            height={90}
          />
        )}
        <h3>AgroSoft</h3>
      </div>

      <div className={`${styles.section} ${styles.r_section}`}>
        {false ? (
          <Link href="/account" className={styles.ava_section}>
            <AccountCircleIcon />
            <span>Sh Raxmatov</span>
          </Link>
        ) : (
          <Link href="/login" className={styles.login_link}>
            Login
          </Link>
        )}

        <div className={styles.modal_wrapper}>
          <div
            className={styles.languages}
            onClick={() =>
              setOpen({
                weatherModal: false,
                burgerMenu: false,
                languagesModal: !open.languagesModal,
              })
            }
          >
            <p className={styles.text}>Uz</p>
            <ArrowIcon active={open.languagesModal} />
          </div>

          {open.languagesModal && (
            <LanguagesModal
              active={open.languagesModal}
              open={open}
              setOpen={setOpen}
            />
          )}
        </div>

        <div className={styles.modal_wrapper}>
          <div
            className={styles.burger_menu}
            onClick={() =>
              setOpen({
                weatherModal: false,
                burgerMenu: !open.burgerMenu,
                languagesModal: false,
              })
            }
          >
            <HamburgerIcon active={open.burgerMenu} />
            <p>Menyu</p>
          </div>

          {open.burgerMenu && (
            <BurgerMenu active={open.burgerMenu} setOpen={setOpen} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
