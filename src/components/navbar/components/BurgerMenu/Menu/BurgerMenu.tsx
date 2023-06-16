import React from "react";
import Link from "next/link";
import {
  routeObj,
  openObjTypes,
  languagesData,
  languagesObj,
} from "../../../data";
import { AnimatePresence, motion } from "framer-motion";
import { MOTION_CONFIGS, SORT_MOTION_CONFIGS } from "@/data";
import { generateName } from "@/utils/helperFunctions";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";

import styles from "./burgermenu.module.scss";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Image from "next/image";

const BurgerMenu = ({
  active,
  setOpen,
}: {
  active: boolean;
  setOpen: (v: openObjTypes) => void;
}) => {
  const { data }: { data: any } = useSession();
  const { t } = useTranslation("common");

  const routes: routeObj[] = [
    {
      title: t("main_topics.about"),
      url: "/about",
    },
    {
      title: t("main_topics.weather"),
      url: "/weather",
    },
    {
      title: t("main_topics.news"),
      url: "/news",
    },
    {
      title: t("main_topics.community"),
      url: "/community",
    },
    {
      title: t("main_topics.diseases"),
      url: "/diseases",
    },
    {
      title: t("main_topics.blogs"),
      url: "/blogs",
    },
    {
      title: t("main_topics.market"),
      url: "/market",
    },
  ];

  function handleClick() {
    setOpen({
      weatherModal: false,
      burgerMenu: false,
      languagesModal: false,
    });
  }

  return (
    <AnimatePresence>
      {active ? (
        <motion.div className={styles.menu} {...SORT_MOTION_CONFIGS}>
          <div className={styles.auth_link}>
            {true ? (
              <Link
                href="/account"
                className={`${styles.menu_item} ${styles.ava_section}`}
              >
                <span>
                  {generateName(
                    data?.user?.data.user.name,
                    data?.user?.data.user.lastname,
                    t("main_topics.default_name")
                  )}
                </span>
                <AccountCircleIcon className={styles.icon} />
              </Link>
            ) : (
              <Link href="/login" className={styles.menu_item}>
                Kirish
              </Link>
            )}
          </div>
          {routes.map((item: routeObj, index: number) => (
            <Link
              href={item.url}
              className={styles.menu_item}
              key={index}
              onClick={() => handleClick()}
            >
              {item.title}
            </Link>
          ))}
          <div className={styles.languages}>
            {languagesData.map((item: languagesObj, index: number) => (
              <div className={styles.lang_item}>
                <Image
                  src={item.icon}
                  alt="flag icon"
                  width={20}
                  height={20}
                  className={styles.icon}
                />
                <p
                  className={styles.menu_item}
                  key={index}
                  onClick={() => handleClick()}
                >
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default BurgerMenu;
