import React, { useEffect, useRef } from "react";
import { languagesData, languagesObj, openObjTypes } from "../../../data";
import { AnimatePresence, motion } from "framer-motion";
import { MOTION_CONFIGS } from "@/data";
import { LangTypes } from "@/data/interfaces";
import { useRouter } from "next/router";

import styles from "./language.module.scss";

import Image from "next/image";

const LangModal = ({
  active,
  setValue,
  setOpen,
  open,
}: {
  active: boolean;
  setValue: (v: LangTypes) => void;
  setOpen: (v: openObjTypes) => void;
  open: openObjTypes;
}) => {
  const router = useRouter();

  const langRef = useRef<any>(null);

  const handleClickOutside = (event: any) => {
    if (langRef.current && !langRef.current.contains(event.target)) {
      // Click occurred outside the Weather component
      setOpen({
        weatherModal: open.weatherModal,
        burgerMenu: open.weatherModal,
        languagesModal: false,
      });
    }
  };

  // Add event listener when the component mounts
  useEffect(() => {
    if (open.languagesModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleClick(label: string, value: string, flagSt: string) {
    setValue({ value: label, flag: flagSt });
    setOpen({
      weatherModal: false,
      burgerMenu: false,
      languagesModal: false,
    });
    router.replace(router.route, router.asPath, {
      locale: value || "uz",
    });
  }

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          className={styles.language_menu}
          {...MOTION_CONFIGS}
          ref={langRef}
        >
          {languagesData.map((item: languagesObj, index: number) => (
            <div
              key={index}
              className={styles.lang_item}
              onClick={() => handleClick(item.title, item.config, item.config)}
            >
              <Image
                src={item.icon}
                alt="flag icon"
                width={20}
                height={20}
                className={styles.icon}
              />
              <p className={styles.text} key={index}>
                {item.title}
              </p>
            </div>
          ))}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default LangModal;
