import { SNavbar } from "@/components";
import React, { useState } from "react";
import SEO from "@/layouts/seo/seo";
import { useTranslation } from "next-i18next";
// import { AddintionalInfo, MyProducts, PersonalInfo, Saved } from "./components";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import styles from "./profile.module.scss";
import PersonalInfo from "./components/personalInfo/PersonalInfo";
import AddintionalInfo from "./components/addintionalInfo/AddintionalInfo";
import Saved from "./components/mySaved/Saved";
import MyProducts from "./components/myProducts/MyProducts";

const index = () => {
  const { t } = useTranslation("common");
  const [tabId, setTabId] = useState<number>(1);

  const siteWay = [
    {
      title: t("main_topics.main_page"),
      url: "/",
    },
    {
      title: t("main_topics.acc_info"),
      url: "/account",
    },
  ];

  const sidebarLinks = [
    {
      title: t("account.personal_info.title"),
      tabId: 1,
    },
    {
      title: t("account.other_info.title"),
      tabId: 2,
    },
    {
      title: t("account.saved.title"),
      tabId: 3,
    },
    {
      title: t("account.my_products.title"),
      tabId: 4,
    },
  ];

  return (
    <SEO metaTitle={`${t("main_topics.acc_info")}`}>
      <div className={styles.profile}>
        <SNavbar
          siteWay={siteWay}
          title={`${t("main_topics.acc_info")}`}
          account
        />

        <div className={styles.profile_wrapper}>
          <div className={styles.sidebar}>
            {sidebarLinks.map((item, index) => (
              <p
                className={styles.item}
                key={index}
                data-active={item.tabId == tabId}
                onClick={() => setTabId(item.tabId)}
              >
                {item.title}
              </p>
            ))}
          </div>

          {tabId == 1 ? (
            <PersonalInfo />
          ) : tabId == 2 ? (
            <AddintionalInfo />
          ) : tabId == 3 ? (
            <Saved />
          ) : tabId == 4 ? (
            <MyProducts />
          ) : null}
        </div>
      </div>
    </SEO>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default index;
