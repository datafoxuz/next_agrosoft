import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import styles from "./diseases.module.scss";

import diseases from "@/assets/images/diseases.png";

const Diseases = () => {
  const diseasesData = [
    {
      title: "Shot Hole Disease",
      image: diseases,
    },
    {
      title: "Shot Hole Disease",
      image: diseases,
    },
    {
      title: "Shot Hole Disease",
      image: diseases,
    },
    {
      title: "Shot Hole Disease",
      image: diseases,
    },
    {
      title: "Shot Hole Disease",
      image: diseases,
    },
    {
      title: "Shot Hole Disease",
      image: diseases,
    },
    {
      title: "Shot Hole Disease",
      image: diseases,
    },
    {
      title: "Shot Hole Disease",
      image: diseases,
    },
  ];

  const router = useRouter();

  function handleNavigate(path: string) {
    router.push(path);
  }

  return (
    <div className={styles.container}>
      <div className={styles.main_diseases}>
        <h2 className={styles.diseases_title}>Agrokasalliklar</h2>
        <p className={styles.diseases_text}>
          123 dan ortiq kasalliklar tashxislari bilan
        </p>

        <div
          className={styles.diseases_grid}
          data-length={diseasesData.length == 8}
        >
          {diseasesData.map((item, index) => (
            <div
              className={styles.card}
              key={index}
              onClick={() => handleNavigate(`/diseases/${item.title}`)}
            >
              <Image
                src={item.image.src}
                alt="diseasess image"
                className={styles.image}
                width={300}
                height={300}
              />
              <p className={styles.title}>{item.title}</p>
            </div>
          ))}
        </div>

        <button
          type="button"
          className={styles.diseases_button}
          onClick={() => handleNavigate(`/diseases`)}
        >
          Barcha kasalliklarni ko’rish
        </button>
      </div>
    </div>
  );
};

export default Diseases;
