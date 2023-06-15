import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { SNavbar } from "@/components";
import SEO from "@/layouts/seo/seo";
import { useSession } from "next-auth/react";
import { request } from "@/lib/request";
import { toast } from "react-toastify";
import { baseUrl } from "@/data";

import styles from "@/components/write/write.module.scss";
import AddIcon from "@mui/icons-material/Add";

const create = () => {
  const router = useRouter();
  const { data, status }: { data: any; status: string } = useSession();

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
      title: "Bosh sahifa",
      url: "/",
    },
    {
      title: "Agro jamiyat",
      url: "/community",
    },
    {
      title: "Savol yozish",
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
    <SEO metaTitle="Savol yozish">
      <SNavbar siteWay={siteWay} title="Savolingizni yozing" create />

      <div className={styles.write} data-type={true} data-create={true}>
        <div className={styles.quiz_title_wrapper}>
          <h3 className={styles.title}>Savol yozish</h3>

          <input
            type="text"
            className={styles.input}
            placeholder="Sarlavha"
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
                Asosiy rasmni qo’yish
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
          placeholder="Savolingizni yozing"
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
                Rasm qo'shish
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
                Tasdiqlash
              </button>
              <button
                type="button"
                className={`${styles.cancel_button} ${styles.load_btn}`}
              >
                Bekor qilish
              </button>
            </div>
          ) : (
            <div className={styles.submit_cancel}>
              <button
                type="button"
                className={styles.button}
                onClick={() => createQuiestionHandler()}
              >
                Tasdiqlash
              </button>
              <button
                type="button"
                className={styles.cancel_button}
                onClick={() => handleCancel()}
              >
                Bekor qilish
              </button>
            </div>
          )}
        </div>
      </div>
    </SEO>
  );
};

export default create;
