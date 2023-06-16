import React from "react";
import { useTranslation } from "next-i18next";
import { questionTypes } from "@/data/interfaces";

import styles from "./write.module.scss";

import AddIcon from "@mui/icons-material/Add";

const Write = ({
  state,
  setState,
  quiz = false,
}: {
  state: questionTypes;
  setState: (v: questionTypes) => void;
  quiz?: boolean;
}) => {
  const { t } = useTranslation("common");
  function handleCancel(state: questionTypes) {
    setState({
      ...state,
      active: !state.active,
    });
  }

  return (
    <div className={styles.write} data-type={quiz}>
      {quiz ? (
        <div className={styles.quiz_title_wrapper}>
          <h3 className={styles.title}>{t("main_topics.write_question")}</h3>
          <input type="text" className={styles.input} placeholder="Sarlavha" />
          <button type="button" className={styles.add_file}>
            <AddIcon />
            {t("buttons.set_main_img")}
          </button>
        </div>
      ) : null}

      <textarea className={styles.textarea} placeholder="Javobingizni yozing" />

      <div className={styles.button_wrapper}>
        <button type="button" className={styles.add_file}>
          <AddIcon />
          {t("buttons.add_img")}
        </button>

        <div className={styles.submit_cancel}>
          <button type="button" className={styles.button}>
            {t("buttons.confirm")}
          </button>
          <button
            type="button"
            className={styles.cancel_button}
            onClick={() => handleCancel(state)}
          >
            {t("buttons.cancel")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Write;
