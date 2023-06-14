import React, { useState } from "react";
import { Collections, NotFound, Write } from "@/components";
import Image from "next/image";

import styles from "./internalPage.module.scss";

import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";

import ShareIcon from "@mui/icons-material/Share";
import Answer from "./Answer/Answer";
import { card, questionTypes } from "@/data/interfaces";
import image from "@/assets/images/community.png";

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

  const arr = [];

  return (
    <div className={styles.internal}>
      {about && (
        <div className={`${styles.internal_top} ${styles.section}`}>
          <h3 className={styles.hidden_title}>Biz haqimizda</h3>

          <button type="button" className={styles.top_button}>
            Biz bilan bog’laning
          </button>
        </div>
      )}

      {data && (
        <>
          <div className={`${styles.image_wrapper} ${styles.section}`}>
            <Image
              src={data.image ? data.image : image.src}
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
          <h2 className={styles.title}>{data.title}</h2>
          {questions ? (
            <>
              {/* <CardActions data={data} /> */}
              <div className={styles.section}>
                <div className={styles.question}>
                  <h3 className={styles.title}>Savol:</h3>
                  <h5 className={styles.description}>{data.body}</h5>
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
                  {data.answers_count && data.answers_count > 0 ? (
                    [1, 2, 3].map((item, index) => <Answer />)
                  ) : (
                    <NotFound />
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
                      Muallif: <span>{data.author_name}</span>
                    </p>
                  )}
                  {data.author_phone && (
                    <p className={styles.infos}>
                      Tell: <span>{data.author_phone}</span>
                    </p>
                  )}
                  {data.country_name && (
                    <p className={styles.infos}>
                      Davlat: <span>{data.country_name}</span>
                    </p>
                  )}
                  {data.region_name && (
                    <p className={styles.infos}>
                      Viloyat: <span>{data.region_name}</span>
                    </p>
                  )}
                  {data.high_price && (
                    <p className={styles.infos}>
                      Narxi: <span>{data.high_price} USD per/kg</span>
                    </p>
                  )}
                </div>
                <h5 className={styles.description}>{data.body}</h5>
              </div>

              {arr.length ? (
                <div className={styles.liked}>
                  <h2 className={`${styles.title} ${styles.liked_title}`}>
                    O’xshash maqolalar
                  </h2>
                  {/* <Collections data={arr} /> */}
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
