import React, { useState } from "react";
import Link from "next/link";

//icons
import HamburgerIcon from "@/assets/icons/HamburgerIcon/HamburgerIcon";
import temperature from "@/assets/icons/sun_yellow.svg";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import app_store from "@/assets/icons/app_store.svg";
import play_store from "@/assets/icons/play_store.svg";
import logo from "@/assets/icons/logo.svg";

//style
import styles from "./navbar.module.scss";

const Navbar = ({ isStatic = false }: { isStatic?: boolean }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={styles.navbar} data-static={isStatic}>
      <div className={styles.section}>
        <div className={styles.temperature}>
          <img
            src={temperature.src}
            alt="sun icon for temperature button"
            className={styles.icon}
          />
          <p>
            12
            <span>°C</span>
            <ArrowBackIosIcon className={styles.arrow_icon} />
          </p>
        </div>
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

      <div className={styles.main_logo}>
        <img
          src={logo.src}
          alt="main logo icon in the navbar center"
          className={styles.logo}
        />
        <h3>AgroSoft</h3>
      </div>

      <div className={`${styles.section} ${styles.r_section}`}>
        <Link href="/">Login</Link>
        <div className={styles.languages}>
          <p className={styles.text}>Uz</p>
          <ArrowBackIosIcon className={styles.arrow_icon} />
        </div>

        <div className={styles.burger_menu} onClick={() => setOpen(!open)}>
          <HamburgerIcon active={open} />
          <p>Menyu</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
