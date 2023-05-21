import React, { useState } from "react";
import { Write } from "@/components";
import Image from "next/image";

import styles from "./internalPage.module.scss";

import image from "@/assets/images/community.png";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";

import ShareIcon from "@mui/icons-material/Share";
import Answer from "./Answer/Answer";
import { card, questionTypes } from "@/data/interfaces";

const InternalPage = ({
  questions = false,
  about,
  data,
}: {
  questions?: boolean;
  about?: boolean;
  data?: card;
}) => {
  const [isWriteAns, setIsWriteAns] = useState<questionTypes>({
    active: false,
    title: "",
    titleFile: null,
    desc: "",
    descFile: null,
  });

  return (
    <div className={styles.internal}>
      {about && (
        <div className={styles.internal_top}>
          <h3 className={styles.hidden_title}>Biz haqimizda</h3>

          <button type="button" className={styles.top_button}>
            Biz bilan bog’laning
          </button>
        </div>
      )}

      <div className={styles.image_wrapper}>
        <Image
          src={data?.image ? data.image : ""}
          alt="about image"
          className={styles.image}
          width={680}
          height={382}
        />
        {!about && (
          <div className={styles.events}>
            <button>
              <TurnedInNotIcon /> Saqlab qo’yish
            </button>
            <button>
              <ShareIcon />
              Ulashish
            </button>
          </div>
        )}
      </div>
      <h2 className={styles.title}>{data?.title}</h2>
      {questions ? (
        <>
          {/* <CardActions data={data} /> */}
          <div className={styles.section}>
            <div className={styles.question}>
              <h3 className={styles.title}>Savol:</h3>
              <h5 className={styles.description}>
                The document regulates the production, processing, storage,
                transportation, labeling and sale, as well as conformity
                assessment and authorization of organic products. In accordance
                with the law, the government will provide subsidies for the The
                document regulates the production, processing, storage,
                transportation, labeling and sale, as well as conformity
                assessment and authorization of organic products. In accordance
                with the law, the government will povide subsidies for the
              </h5>
            </div>

            <div className={styles.answer}>
              <div
                className={styles.answer_head_section}
                data-column={isWriteAns.active}
              >
                <h3 className={styles.title}>Javoblar</h3>
                <div className={styles.answer_write}>
                  {isWriteAns.active ? (
                    <Write state={isWriteAns} setState={setIsWriteAns} />
                  ) : (
                    <button
                      type="button"
                      className={`${styles.button} ${styles.write_ans}`}
                      onClick={() =>
                        setIsWriteAns((propState) => ({
                          ...propState,
                          active: !propState.active,
                        }))
                      }
                    >
                      Javob yozish
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.answer_list}>
              {[1, 2, 3].map((item, index) => (
                <Answer />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className={styles.section}>
          {data?.date && <span className={styles.date}>12 March, 2024</span>}
          <h5 className={styles.description}>{data?.body}</h5>
        </div>
      )}
    </div>
  );
};

export default InternalPage;
