import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { card, data } from "@/data/interfaces";

import styles from "./community.module.scss";

import cotton from "@/assets/images/cotton.png";
import comment from "@/assets/icons/comment.svg";
import leaf_small from "@/assets/images/leaf_small.png";

const Community = ({ data }: { data: data }) => {
  const router = useRouter();

  function handleNavigate(path: string) {
    router.push(path);
  }

  return (
    <div className={styles.container}>
      <div className={styles.main_community}>
        <h3 className={styles.community_title}>Agro jamiyat</h3>
        <p className={styles.community_text}>
          Qizg’in muhokamalar, savol-javoblar
        </p>
        <Image
          src={cotton.src}
          alt="cotton image"
          className={styles.top_cotton_img}
          width={341}
          height={242}
        />
        <div className={styles.community_questions}>
          {data.data.map((item: card, index: number) => (
            <Link
              href={`/community/${item.title}`}
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
          Barchasini o’qish
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
