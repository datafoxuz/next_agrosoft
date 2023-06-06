import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { SNavbar } from "@/components";
import SEO from "@/layouts/seo/seo";
import styles from "@/components/write/write.module.scss";

import AddIcon from "@mui/icons-material/Add";

const create = () => {
  const router = useRouter();

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

  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [mainImage, setMainImage] = useState(null);

  function handleCreate() {}

  function handleCancel() {
    router.back();
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
          <button className={styles.add_file} type="button">
            <AddIcon />
            Asosiy rasmni qo’yish
          </button>
        </div>

        <textarea
          className={styles.textarea}
          placeholder="Savolingizni yozing"
          value={desc}
        />

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
