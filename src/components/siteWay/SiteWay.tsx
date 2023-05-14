import Link from "next/link";
import React from "react";
import { sitewayProps } from "@/data/interfaces";

//style
import styles from "./siteway.module.scss";

//icon
import right from "../../assets/icons/arrow_right.svg";

const SiteWay = ({
  siteWay,
  product = false,
}: {
  siteWay: sitewayProps[];
  product?: boolean;
}) => {
  return (
    <div className={styles.siteway} data-product={product}>
      {siteWay?.map((item, index) => (
        <Link key={index} href={item.url} className={styles.link}>
          {item.title}
          <img
            src={right.src}
            alt="arrow right green icon"
            className={styles.icon}
          />
        </Link>
      ))}
    </div>
  );
};

export default SiteWay;
