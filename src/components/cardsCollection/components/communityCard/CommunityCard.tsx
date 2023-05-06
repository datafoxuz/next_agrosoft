import { cardTypes } from "@/data";
import React from "react";

import styles from "./communitycard.module.scss";

import comment from "@/assets/icons/comment_green.svg";
import calendar from "@/assets/icons/calendar_green.svg";
import verification from "@/assets/icons/verification.svg";
import verificationDis from "@/assets/icons/verification_disabled.svg";

const CommunityCard = ({ data }: { data: cardTypes }) => {
  return (
    <div className={styles.card}>
      <img
        src={data.image.src}
        alt={`image about ${data.title}`}
        className={styles.image}
      />
      <div className={styles.card_infos}>
        <h3 className={styles.description}>{data.title}</h3>
        <div className={styles.card_actions}>
          <div className={styles.info}>
            <img src={comment.src} alt="comment icon" className={styles.icon} />
            <h5>{data.commentsNum}</h5>
          </div>
          <div className={styles.info}>
            <img
              src={calendar.src}
              alt="calendar icon"
              className={styles.icon}
            />
            <h5>{data.date}</h5>
          </div>
          <div className={styles.answer_info} data-checked={data.answered}>
            <img
              src={
                data.answered ? `${verification.src}` : `${verificationDis.src}`
              }
              alt="verification icon"
              className={styles.icon}
            />
            <h5>{data.answered ? `Answered` : `Not answered`}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
