import React from "react";

import styles from "./about.module.scss";

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main_about}>
        <h2 className={styles.about_title}>Loyiha haqida</h2>
        <p className={styles.about_text}>
          Bu veb-portali qishloq xo‘jaligi sohasidagi muhim yangiliklar va
          foydali maqolalar yoritib borish uchun tashkil etilgan. Saytga tashrif
          buyuruvchilarni sifatli va foydali maʼlumotlar bilan taʼminlash –
          bizning oldimizga qo‘ygan asosiy maqsadimiz.
        </p>
      </div>
    </div>
  );
};

export default About;
