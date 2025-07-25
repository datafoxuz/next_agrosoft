import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import {communityProblem, CommunityApiResponse } from "@/data/interfaces";
import FindError from "@/components/findError/FindError";
import { useTranslation } from "next-i18next";

import styles from "./community.module.scss";

import cotton from "@/assets/images/cotton.png";
import comment from "@/assets/icons/comment.svg";
import leaf_small from "@/assets/images/leaf_small.png";

const Community = ({ data }: { data: CommunityApiResponse }) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  function handleNavigate(path: string) {
    router.push(path);
  }

  if (!data.success) return null;

  return (
    <div className={styles.container}>
      <div className={styles.main_community}>
        <h3 className={styles.community_title}>{t("main.community.title")}</h3>
        <p className={styles.community_text}>
          {t("main.community.small_text")}
        </p>
        <Image
          src={cotton.src}
          alt="cotton image"
          className={styles.top_cotton_img}
          width={341}
          height={242}
        />
        <div className={styles.community_questions}>
          {data.data.problems.map((item: communityProblem, index: number) => (
            <Link
              href={`/community/${item.slug}`}
              className={styles.question}
              key={index}
            >
              <p className={styles.text}>{item.title}</p>
              <div className={styles.comment_section}>
                <Image
                  src={comment.src}
                  alt="comment icon"
                  className={styles.icon}
                  width={22}
                  height={22}
                />
                <span>{item.answers_count}</span>
              </div>
            </Link>
          ))}
        </div>
        <button
          type="button"
          className={styles.community_button}
          onClick={() => handleNavigate("/community")}
        >
          {t("buttons.read_all")}
        </button>
        <Image
          src={leaf_small.src}
          alt="cotton image"
          className={styles.leaf_small_img}
          width={100}
          height={100}
        />
      </div>
    </div>
  );
};

export default Community;
