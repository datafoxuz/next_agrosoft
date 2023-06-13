import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { SNavbar } from "@/components";
import SEO from "@/layouts/seo/seo";
import { useSession } from "next-auth/react";
import { request } from "@/lib/request";

import styles from "@/components/write/write.module.scss";
import AddIcon from "@mui/icons-material/Add";
import { baseUrl } from "@/data";

const create = () => {
  const router = useRouter();
  const { data, status }: { data: any; status: string } = useSession();

  //states
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

  const [mainImage, setMainImage] = useState<File | null | undefined>(null);
  const [mainImageId, setMainImageId] = useState<number | null>(null);

  const [secondImage, setSecondImage] = useState<File | null | undefined>(null);
  const [secondImageId, setSecondImageId] = useState<number | null>(null);

  const [currFileStatus, setCurrFileStatus] = useState<string>("");

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

  // useEffect(() => {
  //   const sendRequest = async () => {
  //     if (mainImage || secondImage) {
  //       try {
  //         let formData = new FormData();
  //         if (mainImage && currFileStatus === "main") {
  //           formData.append("file", mainImage, mainImage.name);
  //         } else if (secondImage && currFileStatus === "second") {
  //           formData.append("file", secondImage, secondImage.name);
  //         }

  //         // if (formData.get("file")) {
  //         //   await request(`/file/upload`, "POST", formData, false, {
  //         //     Authorization: `Bearer ${data?.user?.data.token}`,
  //         //   });
  //         //   console.log("File upload successful");
  //         // } else {
  //         //   console.log("No file found to upload");
  //         // }

  //         fetch(`${baseUrl}/file/upload`, {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "image/jpeg",
  //             Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxNSIsImp0aSI6IjVkMTlhYWVlZWU1ODM2ZmU4ZDM4MTQ1ZTMxYmRmODIwY2ZiMzQyMTYxNTU1OGIwYThmZmY4YzliOTEwM2E4YzBhNDJmMjA5OGQwYjdhMzFmIiwiaWF0IjoxNjg2NTAyMTM4LjEzNjc2MywibmJmIjoxNjg2NTAyMTM4LjEzNjc2NywiZXhwIjoxNjg5MDk0MTM4LjEzMjUxMywic3ViIjoiMTg2Iiwic2NvcGVzIjpbXX0.YisFUev_Uu73ypQlWdwRWybikqXfTg2d0QMEZnBPHYeQ6z1GLftbQVGC2EQccjjM2kPvTylH9ppNPWiIJwBx99MV4aBFIMF18ltYk_gg1X4yTn27p8aLjH-XunMOcLU7nhkTAIPoMLXUpiG5a4DmpmeIzDujsyr5sgN3gmTCuqC2S4s688wfr2VB5GYLA7KzCbcqUvl0c0DC3Uan6fdsVwq0ezKgMo_FI3xt2iLBKhaS4gFdRTfNrTOawQ_zDkvCSza-fDbmbuGwi7RkFNLL1tZvF2mteAmOjl0MXrIBjvHFA9PBEvXonyVjY2wnUj7V38WUDokCsZJ2D11_ABb5NvUbMYQgjT67x3IGpY6edaL0g6bKaP3Dffku1cRUixrQapm4KZafpsVJVGNBGwJ-vLgTX1sHEsDNJjWXM4f8LXtSrwpOsbhMUe2zqPraGLxI3fBNHq-YmGquZ-gKcHmRaWFWhN8oh459klhbDUEiEkS91Ixq3jtifDptp_i6S3CA4XDIDFNqR2wOJy9Rn9aKMlpKdsg6eW9eXX7DDs4OUAVg1i1Ru8gmSD4RNuvaHaJuKUngBTHxG_Ht-XvQXrUdfCXEXVY_aVsFwsVsyfdzeTvXd9V55rQ9g477vEEAiXmTpMHfpFmc7yngGETyd0jQ8S5dkhDlEdLh3oZevaIS34s`,
  //           },
  //           body: formData,
  //         })
  //           .then((res) => res.json())
  //           .then((data) => {
  //             console.log(data);
  //           });
  //       } catch (error) {
  //         console.error("Error occurred while uploading file:", error);
  //       }
  //     }
  //   };

  //   sendRequest();
  // }, [mainImage, secondImage, currFileStatus]);

  // function handleCreate() {
  //   if (mainImage) {
  //     const formData = new FormData();
  //     formData.append("file", mainImage, mainImage.name);

  //     // if (secondImage) {
  //     //   formData.append("file", secondImage, secondImage.name);
  //     // }
  //     console.log(formData);

  //     fetch(`${baseUrl}/file/upload`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxNSIsImp0aSI6IjVkMTlhYWVlZWU1ODM2ZmU4ZDM4MTQ1ZTMxYmRmODIwY2ZiMzQyMTYxNTU1OGIwYThmZmY4YzliOTEwM2E4YzBhNDJmMjA5OGQwYjdhMzFmIiwiaWF0IjoxNjg2NTAyMTM4LjEzNjc2MywibmJmIjoxNjg2NTAyMTM4LjEzNjc2NywiZXhwIjoxNjg5MDk0MTM4LjEzMjUxMywic3ViIjoiMTg2Iiwic2NvcGVzIjpbXX0.YisFUev_Uu73ypQlWdwRWybikqXfTg2d0QMEZnBPHYeQ6z1GLftbQVGC2EQccjjM2kPvTylH9ppNPWiIJwBx99MV4aBFIMF18ltYk_gg1X4yTn27p8aLjH-XunMOcLU7nhkTAIPoMLXUpiG5a4DmpmeIzDujsyr5sgN3gmTCuqC2S4s688wfr2VB5GYLA7KzCbcqUvl0c0DC3Uan6fdsVwq0ezKgMo_FI3xt2iLBKhaS4gFdRTfNrTOawQ_zDkvCSza-fDbmbuGwi7RkFNLL1tZvF2mteAmOjl0MXrIBjvHFA9PBEvXonyVjY2wnUj7V38WUDokCsZJ2D11_ABb5NvUbMYQgjT67x3IGpY6edaL0g6bKaP3Dffku1cRUixrQapm4KZafpsVJVGNBGwJ-vLgTX1sHEsDNJjWXM4f8LXtSrwpOsbhMUe2zqPraGLxI3fBNHq-YmGquZ-gKcHmRaWFWhN8oh459klhbDUEiEkS91Ixq3jtifDptp_i6S3CA4XDIDFNqR2wOJy9Rn9aKMlpKdsg6eW9eXX7DDs4OUAVg1i1Ru8gmSD4RNuvaHaJuKUngBTHxG_Ht-XvQXrUdfCXEXVY_aVsFwsVsyfdzeTvXd9V55rQ9g477vEEAiXmTpMHfpFmc7yngGETyd0jQ8S5dkhDlEdLh3oZevaIS34s`,
  //       },
  //       body: formData,
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(formData);
  //       });
  //   }
  // }

  const imageUpload = async () => {
    return new Promise<number>((resolve, reject) => {
      if (mainImage) {
        let formData = new FormData();
        formData.append("file", mainImage, mainImage.name);

        fetch(`${baseUrl}/file/upload`, {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxNSIsImp0aSI6IjVkMTlhYWVlZWU1ODM2ZmU4ZDM4MTQ1ZTMxYmRmODIwY2ZiMzQyMTYxNTU1OGIwYThmZmY4YzliOTEwM2E4YzBhNDJmMjA5OGQwYjdhMzFmIiwiaWF0IjoxNjg2NTAyMTM4LjEzNjc2MywibmJmIjoxNjg2NTAyMTM4LjEzNjc2NywiZXhwIjoxNjg5MDk0MTM4LjEzMjUxMywic3ViIjoiMTg2Iiwic2NvcGVzIjpbXX0.YisFUev_Uu73ypQlWdwRWybikqXfTg2d0QMEZnBPHYeQ6z1GLftbQVGC2EQccjjM2kPvTylH9ppNPWiIJwBx99MV4aBFIMF18ltYk_gg1X4yTn27p8aLjH-XunMOcLU7nhkTAIPoMLXUpiG5a4DmpmeIzDujsyr5sgN3gmTCuqC2S4s688wfr2VB5GYLA7KzCbcqUvl0c0DC3Uan6fdsVwq0ezKgMo_FI3xt2iLBKhaS4gFdRTfNrTOawQ_zDkvCSza-fDbmbuGwi7RkFNLL1tZvF2mteAmOjl0MXrIBjvHFA9PBEvXonyVjY2wnUj7V38WUDokCsZJ2D11_ABb5NvUbMYQgjT67x3IGpY6edaL0g6bKaP3Dffku1cRUixrQapm4KZafpsVJVGNBGwJ-vLgTX1sHEsDNJjWXM4f8LXtSrwpOsbhMUe2zqPraGLxI3fBNHq-YmGquZ-gKcHmRaWFWhN8oh459klhbDUEiEkS91Ixq3jtifDptp_i6S3CA4XDIDFNqR2wOJy9Rn9aKMlpKdsg6eW9eXX7DDs4OUAVg1i1Ru8gmSD4RNuvaHaJuKUngBTHxG_Ht-XvQXrUdfCXEXVY_aVsFwsVsyfdzeTvXd9V55rQ9g477vEEAiXmTpMHfpFmc7yngGETyd0jQ8S5dkhDlEdLh3oZevaIS34s`,
          },
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
      }
    });
  };

  //helper functions
  const handleSetImage = (
    event: React.ChangeEvent<HTMLInputElement>,
    status: string
  ) => {
    if (event.currentTarget.files !== null) {
      setCurrFileStatus(status);
      if (status == "main") {
        setMainImage(event.currentTarget.files[0]);
      } else {
        setSecondImage(event.currentTarget.files[0]);
      }
    }
  };

  function handleCancel() {
    router.back();
    setMainImage(null);
    setSecondImage(null);
  }

  return (
    <SEO metaTitle="Savol yozish">
      <SNavbar siteWay={siteWay} title="Savolingizni yozing" community />
      <div className={styles.write} data-type={true}>
        <div className={styles.quiz_title_wrapper}>
          <h3 className={styles.title}>Savol yozish</h3>
          <input
            type="text"
            className={styles.input}
            placeholder="Sarlavha"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
          onChange={(e) => setDesc(e.target.value)}
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

          <div className={styles.submit_cancel}>
            <button
              type="button"
              className={styles.button}
              onClick={() => imageUpload()}
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
        </div>
      </div>
    </SEO>
  );
};

export default create;
