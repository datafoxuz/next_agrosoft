import React from "react";
import { useTranslation } from "next-i18next";

import styles from "./about.module.scss";

type Point = { title: string; text: string };

const About = () => {
  const { t } = useTranslation("common");
  const raw = t("main.about.points", { returnObjects: true }) as unknown;
  const points: Point[] = Array.isArray(raw) ? (raw as Point[]) : [];

  return (
    <div className={styles.container}>
      <section className={styles.main_about}>
        <h2 className={styles.about_title}>{t("main.about.title")}</h2>
        <p className={styles.about_text}>{t("main.about.desc")}</p>
        <p className={styles.about_text}>{t("main.about.desc2")}</p>
        {points.length ? (
          <ul className={styles.points}>
            {points.map((p) => (
              <li key={p.title} className={styles.point}>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    </div>
  );
};

export default About;
