import React, { useState, KeyboardEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { request } from "@/lib/request";
import { toast } from "react-toastify";
import { useTranslation } from "next-i18next";

//assets
import arrow from "@/assets/icons/arrow_top_footer.svg";

import styles from "./footer.module.scss";

const Footer = () => {
  const { t } = useTranslation("common");
  const [email, setEmail] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = async (email: string) => {
    if (email.length) {
      setIsLoading(true);
      setIsError(false);
      const { response } = await request(
        `/email-subscribe`,
        "POST",
        JSON.stringify({ email })
      );

      if (response.status == 200) {
        toast.success("Emailingiz qabul qilindi!");
        setEmail("");
        setIsLoading(false);
      } else {
        toast.warning("Bu email avval qabul qilingan!");
        setIsLoading(false);
      }
    } else {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubscribe(email);
    }
  };

  return (
    <footer className={styles.footer}>
      <button
        type="button"
        onClick={handleClick}
        className={styles.to_top_button}
      >
        <Image
          src={arrow.src}
          alt="arrow top icon"
          className={styles.arrow_icon}
          width={25}
          height={32}
        />
      </button>
      <div className={styles.footer_wrapper}>
        <div className={styles.footer_top}>
          <div className={styles.footer_section}>
            <p className={styles.text}>{t("main.footer.title")}</p>
            <div className={styles.input_section} data-err={isError}>
              <input
                type="text"
                placeholder={`${t("main.footer.inp_placeholder")}`}
                className={styles.footer_input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                required
              />
              {isLoading ? (
                <button
                  type="button"
                  className={`${styles.footer_button} ${styles.load_button}`}
                >
                  {t("buttons.subscribe")}
                </button>
              ) : (
                <button
                  type="button"
                  className={styles.footer_button}
                  onClick={() => handleSubscribe(email)}
                >
                  {t("buttons.subscribe")}
                </button>
              )}
            </div>
          </div>
          <div className={styles.footer_section}>
            <p className={styles.text}>{t("main.footer.contact")}</p>
            <div className={styles.contact}>
              <p className={styles.text}>info@agrosoft.uz</p>
              <p className={styles.text}>+998 99 887 92 45</p>
            </div>
          </div>
        </div>
        <div className={styles.footer_bottom}>
          <div className={styles.footer_section}>
            <h4 className={styles.title}>{t("main.footer.why_agrosoft")}</h4>
            <p className={styles.text}>{t("main.footer.desc")}</p>

            <p className={styles.footer_info}>
              AgroSoft © {new Date().getFullYear()}. {t("main.footer.reserved")}
            </p>
          </div>
          <div className={styles.footer_links_wrapper}>
            <div className={styles.footer_links}>
              <Link href="/about" className={styles.link}>
                {t("main_topics.about")}
              </Link>
              <Link href="/weather" className={styles.link}>
                {t("main_topics.weather")}
              </Link>
              <Link href="/news" className={styles.link}>
                {t("main_topics.news")}
              </Link>
            </div>
            <div className={styles.footer_links}>
              <Link href="/community" className={styles.link}>
                {t("main_topics.community")}
              </Link>
              <Link href="diseases" className={styles.link}>
                {t("main_topics.diseases")}
              </Link>
              <Link href="/blogs" className={styles.link}>
                {t("main_topics.blogs")}
              </Link>
              <Link href="/market" className={styles.link}>
                {t("main_topics.market")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
