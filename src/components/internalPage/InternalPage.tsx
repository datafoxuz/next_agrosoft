import React, { useState } from "react";
import { Write } from "@/components";
import Answer from "./Answer/Answer";

import Image from "next/image";
import { useTranslation } from "next-i18next";
import { card, questionTypes } from "@/data/interfaces";

import styles from "./internalPage.module.scss";

import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";

import ShareIcon from "@mui/icons-material/Share";
import defaultImage from "@/assets/images/default_image.png"

const InternalPage = ({
  questions = false,
  about,
  data,
  similar = [],
}: {
  questions?: boolean;
  about?: boolean;
  data?: card;
  similar?: []
}) => {
  const { t } = useTranslation("common");
  const [isWriteAns, setIsWriteAns] = useState<questionTypes>({
    active: false,
    title: "",
    file: null,
    desc: "",
  });

  return (
    <div className={styles.internal}>
      {about && (
        <div className={`${styles.internal_top} ${styles.section}`}>
          <h3 className={styles.hidden_title}>{t("inner_page.about_us")}</h3>

          <button type="button" className={styles.top_button}>
            {t("buttons.contact")}
          </button>
        </div>
      )}

      {data && (
        <>
          <div className={`${styles.image_wrapper} ${styles.section}`}>
            <Image
              src={data.image ? data.image : defaultImage.src}
              alt="about image"
              className={styles.image}
              width={680}
              height={382}
            />

            {!about && (
              <div className={styles.events}>
                <button>
                  <TurnedInNotIcon className={styles.icon} />{" "}
                  {t("buttons.save")}
                </button>
                <button>
                  <ShareIcon className={styles.icon} />
                  {t("buttons.share")}
                </button>
              </div>
            )}
          </div>
          <h2 className={styles.title}>{data.title}</h2>
          {questions ? (
            <>
              {/* <CardActions data={data} /> */}
              <div className={styles.section}>
                <div className={styles.question}>
                  <h3 className={styles.title}>{t("inner_page.question")}:</h3>
                  <h5 className={`${styles.description} ${styles.question}`}>
                    {data.body}
                  </h5>
                </div>

                <div className={styles.answer}>
                  <div
                    className={styles.answer_head_section}
                    data-column={isWriteAns.active}
                  >
                    <h3 className={styles.title}>{t("inner_page.answers")}</h3>
                    <div className={styles.answer_write}>
                      {isWriteAns.active ? (
                        <Write state={isWriteAns} setState={setIsWriteAns} questionId={data.id}/>
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
                          {t("buttons.write_answer")}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.answer_list}>
                  {data.answers_count && data.answers_count > 0 ? (
                    [1, 2, 3].map((item, index) => <Answer />)
                  ) : (
                    <p>{t("inner_page.no_content_txt")}</p>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={styles.section}>
                {data.created_at && (
                  <span className={styles.date}>{data.created_at}</span>
                )}
                <div className={styles.infos_wrapper}>
                  {data.author_name && (
                    <p className={styles.infos}>
                      {t("inner_page.author")}: <span>{data.author_name}</span>
                    </p>
                  )}
                  {data.author_phone && (
                    <p className={styles.infos}>
                      {t("inner_page.tell")}: <span>{data.author_phone}</span>
                    </p>
                  )}
                  {data.country_name && (
                    <p className={styles.infos}>
                      {t("inner_page.country")}:{" "}
                      <span>{data.country_name}</span>
                    </p>
                  )}
                  {data.region_name && (
                    <p className={styles.infos}>
                      {t("inner_page.region")}: <span>{data.region_name}</span>
                    </p>
                  )}
                  {data.high_price && (
                    <p className={styles.infos}>
                      {t("inner_page.price")}:{" "}
                      <span>
                        {data.high_price} USD {t("card.per_kg")}
                      </span>
                    </p>
                  )}
                </div>
                <h5 className={styles.description}>{data.body}</h5>
              </div>

              {similar.length ? (
                <div className={styles.liked}>
                  <h2 className={`${styles.title} ${styles.liked_title}`}>
                    {t("inner_page.similar_articles")}
                  </h2>
                  <Collections data={similar} similar/>
                </div>
              ) : null}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default InternalPage;
