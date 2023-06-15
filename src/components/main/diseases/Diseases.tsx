import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useTranslation } from "next-i18next";

import styles from "./diseases.module.scss";

import diseases from "@/assets/images/diseases.png";
import { card, data } from "@/data/interfaces";

const Diseases = ({ data }: { data: data }) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  function handleNavigate(path: string) {
    router.push(path);
  }

  return (
    <div className={styles.container}>
      <div className={styles.main_diseases}>
        <h2 className={styles.diseases_title}>{t("diseases.title")}</h2>
        <p className={styles.diseases_text}>{t("diseases.small_text")}</p>

        <div
          className={styles.diseases_grid}
          data-length={data?.data?.length == 8}
        >
          {data?.data?.map((item: card, index: number) => (
            <div
              className={styles.card}
              key={index}
              onClick={() => handleNavigate(`/diseases/${item.slug}`)}
            >
              <Image
                src={item.image ? item.image : diseases.src}
                alt="diseasess image"
                className={styles.image}
                width={300}
                height={300}
              />
              <p className={styles.title}>{item.title}</p>
            </div>
          ))}
        </div>

        <button
          type="button"
          className={styles.diseases_button}
          onClick={() => handleNavigate(`/diseases`)}
        >
          {t("buttons.view_diseases")}
        </button>
      </div>
    </div>
  );
};

export default Diseases;
