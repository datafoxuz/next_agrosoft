import React, { useState } from "react";
import { useRouter } from "next/router";
import { SNavbar } from "@/components";
import SEO from "@/layouts/seo/seo";
import { useSession } from "next-auth/react";
import { request } from "@/lib/request";
import { toast } from "react-toastify";
import { baseUrl } from "@/data";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import styles from "@/components/write/write.module.scss";
import AddIcon from "@mui/icons-material/Add";

const create = () => {
  const { data }: { data: any; status: string } = useSession();
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

  const imageUpload = (file: File) => {
    return new Promise<number>(async (resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file, file.name);

      try {
        const response = await fetch(`${baseUrl}/file/upload`, {
          method: "POST",
          headers: {
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxNSIsImp0aSI6IjVkMTlhYWVlZWU1ODM2ZmU4ZDM4MTQ1ZTMxYmRmODIwY2ZiMzQyMTYxNTU1OGIwYThmZmY4YzliOTEwM2E4YzBhNDJmMjA5OGQwYjdhMzFmIiwiaWF0IjoxNjg2NTAyMTM4LjEzNjc2MywibmJmIjoxNjg2NTAyMTM4LjEzNjc2NywiZXhwIjoxNjg5MDk0MTM4LjEzMjUxMywic3ViIjoiMTg2Iiwic2NvcGVzIjpbXX0.YisFUev_Uu73ypQlWdwRWybikqXfTg2d0QMEZnBPHYeQ6z1GLftbQVGC2EQccjjM2kPvTylH9ppNPWiIJwBx99MV4aBFIMF18ltYk_gg1X4yTn27p8aLjH-XunMOcLU7nhkTAIPoMLXUpiG5a4DmpmeIzDujsyr5sgN3gmTCuqC2S4s688wfr2VB5GYLA7KzCbcqUvl0c0DC3Uan6fdsVwq0ezKgMo_FI3xt2iLBKhaS4gFdRTfNrTOawQ_zDkvCSza-fDbmbuGwi7RkFNLL1tZvF2mteAmOjl0MXrIBjvHFA9PBEvXonyVjY2wnUj7V38WUDokCsZJ2D11_ABb5NvUbMYQgjT67x3IGpY6edaL0g6bKaP3Dffku1cRUixrQapm4KZafpsVJVGNBGwJ-vLgTX1sHEsDNJjWXM4f8LXtSrwpOsbhMUe2zqPraGLxI3fBNHq-YmGquZ-gKcHmRaWFWhN8oh459klhbDUEiEkS91Ixq3jtifDptp_i6S3CA4XDIDFNqR2wOJy9Rn9aKMlpKdsg6eW9eXX7DDs4OUAVg1i1Ru8gmSD4RNuvaHaJuKUngBTHxG_Ht-XvQXrUdfCXEXVY_aVsFwsVsyfdzeTvXd9V55rQ9g477vEEAiXmTpMHfpFmc7yngGETyd0jQ8S5dkhDlEdLh3oZevaIS34s",
          },
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          resolve(data.data.id);
        } else {
          console.log(
            "File upload failed:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.log("File upload error:", error);
      }
    });
  };

  const createQuestion = async (mainId: number, scndId?: number) => {
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
        Authorization: `Bearer ${data?.user.data.token}`,
      }
    );

    if (response.status == 200) {
      setTitle("");
      setDesc("");
      setMainImage(null);
      setSecondImage(null);
      setIsLoading(false);
      toast.success("Savol yaratildi!");
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

  return (
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
          />
        </div>

        <textarea
          className={styles.textarea}
          placeholder={`${t("buttons.write_question")}`}
          value={desc}
          data-err={isEmpty.desc}
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
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  const userData = await request(`/users/about-me`, "GET", null, false, {
    Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxNSIsImp0aSI6IjcxYTQyMDVlM2YyMzRkMDA5MzI0ZTc1YjZiYjQxOTFlMzdkZjczYzIxYmRlZmI0ZTZlM2UyZGQwMmU2NGZhOWZkM2QwZjIzMzc0ODY5Y2U0IiwiaWF0IjoxNjg3MTc0ODY5LjE0NjU1MywibmJmIjoxNjg3MTc0ODY5LjE0NjU1OSwiZXhwIjoxNjg5NzY2ODY5LjEzODEzOCwic3ViIjoiMTg2Iiwic2NvcGVzIjpbXX0.eKcqfZW_F8eU8hsyQHC2uUuc3ulE1CHZ4xm_WAaKFt14kuAkH0lZwo98drOu5q_e1N9hEzdUE7ftmtABbX5xfzXOmj6-kXK7Ljr7bxIIr8aZSeGWdk0ahypNptITio0PSlU4HqngtoGmzF5YBULQFazo_oy412oZ_TRBm05p2pFtCN4bK6OttE4xP8qtH7UkdtVW9HDfI0TCpWJWRMUUYa4MOg7qVuzzHzZfcUFxzhbuCmD1PW3Zu35DuWvMSFLZvXA4OdQz9KlqoCaJPha-TO5K1SHnECuqTNUlWW_TR50h79WY4eyw1gNLII0bzwZgCGLrtPUZe6KvTyz58ARlB_xAW6JhSlD3WegOSjIamQUJmeU0WliuCM8qFVVPP8Cz880DlRL2T5rySaEUPyff_SOxtrlB6AGWXFkgZXcD7CU3PSZZ3B8bVt7enZA-j_y-zwrEqEqwRMu8GT19fsGSe4GBVfuIo3y9L3MaOyTBX3SMUrMptJAAN0svMTYREhrXs-8s3cfDZluOX_F1JgiB6SuCRoFiQsp5UtbBWRdnvGVkRfNBP1gd3lyC5Yx37wfA4takBE19AdGyPxMpJ2xgAv0xr7LmcoBtH392BbkYp0H2ZRBajrh37oekmH7VEVszwhjN4_s7SsYsVijJ9G59j9dXEaBLCJS71Pomq73kAPI`,
  });

  if (userData.response.status === 200) {
    return {
      props: {
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
