import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import FindError from "@/components/findError/FindError";
import { useTranslation } from "next-i18next";
import { card, data } from "@/data/interfaces";

import styles from "./diseases.module.scss";

import diseases from "@/assets/images/diseases.png";

const Diseases = ({ data }: { data: data }) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  function handleNavigate(path: string) {
    router.push(path);
  }

  return data.status === 200 ? (
    <div className={styles.container}>
      <div className={styles.main_diseases}>
        <h2 className={styles.diseases_title}>{t("main.diseases.title")}</h2>
        <p className={styles.diseases_text}>{t("main.diseases.small_text")}</p>

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
          onClick={() => handleNavigate(`/deceases`)}
        >
          {t("buttons.view_diseases")}
        </button>
      </div>
    </div>
  ) : (
    <FindError statusCode={data.status} />
  );
};

export default Diseases;
