import React, { useState } from "react";
import { Write } from "@/components";
import CardActions from "../cardsCollection/components/communityCard/cardActions/CardActions";
import Image from "next/image";

import styles from "./internalPage.module.scss";

import image from "@/assets/images/community.png";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";

import ShareIcon from "@mui/icons-material/Share";
import Answer from "./Answer/Answer";
import { questionTypes } from "@/data/interfaces";

const InternalPage = ({
  questions = false,
  about,
}: {
  questions?: boolean;
  about?: boolean;
}) => {
  const [isWriteAns, setIsWriteAns] = useState<questionTypes>({
    active: false,
    title: "",
    titleFile: null,
    desc: "",
    descFile: null,
  });

  const data = {
    image: image,
    title:
      "What is the difference between displacement capacity and CC of a farm tractor?",
    url: "/",
    commentsNum: "5",
    date: "3.06.2022",
    answered: true,
  };

  return (
    <div className={styles.internal}>
      {about && (
        <div className={styles.internal_top}>
          <h3 className={styles.hidden_title}>Biz haqimizda</h3>

          <button type="button" className={styles.top_button}>
            Biz bilan bog’laning
          </button>
        </div>
      )}

      <div className={styles.image_wrapper}>
        <Image
          src={image.src}
          alt="about image"
          className={styles.image}
          width={680}
          height={382}
        />
        {!about && (
          <div className={styles.events}>
            <button>
              <TurnedInNotIcon /> Saqlab qo’yish
            </button>
            <button>
              <ShareIcon />
              Ulashish
            </button>
          </div>
        )}
      </div>
      <h2 className={styles.title}>
        Aholi xonadonlarida bedana boqish va ko‘paytirish
      </h2>
      {questions ? (
        <>
          <CardActions data={data} />
          <div className={styles.section}>
            <div className={styles.question}>
              <h3 className={styles.title}>Savol:</h3>
              <h5 className={styles.description}>
                The document regulates the production, processing, storage,
                transportation, labeling and sale, as well as conformity
                assessment and authorization of organic products. In accordance
                with the law, the government will provide subsidies for the The
                document regulates the production, processing, storage,
                transportation, labeling and sale, as well as conformity
                assessment and authorization of organic products. In accordance
                with the law, the government will povide subsidies for the
              </h5>
            </div>

            <div className={styles.answer}>
              <div
                className={styles.answer_head_section}
                data-column={isWriteAns.active}
              >
                <h3 className={styles.title}>Javoblar</h3>
                <div className={styles.answer_write}>
                  {isWriteAns.active ? (
                    <Write state={isWriteAns} setState={setIsWriteAns} />
                  ) : (
                    <button
                      type="button"
                      className={`${styles.button} ${styles.write_ans}`}
                      onClick={() =>
                        setIsWriteAns((propState) => ({
                          ...propState,
                          active: !propState.active,
                        }))
                      }
                    >
                      Javob yozish
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.answer_list}>
              {[1, 2, 3].map((item, index) => (
                <Answer />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className={styles.section}>
          <span className={styles.date}>12 March, 2024</span>
          <h5 className={styles.description}>
            Peppers can be rewarding and fun to grow, with so many different
            types to be explored by cultivating this vegetable on your own. What
            isn’t rewarding is a ruined crop from pests, disease, or poor
            nutrition. The likelihood of these issues can be reduced or
            mitigated without any added chemicals; instead, all you need are
            some more plants! Adding companion plants for peppers to your garden
            can reduce risks to your crop and may even increase the flavor and
            yield of your peppers, so continue reading to learn more about
            giving your veggies a helping hand from some friends. Peppers can be
            rewarding and fun to grow, with so many different types to be
            explored by cultivating this vegetable on your own. What isn’t
            rewarding is a ruined crop from pests, disease, or poor nutrition.
            The likelihood of these issues can be reduced or mitigated without
            any added chemicals; instead, all you need are some more plants!
            Adding companion plants for peppers to your garden can reduce risks
            to your crop and may even increase the flavor and yield of your
            peppers, so continue reading to learn more about giving your veggies
            a helping hand from some friends. Peppers can be rewarding and fun
            to grow, with so many different types to be explored by cultivating
            this vegetable on your own. What isn’t rewarding is a ruined crop
            from pests, disease, or poor nutrition. The likelihood of these
            issues can be reduced or mitigated without any added chemicals;
            instead, all you need are some more plants! Adding companion plants
            for peppers to your garden can reduce risks to your crop and may
            even increase the flavor and yield of your peppers, so continue
            reading to learn more about giving your veggies a helping hand from
            some friends.
          </h5>
        </div>
      )}
    </div>
  );
};

export default InternalPage;
