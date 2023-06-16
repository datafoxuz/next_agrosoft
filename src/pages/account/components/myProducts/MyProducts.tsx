import React from "react";
import CardsCollection from "@/components/cardsCollection/CardsCollection";
import { cardsForExample } from "@/data";
import { useTranslation } from "next-i18next";

import styles from "../../profile.module.scss";

const MyProducts = () => {
  const { t } = useTranslation("common");
  return (
    <div className={styles.content}>
      <h3 className={styles.title}>{t("account.my_products.title")}</h3>
      <CardsCollection data={cardsForExample} account />
    </div>
  );
};

export default MyProducts;
