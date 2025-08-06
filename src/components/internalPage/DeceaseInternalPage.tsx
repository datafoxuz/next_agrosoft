import React from "react";
import { Collections } from "@/components";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { deceaseItem } from "@/data/interfaces";
import SEO from "@/layouts/seo/seo";

import styles from "./internalPage.module.scss";
import defaultImage from "@/assets/images/default_image.png";


const DeceaseInternalPage = ({
    decease,
    similar = [],
}: {
    decease?: deceaseItem;
    similar?: deceaseItem[];
}) => {
    const { t } = useTranslation("common");

    return (
        <div className={styles.internal}>
            {decease && (
                <SEO
                    metaTitle={decease.seo?.title}
                    metaDescription={decease.seo?.description}
                    author={decease.seo?.author}
                >
                    <div className={`${styles.image_wrapper} ${styles.section}`}>
                        <Image
                            src={decease.image ? decease.image : defaultImage.src}
                            alt="about image"
                            className={styles.image}
                            width={680}
                            height={382}
                        />


                    </div>
                    <h2 className={styles.title}>{decease.name}</h2>
                    <>
                        {similar.length ? (
                            <div className={styles.liked}>
                                <h2 className={`${styles.title} ${styles.liked_title}`}>
                                    {t("inner_page.similar_articles")}
                                </h2>
                                <Collections data={similar} similar />
                            </div>
                        ) : null}
                    </>
                </SEO>
            )}
        </div>
    );
};

export default DeceaseInternalPage;
