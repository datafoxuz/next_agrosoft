import React, { useMemo, useState } from "react";
import Image from "next/image";
import { RWebShare } from "react-web-share";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";
import DOMPurify from "isomorphic-dompurify";

import { request } from "@/lib/request";
import SEO from "@/layouts/seo/seo";
import { Collections } from "@/components";
import { useMyContext } from "@/hooks/useMyContext";

import { blog } from "@/data/interfaces/blogs";
import { article } from "@/data/interfaces/articles";

import defaultImage from "@/assets/images/default_image.png";

import styles from "./internalPage.module.scss";

import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import ShareIcon from "@mui/icons-material/Share";

type ArticleInternalPageProps = {
  data: blog | article;
  similar?: (blog | article)[];
  type: "blogs" | "articles";
};

/**
 * HTML teglarni olib tashlab, oddiy matn qaytaradi.
 * SEO description va share text uchun ishlatiladi.
 */
const stripHtml = (value?: string | null): string => {
  if (!value) {
    return "";
  }

  return value
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
};

const ArticleInternalPage = ({
  data,
  similar = [],
  type,
}: ArticleInternalPageProps) => {
  const { user } = useMyContext();
  const { t } = useTranslation("common");
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Blogda body, article'da description bo‘lishi mumkin.
   */
  const content = useMemo(() => {
    if ("body" in data && typeof data.body === "string") {
      return data.body;
    }

    if ("description" in data && typeof data.description === "string") {
      return data.description;
    }

    return "";
  }, [data]);

  /**
   * HTML ichidagi zararli script va atributlarni tozalaydi.
   * Oddiy matn kelsa ham o‘z holicha qoladi.
   */
  const sanitizedContent = useMemo(() => {
    return DOMPurify.sanitize(content, {
      USE_PROFILES: {
        html: true,
      },
    });
  }, [content]);

  const plainContent = useMemo(() => {
    return stripHtml(content);
  }, [content]);

  const metaTitle = stripHtml(data.seo?.title || data.title);

  const metaDescription = stripHtml(
    data.seo?.description || plainContent
  ).slice(0, 160);

  const imageSource = data.image || defaultImage.src;

  async function handleSave(): Promise<void> {
    if (!user?.success) {
      await router.push("/login");
      return;
    }

    const userToken = localStorage.getItem("userToken");

    if (!userToken) {
      await router.push("/login");
      return;
    }

    try {
      setIsLoading(true);

      const { response } = await request(
        "/saved-modules/add",
        "POST",
        JSON.stringify({
          module_name: type,
          module_id: data.id,
        }),
        {
          locale: router.locale,
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Muvaffaqiyatli saqlandi");
        return;
      }

      if (
        response.status === 409 ||
        response.status === 422 ||
        response.status === 500
      ) {
        toast.warning("Bu maqola avval saqlangan!");
        return;
      }

      toast.error(`Xatolik yuz berdi. Status: ${response.status}`);
    } catch (error) {
      console.error("Maqolani saqlashda xatolik:", error);
      toast.error("Maqolani saqlashda xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.internal}>
      <SEO
        metaTitle={metaTitle}
        metaDescription={metaDescription}
        author={data.seo?.author}
      >
        <div className={`${styles.image_wrapper} ${styles.section}`}>
          <Image
            src={imageSource}
            alt={data.title || "Maqola rasmi"}
            className={styles.image}
            width={680}
            height={382}
            priority
          />

          <div className={styles.events}>
            <button
              type="button"
              className={isLoading ? styles.load_button : ""}
              onClick={handleSave}
              disabled={isLoading}
            >
              <TurnedInNotIcon className={styles.icon} />

              {isLoading
                ? t("buttons.loading", "Saqlanmoqda...")
                : t("buttons.save")}
            </button>

            <RWebShare
              data={{
                text: plainContent.slice(0, 300),
                url: `https://agrosoft.uz${router.asPath}`,
                title: stripHtml(data.title),
              }}
            >
              <button type="button">
                <ShareIcon className={styles.icon} />
                {t("buttons.share")}
              </button>
            </RWebShare>
          </div>
        </div>

        <h1 className={styles.title}>{data.title}</h1>

        <div className={styles.section}>
          {"created_at" in data && data.created_at ? (
            <span className={styles.date}>{data.created_at}</span>
          ) : null}

          <div
            className={styles.description}
            dangerouslySetInnerHTML={{
              __html: sanitizedContent,
            }}
          />
        </div>

        {similar.length > 0 ? (
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