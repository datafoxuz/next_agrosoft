import React from "react";
import { Collections } from "@/components";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { deceaseItem } from "@/data/interfaces";
import SEO, { toPlainText } from "@/layouts/seo/seo";
import { useRouter } from "next/router";

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
    const router = useRouter();

    const d = decease as (deceaseItem & { body?: string; images?: string[] }) | undefined;
    const image = d?.image || d?.images?.[0] || "";
    const body = d?.body || "";
    const description = toPlainText(d?.seo?.description || body);

    return (
        <div className={styles.internal}>
            {decease && (
                <SEO
                    metaTitle={d?.seo?.title || decease.name}
                    metaDescription={description || t("seo.deceases.description")}
                    author={d?.seo?.author}
                    image={image || undefined}
                    type="article"
                    jsonLd={{
                        "@context": "https://schema.org",
                        "@type": "MedicalWebPage",
                        name: decease.name,
                        about: { "@type": "MedicalCondition", name: decease.name },
                        description: description.slice(0, 300),
                        image: image ? [image] : undefined,
                        inLanguage: router.locale || "uz",
                    }}
                >
                    <div className={`${styles.image_wrapper} ${styles.section}`}>
                        <Image
                            src={image || defaultImage.src}
                            alt={decease.name}
                            className={styles.image}
                            width={680}
                            height={382}
                        />
                    </div>
                    <h1 className={styles.title}>{decease.name}</h1>
                    {body ? (
                        <div className={styles.section}>
                            <div
                                className={styles.description}
                                dangerouslySetInnerHTML={{
                                    __html: body.replace(/<(\/?)h1(\s|>)/gi, "<$1h2$2"),
                                }}
                            />
                        </div>
                    ) : null}
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
