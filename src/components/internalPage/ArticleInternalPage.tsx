import React, { useMemo, useState } from "react";
import Image from "next/image";
import { RWebShare } from "react-web-share";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";

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

const stripHtml = (value?: string | null): string => {
  if (!value) return "";

  return value
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
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

  const [isLoading, setIsLoading] = useState(false);

  const content = useMemo(() => {
    if ("body" in data && typeof data.body === "string") {
      // The page already has an <h1> (title); demote headings inside the body.
      return data.body.replace(/<(\/?)h1(\s|>)/gi, "<$1h2$2");
    }

    if ("description" in data && typeof data.description === "string") {
      return data.description;
    }

    return "";
  }, [data]);

  const plainContent = useMemo(() => {
    return stripHtml(content);
  }, [content]);

  const metaTitle = stripHtml(data.seo?.title || data.title);

  // Body often starts with the title itself; don't repeat it in the description.
  const bodyText = plainContent.startsWith(stripHtml(data.title))
    ? plainContent.slice(stripHtml(data.title).length).trim()
    : plainContent;
  const metaDescription = stripHtml(data.seo?.description || bodyText).slice(0, 160);

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
      } else if (
        response.status === 409 ||
        response.status === 422 ||
        response.status === 500
      ) {
        toast.warning("Bu maqola avval saqlangan!");
      } else {
        toast.error(`Xatolik. Status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
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
        image={data.image || undefined}
        type="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": type === "blogs" ? "BlogPosting" : "NewsArticle",
          headline: metaTitle.slice(0, 110),
          description: metaDescription,
          image: data.image ? [data.image] : undefined,
          inLanguage: router.locale || "uz",
          mainEntityOfPage: `https://agrosoft.uz/${router.locale || "uz"}${router.asPath.split("?")[0]}`,
          publisher: { "@type": "Organization", name: "AgroSoft", url: "https://agrosoft.uz" },
        }}
      >
        <div className={`${styles.image_wrapper} ${styles.section}`}>
          <Image
            src={data.image || defaultImage.src}
            alt={stripHtml(data.title) || "Maqola rasmi"}
            className={styles.image}
            width={680}
            height={382}
          />

          <div className={styles.events}>
            <button
              type="button"
              className={isLoading ? styles.load_button : ""}
              onClick={handleSave}
              disabled={isLoading}
            >
              <TurnedInNotIcon className={styles.icon} />
              {t("buttons.save")}
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

        <h1 className={styles.title}>{stripHtml(data.title)}</h1>

        <div className={styles.section}>
          {"created_at" in data && data.created_at ? (
            <span className={styles.date}>{data.created_at}</span>
          ) : null}

          <div
            className={styles.description}
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        </div>

        {similar.length > 0 && (
          <div className={styles.liked}>
            <h2 className={`${styles.title} ${styles.liked_title}`}>
              {t("inner_page.similar_articles")}
            </h2>

            <Collections data={similar} similar />
          </div>
        )}
      </SEO>
    </div>
  );
};

export default ArticleInternalPage;