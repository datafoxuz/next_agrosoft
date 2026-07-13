import React, { useState } from "react";
import Image from "next/image";
import { RWebShare } from "react-web-share";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { request } from "@/lib/request";
import { toast } from "react-toastify";
import SEO from "@/layouts/seo/seo";
import { Collections } from "@/components";
import { useMyContext } from "@/hooks/useMyContext";
import { blog } from "@/data/interfaces/blogs";
import { article } from "@/data/interfaces/articles";
import defaultImage from "@/assets/images/default_image.png";

import styles from "./internalPage.module.scss";

import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import ShareIcon from "@mui/icons-material/Share";

const ArticleInternalPage = ({
  data,
  similar = [],
  type,
}: {
  data: blog | article;
  similar?: (blog | article)[];
  type: "blogs" | "articles";
}) => {
  const { user } = useMyContext();
  const { t } = useTranslation("common");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const content = "body" in data && data.body
    ? data.body
    : ("description" in data ? data.description : "");

  async function handleSave() {
    if (!user || !user.success) {
      router.push("/login");
      return;
    }
    setIsLoading(true);
    const userToken = localStorage.getItem("userToken");
    const { response } = await request(
      `/saved-modules/add`,
      "POST",
      JSON.stringify({ module_name: type, module_id: data.id }),
      { locale: router.locale, headers: { Authorization: `Bearer ${userToken}` } }
    );

    setIsLoading(false);
    if (response.status == 200) {
      toast.success("Muvofaqiyatli saqlandi");
    } else if (response.status == 500) {
      toast.warning("Bu mahsulot avval saqlangan!");
    } else {
      toast.error(`Error status: ${response.status}`);
    }
  }

  return (
    <div className={styles.internal}>
      <SEO
        metaTitle={data.seo?.title}
        metaDescription={data.seo?.description}
        author={data.seo?.author}
      >
        <div className={`${styles.image_wrapper} ${styles.section}`}>
          <Image
            src={data.image ? data.image : defaultImage.src}
            alt="article image"
            className={styles.image}
            width={680}
            height={382}
          />

          <div className={styles.events}>
            <button
              type="button"
              className={isLoading ? styles.load_button : ""}
              onClick={handleSave}
            >
              <TurnedInNotIcon className={styles.icon} /> {t("buttons.save")}
            </button>
            <RWebShare
              data={{
                text: content,
                url: `https://agrosoft.uz${router.asPath}`,
                title: data.title,
              }}
            >
              <button type="button">
                <ShareIcon className={styles.icon} />
                {t("buttons.share")}
              </button>
            </RWebShare>
          </div>
        </div>

        <h2 className={styles.title}>{data.title}</h2>

        <div className={styles.section}>
          {"created_at" in data && data.created_at && (
            <span className={styles.date}>{data.created_at}</span>
          )}
          <h5 className={styles.description}>{content}</h5>
        </div>

        {similar.length ? (
          <div className={styles.liked}>
            <h2 className={`${styles.title} ${styles.liked_title}`}>
              {t("inner_page.similar_articles")}
            </h2>
            <Collections data={similar} similar />
          </div>
        ) : null}
      </SEO>
    </div>
  );
};

export default ArticleInternalPage;