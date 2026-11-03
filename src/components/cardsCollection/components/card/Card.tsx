import { card } from "@/data/interfaces";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import notfound from "@/assets/images/not_found.png";

import styles from "./card.module.scss";

import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";

/** Title for any card-like entity (articles/blogs/products use `title`, diseases use `name`). */
export function cardTitle(item: card): string {
  return (item.title || (item as unknown as { name?: string }).name || "").trim();
}

const Card = ({
  item,
  account = "",
}: {
  item: card;
  similar?: boolean;
  account?: string;
}) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [imageError, setImageError] = useState(false);
  const title = cardTitle(item);

  // Real <a href> so search engines can crawl detail pages.
  let href: string;
  if (account) {
    href = `${account}/${item.slug}`;
  } else if (router.query.product) {
    href = `/market/${router.query.product}/${item.slug}`;
  } else {
    href = `/${router.pathname.split("/")[1]}/${item.slug}`;
  }

  return (
    <Link href={href} className={styles.card}>
      <Image
        src={!imageError && item.image ? item.image : notfound}
        alt={title}
        className={styles.image}
        width={305}
        height={205}
        onError={() => setImageError(true)}
      />

      {item.country_name && (
        <div className={styles.location}>
          <FmdGoodOutlinedIcon className={styles.icon} />
          {item.region_name && item.region_name}, {item.country_name}
        </div>
      )}

      <h2 className={styles.title}>{title}</h2>
      {item.high_price && (
        <div className={styles.price}>
          {item.high_price} USD / {t("card.per_kg")}
        </div>
      )}
    </Link>
  );
};

export default Card;
