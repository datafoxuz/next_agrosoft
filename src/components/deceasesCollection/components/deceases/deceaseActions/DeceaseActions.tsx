import { useTranslation } from "next-i18next";
import React from "react";
import Image from "next/image";

import styles from "./cardactions.module.scss";

import comment from "@/assets/icons/comment_green.svg";
import calendar from "@/assets/icons/calendar_green.svg";
import verification from "@/assets/icons/verification.svg";
import verificationDis from "@/assets/icons/verification_disabled.svg";
import { deceaseItem } from "@/data/interfaces";

const DeceaseActions = ({
  data,
  inCallection = false,
}: {
  data: deceaseItem;
  inCallection?: boolean;
}) => {
  const { t } = useTranslation("common");
  return (
    <div className={styles.card_actions} data-type={inCallection}>
      <div className={styles.info}>
        <Image
          src={comment.src}
          alt="comment icon"
          className={styles.icon}
          width={13}
          height={13}
        />
        <h5>{data.answers_count}</h5>
      </div>
      <div className={styles.info}>
        <Image
          src={calendar.src}
          alt="calendar icon"
          className={styles.icon}
          width={13}
          height={13}
        />
        <h5>{data.created_at}</h5>
      </div>
      <div className={styles.answer_info} data-checked={data.answers_count}>
        <Image
          src={
            data.answers_count
              ? `${verification.src}`
              : `${verificationDis.src}`
          }
          alt="verification icon"
          className={styles.icon}
          width={13}
          height={13}
        />
        <h5>{data.answers_count 
          ? t("community.answered") : t("community.not_answered")}</h5>
      </div>
    </div>
  );
};

export default DeceaseActions;
