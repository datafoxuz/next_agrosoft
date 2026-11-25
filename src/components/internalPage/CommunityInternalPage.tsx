import React, { useState } from "react";
import SEO from "@/layouts/seo/seo";
import { useTranslation } from "next-i18next";
import { answerType, questionTypes, communityProblemDetail, communityProblemInfo } from "@/data/interfaces";
import Answer from "./Answer/Answer";
import Write from "../write/Write";
import Image from "next/image";

import styles from "./internalPage.module.scss";

const isoDate = (value?: string) => {
  const d = value ? new Date(value.replace(" ", "T")) : null;
  return d && !isNaN(d.getTime()) ? d.toISOString() : undefined;
};

/**
 * Google QAPage markup. Google requires at least one answer (acceptedAnswer or
 * suggestedAnswer), so questions without answers get no QAPage markup at all.
 */
const qaJsonLd = (problem: communityProblemInfo) => {
  const answers = (problem?.answers ?? []).filter((a) => a?.text?.trim());
  if (!answers.length) return undefined;

  return {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: problem.title,
      text: problem.body || problem.title,
      answerCount: answers.length,
      datePublished: isoDate(problem.created_at),
      author: { "@type": "Person", name: problem.author_name || "AgroSoft" },
      suggestedAnswer: answers.map((a) => ({
        "@type": "Answer",
        text: a.text,
        datePublished: isoDate(a.created_at),
        author: { "@type": "Person", name: a.author_name || "AgroSoft" },
      })),
    },
  };
};

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
      <SEO
        metaTitle={problem?.title}
        metaDescription={problem?.body}
        author={problem?.author_name}
        image={problem?.image || undefined}
        type="article"
        jsonLd={qaJsonLd(problem)}
      >
        {problem.image ? (
          <div className={`${styles.image_wrapper} ${styles.section}`}>
            <Image
              src={problem.image}
              alt={problem.title}
              className={styles.image}
              width={680}
              height={382}
            />
          </div>
        ) : null}

        <h1 className={styles.title}>{problem.title}</h1>

        <div className={styles.section}>
          <div className={styles.question}>
            <h3 className={styles.title}>{t("inner_page.question")}:</h3>
            <p className={`${styles.description} ${styles.question}`}>{problem.body}</p>
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