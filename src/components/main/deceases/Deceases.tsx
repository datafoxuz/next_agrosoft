import React from "react";
import Image from "next/image";

import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { deceaseItem, DeceasesApiResponse } from "@/data/interfaces/deceases";

import styles from "./deceases.module.scss";
import deceases from "@/assets/images/deceases.png";

const Deceases = ({ data }: { data: DeceasesApiResponse }) => {
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
              onClick={() => handleNavigate(`/deceases/${item.slug}`)}
            >
              <Image
                src={item.image ? item.image : deceases.src}
                alt="diseasess image"
                className={styles.image}
                width={300}
                height={300}
              />
              <p className={styles.title}>{item.name}</p>
            </div>
          ))}
        </div>

        <button
          type="button"
          className={styles.diseases_button}
          onClick={() => handleNavigate(`/deceases`)}
        >
          {t("buttons.view_deceases")}
        </button>
      </div>
    </div>
  );
};

export default Deceases;
