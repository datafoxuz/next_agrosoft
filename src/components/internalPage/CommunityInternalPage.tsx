import React, { useState } from "react";
import SEO from "@/layouts/seo/seo";
import { useTranslation } from "next-i18next";
import { answerType, questionTypes, communityProblemDetail, communityProblemInfo } from "@/data/interfaces";
import Answer from "./Answer/Answer";
import Write from "../write/Write";
import Image from "next/image";
import defaultImage from "@/assets/images/default_image.png";

import styles from "./internalPage.module.scss";

const CommunityInternalPage = ({ problem }: { problem: communityProblemInfo }) => {
  const { t } = useTranslation("common");
  const [isWriteAns, setIsWriteAns] = useState<questionTypes>({
    active: false,
    title: "",
    file: null,
    desc: "",
  });

  return (
    <div className={styles.internal}>
      <SEO metaTitle={problem?.title} metaDescription={problem?.body} author={problem?.author_name}>
        <div className={`${styles.image_wrapper} ${styles.section}`}>
          <Image
            src={problem.image ? problem.image : defaultImage.src}
            alt="question image"
            className={styles.image}
            width={680}
            height={382}
          />
        </div>

        <h2 className={styles.title}>{problem.title}</h2>

        <div className={styles.section}>
          <div className={styles.question}>
            <h3 className={styles.title}>{t("inner_page.question")}:</h3>
            <h5 className={`${styles.description} ${styles.question}`}>{problem.body}</h5>
          </div>

          <div className={styles.answer}>
            <div className={styles.answer_head_section} data-column={isWriteAns.active}>
              <h3 className={styles.title}>{t("inner_page.answers")}</h3>
              <div className={styles.answer_write}>
                {isWriteAns.active ? (
                  <Write state={isWriteAns} setState={setIsWriteAns} questionId={problem.id} />
                ) : (
                  <button
                    type="button"
                    className={`${styles.button} ${styles.write_ans}`}
                    onClick={() =>
                      setIsWriteAns((prev) => ({ ...prev, active: !prev.active }))
                    }
                  >
                    {t("buttons.write_answer")}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className={styles.answer_list}>
            {problem.answers_count && problem.answers_count > 0 ? (
              problem.answers?.map((item: answerType, index: number) => (
                <Answer key={index} data={item} />
              ))
            ) : (
              <p>{t("inner_page.no_content_txt")}</p>
            )}
          </div>
        </div>
      </SEO>
    </div>
  );
};

export default CommunityInternalPage;