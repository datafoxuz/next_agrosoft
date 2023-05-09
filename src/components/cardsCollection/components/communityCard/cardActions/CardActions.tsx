import React from "react";
import { cardTypes } from "@/data/interfaces";

import styles from "./cardactions.module.scss";

import comment from "@/assets/icons/comment_green.svg";
import calendar from "@/assets/icons/calendar_green.svg";
import verification from "@/assets/icons/verification.svg";
import verificationDis from "@/assets/icons/verification_disabled.svg";

const CardActions = ({ data }: { data: cardTypes }) => {
  return (
    <div className={styles.card_actions}>
      <div className={styles.info}>
        <img src={comment.src} alt="comment icon" className={styles.icon} />
        <h5>{data.commentsNum}</h5>
      </div>
      <div className={styles.info}>
        <img src={calendar.src} alt="calendar icon" className={styles.icon} />
        <h5>{data.date}</h5>
      </div>
      <div className={styles.answer_info} data-checked={data.answered}>
        <img
          src={data.answered ? `${verification.src}` : `${verificationDis.src}`}
          alt="verification icon"
          className={styles.icon}
        />
        <h5>{data.answered ? `Answered` : `Not answered`}</h5>
      </div>
    </div>
  );
};

export default CardActions;
