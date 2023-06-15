import React from "react";
import Link from "next/link";
import {
  routes,
  routeObj,
  openObjTypes,
  languagesData,
  languagesObj,
} from "../../data";
import { AnimatePresence, motion } from "framer-motion";
import { MOTION_CONFIGS } from "@/data";
import { generateName } from "@/utils/helperFunctions";
import { useSession } from "next-auth/react";

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
        <motion.div className={styles.menu} {...MOTION_CONFIGS}>
          {
            <div className={styles.auth_link}>
              {true ? (
                <Link
                  href="/account"
                  className={`${styles.menu_item} ${styles.ava_section}`}
                >
                  <span>
                    {generateName(
                      data?.user?.data.user.name,
                      data?.user?.data.user.lastname
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
          }
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
