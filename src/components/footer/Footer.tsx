import React from "react";
import Link from "next/link";
//assets
import arrow from "@/assets/icons/arrow_top_footer.svg";

import styles from "./footer.module.scss";

const Footer = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <button
        type="button"
        onClick={handleClick}
        className={styles.to_top_button}
      >
        <img
          src={arrow.src}
          alt="arrow top icon"
          className={styles.arrow_icon}
        />
      </button>
      <div className={styles.footer_wrapper}>
        <div className={styles.footer_top}>
          <div className={styles.footer_section}>
            <p className={styles.text}>
              So’nggi yangiliklardan habardor bo’lib turing
            </p>
            <div className={styles.input_section}>
              <input
                type="text"
                placeholder="Emailingizni kiriting"
                className={styles.footer_input}
              />
              <button type="button" className={styles.footer_button}>
                Obuna bo’lsih
              </button>
            </div>
          </div>
          <div className={styles.footer_section}>
            <p className={styles.text}>Bog’lanish:</p>
            <div className={styles.contact}>
              <p className={styles.text}>info@agrosoft.uz</p>
              <p className={styles.text}>+998 99 887 92 45</p>
            </div>
          </div>
        </div>
        <div className={styles.footer_bottom}>
          <div className={styles.footer_section}>
            <h4 className={styles.title}>Why Agrosoft?</h4>
            <p className={styles.text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit i
            </p>

            <p className={styles.footer_info}>
              AgroSoft © {new Date().getFullYear()}. All rights reserved
            </p>
          </div>
          <div className={styles.footer_links_wrapper}>
            <div className={styles.footer_links}>
              <Link href="" className={styles.link}>
                Biz haqimizda
              </Link>
              <Link href="" className={styles.link}>
                Ob-havo ma’lumotlari
              </Link>
              <Link href="" className={styles.link}>
                Yangiliklar
              </Link>
            </div>
            <div className={styles.footer_links}>
              <Link href="" className={styles.link}>
                Agro jamiyat
              </Link>
              <Link href="" className={styles.link}>
                Agro kasallikar
              </Link>
              <Link href="" className={styles.link}>
                Agro maqolalar
              </Link>
              <Link href="" className={styles.link}>
                Agro market
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
