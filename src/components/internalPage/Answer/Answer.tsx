import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { answerType } from "@/data/interfaces";

import styles from "./answer.module.scss";

import image from "@/assets/images/community.png";

const Answer = ({ data }: { data: answerType }) => {
  const { t } = useTranslation("common");

  return (
    <div className={`${styles.answer} ${data.is_ai ? styles.ai : ""}`}>
      <div className={styles.text_section}>
        {data.is_ai ? <span className={styles.ai_badge}>✨ {t("community.ai_badge")}</span> : null}
        <p className={styles.description}>{data.text}</p>
        {data.is_ai ? <p className={styles.ai_note}>{t("community.ai_note")}</p> : null}

        {data.images?.length ? (
          <div className={styles.images}>
            {data.images.map((item, index) => (
              <Image
                src={item.src}
                alt="answer image"
                key={index}
                className={styles.image}
                width={133}
                height={119}
              />
            ))}
          </div>
        ) : null}
      </div>

      <div className={styles.person_section}>
        <Image
          src={image.src}
          alt="person image"
          className={styles.image}
          width={43}
          height={43}
        />

        <div className={styles.person_info}>
          {data.is_ai ? <span className={styles.ai_name}>{data.author_name}</span> : <Link href="/">{data.author_name}</Link>}
          <span>{data.created_at}</span>
        </div>
      </div>
    </div>
  );
};

export default Answer;
