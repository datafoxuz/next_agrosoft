import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import { questionTypes } from "@/data/interfaces";
import { request } from "@/lib/request";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import styles from "./write.module.scss";

import AddIcon from "@mui/icons-material/Add";
import { imageUpload } from "@/utils/helperFunctions";

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
      if(state.file){
        await imageUpload(state.file).then((mainImgId) =>
          handleWriteAns(mainImgId)
        );
      }
      handleWriteAns()
    }else{
      setIsEmpty({
        desc: !state.desc?.length,
      });
    }
  };


  async function handleWriteAns(imgId?: number) {
    const userToken = localStorage.getItem("userToken");

    let body: {
      text: string | undefined;
      file_id?: number;
      problem_id: number
    } = {
      text: state.desc,
      problem_id: questionId,
    };

    if(imgId){
      body = {...body, file_id: imgId}
    }

    const { response } = await request(
      `/community/write-answer`,
      "POST",
      JSON.stringify(body),
      false,
      router.locale,
      {
        Authorization: `Bearer ${userToken}`,
      }
    );

    if (response.status == 200) {
      setState({
        ...state,
        desc: "",
        file: null,
        active: false
      })
      toast.success(t("main_topics.answer_created"));

    } else {
      setIsLoading(false);
      toast.error(`Error status: ${response.status}`);
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
