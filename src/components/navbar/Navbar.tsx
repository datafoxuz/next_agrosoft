import React, { useEffect, useState } from "react";
import Link from "next/link";
import { openObjTypes } from "./data";
import { useRouter } from "next/router";
import Image from "next/image";
import { useMyContext } from "@/hooks/useMyContext";
import { generateName } from "@/utils/helperFunctions";
import WeatherLayout from "@/layouts/weather/WeatherLayout";
import { useTranslation } from "next-i18next";
import { request } from "@/lib/request";
import { setCookie } from "nookies";
import dynamic from "next/dynamic";

const BurgerMenu = dynamic(() => import("./components/BurgerMenu/Burger"));
const DownloadLinks = dynamic(
  () => import("./components/DownloadLinks/DownloadLinks")
);
const Languages = dynamic(() => import("./components/Languages/Languages"));
const Weather = dynamic(() => import("./components/Weather/Weather"));

//icons

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
  const { t } = useTranslation("common");
  const { setUser, user } = useMyContext();
  const router = useRouter();

  const [open, setOpen] = useState<openObjTypes>({
    weatherModal: false,
    languagesModal: false,
    burgerMenu: false,
  });

  // check token with about-me api
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");

    if (userToken) {
      request("/users/about-me", "GET", null, false, router.locale, {
        "Content-type": "application/json",
        Authorization: `Bearer ${userToken}`,
      }).then(({ response, data }) => {
        if (response.status === 200) {
          console.log(data.data);

          setUser(data);
          setCookie(null, "userToken", userToken ? userToken : "", {
            maxAge: 30 * 24 * 60 * 60, // Cookie expiration time in seconds (e.g., 30 days)
            path: "/", // The path where the cookie is valid (e.g., the root path)
          });
        } else {
          setCookie(null, "userToken", "", {
            maxAge: 30 * 24 * 60 * 60, // Cookie expiration time in seconds (e.g., 30 days)
            path: "/", // The path where the cookie is valid (e.g., the root path)
          });
        }
      });
    }
  }, []);

  return (
    <WeatherLayout>
      <div className={styles.navbar} data-static={isStatic} data-auth={auth}>
        <div className={styles.section}>
          <Weather open={open} setOpen={setOpen} />
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
          {user?.success ? (
            <Link href="/account" className={styles.ava_section}>
              <AccountCircleIcon />
              <span>
                {generateName(
                  user.data.user.firstname,
                  user.data.user.lastname,
                  t("main_topics.default_name")
                )}
              </span>
            </Link>
          ) : (
            <Link href="/login" className={styles.login_link}>
              {t("auth.login")}
            </Link>
          )}

          <Languages open={open} setOpen={setOpen} />
          <BurgerMenu open={open} setOpen={setOpen} />
        </div>
      </div>
    </WeatherLayout>
  );
};

export default Navbar;
