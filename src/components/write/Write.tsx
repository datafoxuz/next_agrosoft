import React from "react";

import styles from "./write.module.scss";

import AddIcon from "@mui/icons-material/Add";
import { questionTypes } from "@/data/interfaces";

const Write = ({
  state,
  setState,
  quiz = false,
}: {
  state: questionTypes;
  setState: (v: questionTypes) => void;
  quiz?: boolean;
}) => {
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
          <h3 className={styles.title}>Savol yozish</h3>
          <input type="text" className={styles.input} placeholder="Sarlavha" />
          <button type="button" className={styles.add_file}>
            <AddIcon />
            Asosiy rasmni qo’yish
          </button>
        </div>
      ) : null}

      <textarea className={styles.textarea} placeholder="Javobingizni yozing" />

      <div className={styles.button_wrapper}>
        <button type="button" className={styles.add_file}>
          <AddIcon />
          Rasm qo’shish
        </button>

        <div className={styles.submit_cancel}>
          <button type="button" className={styles.button}>
            Tasdiqlash
          </button>
          <button
            type="button"
            className={styles.cancel_button}
            onClick={() => handleCancel(state)}
          >
            Bekor qilish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Write;
