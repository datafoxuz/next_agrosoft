import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import { questionTypes } from "@/data/interfaces";
import { request } from "@/lib/request";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import styles from "./write.module.scss";

import AddIcon from "@mui/icons-material/Add";

const Write = ({
  state,
  setState,
  quiz = false,
  questionId
}: {
  state: questionTypes;
  setState: (v: questionTypes) => void;
  quiz?: boolean;
  questionId: number
}) => {
  const { t } = useTranslation("common");
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isEmpty, setIsEmpty] = useState<{desc: boolean}>({
    desc: false
  })

  const createQuiestionHandler = async () => {
    if (state.desc?.length) {
      setIsLoading(true);
      handleWriteAns();
    } else {
      setIsEmpty({
        desc: !state.desc?.length,
      });
    }
  };


  async function handleWriteAns() {
    const userToken = localStorage.getItem("userToken");
    const formData = new FormData();
    formData.append("text", state.desc || "");
    formData.append("problem_id", String(questionId));
    if (state.file) {
      formData.append("file", state.file);
    }

    try {
      const response = await fetch(`api.agrosoft.uz/api/v1/site/community/write-answer`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        setState({
          ...state,
          desc: "",
          file: null,
          active: false,
        });
        setIsLoading(false);
        toast.success("Javob yaratildi");
      } else {
        setIsLoading(false);
        toast.error(`Error status: ${response.status}`);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to create answer");
      console.error("Error:", error);
    }
  }

  const handleSetImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setState({
        ...state,
        file: file,
      });
    }
  };


  function handleCancel(state: questionTypes) {
    setState({
      ...state,
      active: !state.active,
    });
  }

  return (
    <div className={styles.write} data-type={quiz}>

      <textarea className={styles.textarea} placeholder="Javobingizni yozing" data-err={isEmpty.desc} required value={state.desc} onChange={(e) => {
        setState({
          ...state,
          desc: e.target.value
        })
        setIsEmpty({desc: e.target.value.length < 1})
      }} />

      <div className={styles.button_wrapper}>
        {state.file ? (
          <div className={styles.label}>
            <div
              className={styles.add_file}
              onClick={() => setState({
                ...state,
                file: null
              })}
            >
              <AddIcon className={styles.icon} />
              {state.file?.name.length > 20
                ? `${state.file?.name.slice(0, 20)}...`
                : state.file?.name}
            </div>
          </div>
        ) : (
          <label
            htmlFor={!state.file ? "mainImage" : ""}
            className={styles.label}
          >
            <div className={styles.add_file}>
              <AddIcon />
              {t("buttons.set_main_img")}
            </div>
          </label>
        )}
        <input
          onChange={(event) => handleSetImage(event)}
          id="mainImage"
          accept="image/png, image/gif, image/jpeg"
          type="file"
          className={styles.file_input}
          defaultValue=""
        />

        {
          isLoading ? (
            <div className={styles.submit_cancel}>
              <button type="button" className={`${styles.button} ${styles.load_btn}`}>
                {t("buttons.confirm")}
              </button>
              <button
                type="button"

                className={`${styles.cancel_button} ${styles.load_btn}`}
              >
                {t("buttons.cancel")}
              </button>
            </div>
          ) : (
            <div className={styles.submit_cancel}>
              <button type="button" className={styles.button} onClick={() => createQuiestionHandler()}>
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
          )
        }
      </div>
    </div>
  );
};

export default Write;
