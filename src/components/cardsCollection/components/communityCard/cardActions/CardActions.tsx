import React from "react";
import { card, cardTypes } from "@/data/interfaces";
import Image from "next/image";

import styles from "./cardactions.module.scss";

import comment from "@/assets/icons/comment_green.svg";
import calendar from "@/assets/icons/calendar_green.svg";
import verification from "@/assets/icons/verification.svg";
import verificationDis from "@/assets/icons/verification_disabled.svg";

const CardActions = ({
  data,
  inCallection = false,
}: {
  data: card;
  inCallection?: boolean;
}) => {
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
      <div className={styles.answer_info} data-checked={data.is_answered}>
        <Image
          src={
            data.is_answered == 1
              ? `${verification.src}`
              : `${verificationDis.src}`
          }
          alt="verification icon"
          className={styles.icon}
          width={13}
          height={13}
        />
        <h5>{data.is_answered ? `Answered` : `Not answered`}</h5>
      </div>
    </div>
  );
};

export default CardActions;
