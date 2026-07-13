import React from "react";
import Image from "next/image";
import SEO from "@/layouts/seo/seo";
import { useTranslation } from "next-i18next";
import { card } from "@/data/interfaces";
import defaultImage from "@/assets/images/default_image.png";

import styles from "./internalPage.module.scss";

const ProductInternalPage = ({ data }: { data: card }) => {
  const { t } = useTranslation("common");

  return (
    <div className={styles.internal}>
      <SEO metaTitle={data.seo?.title} metaDescription={data.seo?.description} author={data.seo?.author}>
        <div className={`${styles.image_wrapper} ${styles.section}`}>
          <Image
            src={data.image ? data.image : defaultImage.src}
            alt="product image"
            className={styles.image}
            width={680}
            height={382}
          />
        </div>

        <h2 className={styles.title}>{data.title}</h2>

        <div className={styles.section}>
          <div className={styles.infos_wrapper}>
            {data.author_name && (
              <p className={styles.infos}>
                {t("inner_page.author")}: <span>{data.author_name}</span>
              </p>
            )}
            {data.author_phone && (
              <p className={styles.infos}>
                {t("inner_page.tell")}: <span>{data.author_phone}</span>
              </p>
            )}
            {data.country_name && (
              <p className={styles.infos}>
                {t("inner_page.country")}: <span>{data.country_name}</span>
              </p>
            )}
            {data.region_name && (
              <p className={styles.infos}>
                {t("inner_page.region")}: <span>{data.region_name}</span>
              </p>
            )}
            {data.high_price && (
              <p className={styles.infos}>
                {t("inner_page.price")}:{" "}
                <span>{data.high_price} USD {t("card.per_kg")}</span>
              </p>
            )}
          </div>
          <h5 className={styles.description}>{data.body}</h5>
        </div>
      </SEO>
    </div>
  );
};

export default ProductInternalPage;