import React, { useState } from "react";
import Link from "next/link";
import { BurgerMenu, DownloadLinks, Languages, Weather } from "./components";
import { openObjTypes } from "./data";
import { useRouter } from "next/router";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { generateName } from "@/utils/helperFunctions";
import WeatherLayout from "@/layouts/weather/WeatherLayout";
import { useTranslation } from "next-i18next";

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
  const { data, status }: { data: any; status: string } = useSession();
  const { t } = useTranslation("common");

  const router = useRouter();

  const [open, setOpen] = useState<openObjTypes>({
    weatherModal: false,
    languagesModal: false,
    burgerMenu: false,
  });

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
          {status === "authenticated" ? (
            <Link href="/account" className={styles.ava_section}>
              <AccountCircleIcon />
              <span>
                {generateName(
                  data?.user?.data.user.name,
                  data?.user?.data.user.lastname,
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
