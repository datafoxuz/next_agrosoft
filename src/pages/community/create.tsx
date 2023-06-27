import React, { useState } from "react";
import { useRouter } from "next/router";
import { SNavbar } from "@/components";
import SEO from "@/layouts/seo/seo";
import { request } from "@/lib/request";
import { toast } from "react-toastify";
import { imageUpload } from "@/utils/helperFunctions";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { parseCookies } from "nookies";
import ErrorPage from "../_error";

import styles from "@/components/write/write.module.scss";
import AddIcon from "@mui/icons-material/Add";

const create = ({ status }: { status: number }) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  //states
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [isEmpty, setIsEmpty] = useState<{
    title?: boolean;
    desc?: boolean;
    image?: boolean;
  }>({
    title: false,
    desc: false,
    image: false,
  });
  const [mainImage, setMainImage] = useState<File | null | undefined>(null);
  const [secondImage, setSecondImage] = useState<File | null | undefined>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const siteWay = [
    {
      title: t("main_topics.main_page"),
      url: "/",
    },
    {
      title: t("main_topics.community"),
      url: "/community",
    },
    {
      title: t("buttons.write_question"),
      url: "/community/create",
    },
  ];

  //main functions =========================================================

  const createQuestion = async (mainId: number, scndId?: number) => {
    const userToken = localStorage.getItem("userToken");
    let body: {
      title: string;
      body: string;
      file_id: number;
      images?: number[] | null;
    } = {
      title: title,
      body: desc,
      file_id: mainId,
    };

    if (scndId) {
      body = { ...body, images: [scndId] };
    }

    const { response } = await request(
      `/community/create`,
      "POST",
      JSON.stringify(body),
      false,
      {
        Authorization: `Bearer ${userToken}`,
      }
    );

    if (response.status == 200) {
      setTitle("");
      setDesc("");
      setMainImage(null);
      setSecondImage(null);
      setIsLoading(false);
      toast.success(t("main_topics.question_created"));
    } else {
      setIsLoading(false);
      toast.error(`Error status: ${response.status}`);
    }
  };

  const createQuiestionHandler = async () => {
    if (mainImage && title.length && desc.length) {
      setIsLoading(true);
      setIsEmpty({
        title: title.length < 1,
        desc: desc.length < 1,
        image: !mainImage,
      });
      if (secondImage) {
        await imageUpload(mainImage).then((mainImgId) =>
          imageUpload(secondImage).then((scndImgId) =>
            createQuestion(mainImgId, scndImgId)
          )
        );
      } else {
        await imageUpload(mainImage).then((mainImgId) =>
          createQuestion(mainImgId)
        );
      }
    } else {
      setIsEmpty({
        title: title.length < 1,
        desc: desc.length < 1,
        image: !mainImage,
      });
    }
  };

  //helper functions ====================================================
  const handleSetImage = (
    event: React.ChangeEvent<HTMLInputElement>,
    status: string
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (status === "main") {
        setMainImage(file);
        setIsEmpty({
          title: title.length < 1,
          desc: desc.length < 1,
          image: !mainImage,
        });
      } else {
        setSecondImage(file);
      }
    }
  };

  function handleCancel() {
    router.back();
    setMainImage(null);
    setSecondImage(null);
  }

  //JSX=============================================

  return status === 200 ? (
    <SEO metaTitle={`${t("buttons.write_question")} - AgroSoft`}>
      <SNavbar
        siteWay={siteWay}
        title={`${t("community.create.title")}`}
        create
      />

      <div className={styles.write} data-type={true} data-create={true}>
        <div className={styles.quiz_title_wrapper}>
          <h3 className={styles.title}>{t("buttons.write_question")}</h3>

          <input
            type="text"
            className={styles.input}
            placeholder={`${t("community.create.write_question_inp")}`}
            data-err={isEmpty.title}
            value={title}
            required
            onChange={(e) => {
              setTitle(e.target.value);
              setIsEmpty((prevState) => ({
                ...prevState,
                title: e.target.value.length < 1,
              }));
            }}
          />

          {mainImage ? (
            <div className={styles.label}>
              <div
                className={styles.add_file}
                onClick={() => setMainImage(null)}
              >
                <AddIcon className={styles.icon} />
                {mainImage.name.length > 20
                  ? `${mainImage.name.slice(0, 20)}...`
                  : mainImage.name}
              </div>
            </div>
          ) : (
            <label
              htmlFor={!mainImage ? "mainImage" : ""}
              className={styles.label}
              data-err={isEmpty.image}
            >
              <div className={styles.add_file}>
                <AddIcon />
                {t("buttons.set_main_img")}
              </div>
            </label>
          )}

          <input
            onChange={(event) => handleSetImage(event, "main")}
            id="mainImage"
            accept="image/png, image/gif, image/jpeg"
            type="file"
            className={styles.file_input}
            defaultValue=""
            required
          />
        </div>

        <textarea
          className={styles.textarea}
          placeholder={`${t("buttons.write_question")}`}
          value={desc}
          data-err={isEmpty.desc}
          required
          onChange={(e) => {
            setDesc(e.target.value);
            setIsEmpty((prevState) => ({
              ...prevState,
              desc: e.target.value.length < 1,
            }));
          }}
        />

        <div className={styles.button_wrapper}>
          {secondImage ? (
            <div className={styles.label}>
              <div
                className={styles.add_file}
                onClick={() => setSecondImage(null)}
              >
                <AddIcon className={styles.icon} />
                {secondImage.name.length > 20
                  ? `${secondImage.name.slice(0, 20)}...`
                  : secondImage.name}
              </div>
            </div>
          ) : (
            <label
              htmlFor={!secondImage ? "secondImage" : ""}
              className={styles.label}
            >
              <div className={styles.add_file}>
                <AddIcon />
                {t("buttons.add_img")}
              </div>
            </label>
          )}

          <input
            onChange={(event) => handleSetImage(event, "second")}
            id="secondImage"
            accept="image/png, image/gif, image/jpeg"
            type="file"
            className={styles.file_input}
            defaultValue=""
            required
          />

          {isLoading ? (
            <div className={styles.submit_cancel}>
              <button
                type="button"
                className={`${styles.button} ${styles.load_btn}`}
              >
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
              <button
                type="button"
                className={styles.button}
                onClick={() => createQuiestionHandler()}
              >
                {t("buttons.confirm")}
              </button>
              <button
                type="button"
                className={styles.cancel_button}
                onClick={() => handleCancel()}
              >
                {t("buttons.cancel")}
              </button>
            </div>
          )}
        </div>
      </div>
    </SEO>
  ) : (
    <ErrorPage status={status} />
  );
};

export async function getServerSideProps({
  locale,
  req,
}: {
  locale: string;
  req: any;
}) {
  const cookies = parseCookies({ req });

  const userData = await request(`/users/about-me`, "GET", null, false, {
    Authorization: `Bearer ${cookies.userToken}`,
  });

  if (userData.response.status !== 401) {
    return {
      props: {
        status: userData.response.status,
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
}

export default create;
