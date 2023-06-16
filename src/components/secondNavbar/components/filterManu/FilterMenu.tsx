import { SORT_MOTION_CONFIGS } from "@/data";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useTranslation } from "next-i18next";

import styles from "./filtermenu.module.scss";

const FilterMenu = ({ active }: { active: boolean }) => {
  const { t } = useTranslation("common");
  const [selectId, setSelectId] = useState<number>(0);

  const filters = [
    {
      title: t("second_navbar.sort_modal.item_1"),
      activeTab: 1,
    },
    {
      title: t("second_navbar.sort_modal.item_2"),
      activeTab: 2,
    },
    {
      title: t("second_navbar.sort_modal.item_3"),
      activeTab: 3,
    },
  ];

  function handleClick(id: number) {
    setSelectId(id);
  }

  return (
    <AnimatePresence>
      {active ? (
        <motion.div className={styles.menu} {...SORT_MOTION_CONFIGS}>
          {filters.map(
            (item: { title: string; activeTab: number }, index: number) => (
              <div
                className={styles.sort_item}
                key={index}
                onClick={() => handleClick(item.activeTab)}
              >
                <div
                  className={styles.circle}
                  data-active={item.activeTab == selectId}
                ></div>
                <h5 className={styles.text}>{item.title}</h5>
              </div>
            )
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default FilterMenu;
