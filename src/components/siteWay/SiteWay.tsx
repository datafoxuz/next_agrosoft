import Link from "next/link";
import React from "react";
import { sitewayProps } from "@/data/interfaces";

//style
import styles from "./siteway.module.scss";

//icon
import right from "../../assets/icons/arrow_right.svg";

const SiteWay = ({ siteWay }: { siteWay: sitewayProps[] }) => {
  return (
    <div className={styles.siteway}>
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
