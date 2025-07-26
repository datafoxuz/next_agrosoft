import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useTranslation } from "next-i18next";

import { data } from "@/data/interfaces";
import { deceaseItem, DeceasesApiResponse } from "@/data/interfaces/deceases";

import styles from "./diseases.module.scss";
import diseases from "@/assets/images/diseases.png";

const Diseases = ({ data }: { data: DeceasesApiResponse }) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  function handleNavigate(path: string) {
    router.push(path);
  }

  return  (
    <div className={styles.container}>
      <div className={styles.main_diseases}>
        <h2 className={styles.diseases_title}>{t("main.diseases.title")}</h2>
        <p className={styles.diseases_text}>{t("main.diseases.small_text")}</p>

        <div
          className={styles.diseases_grid}
          data-length={data?.data?.deceases.length == 8}
        >
          {data?.data?.deceases?.map((item: deceaseItem, index: number) => (
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
          onClick={() => handleNavigate(`/deceases`)}
        >
          {t("buttons.view_diseases")}
        </button>
      </div>
    </div>
  );
};

export default Diseases;
