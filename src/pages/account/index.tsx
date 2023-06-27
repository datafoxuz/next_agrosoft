import React, { useState } from "react";
import SEO from "@/layouts/seo/seo";
import { useTranslation } from "next-i18next";
import { request } from "@/lib/request";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { parseCookies } from "nookies";
import dynamic from "next/dynamic";

import styles from "./profile.module.scss";

const SNavbar = dynamic(() => import("@/components/secondNavbar/SecondNavbar"))
const MyProducts = dynamic(() => import("./components/myProducts/MyProducts"))
const Saved = dynamic(() => import("./components/mySaved/Saved"))
const PersonalInfo = dynamic(() => import("./components/personalInfo/PersonalInfo"))
const AddintionalInfo = dynamic(() => import("./components/addintionalInfo/AddintionalInfo"))
const ErrorPage = dynamic(() => import("../_error"))


const index = ({ status }: { status: number }) => {
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

  return status === 200 ? (
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
  ) : (
    <ErrorPage status={status} />
  );
};

export async function getServerSideProps({
  locale,
  req,
}: {
  locale: string;
  req: any;
}) {
  const cookies = parseCookies({ req });

  const userData = await request(`/users/about-me`, "GET", null, false, {
    Authorization: `Bearer ${cookies.userToken}`,
  });

  if (userData?.response.status !== 401) {
    return {
      props: {
        user: userData.data,
        status: userData?.response.status,
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
}

export default index;
