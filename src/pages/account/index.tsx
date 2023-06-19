import { SNavbar } from "@/components";
import React, { useState } from "react";
import SEO from "@/layouts/seo/seo";
import { useTranslation } from "next-i18next";
import PersonalInfo from "./components/personalInfo/PersonalInfo";
import AddintionalInfo from "./components/addintionalInfo/AddintionalInfo";
import Saved from "./components/mySaved/Saved";
import MyProducts from "./components/myProducts/MyProducts";
import { fetchData } from "@/lib/fetchData";
import NotFound from "../404";
import { request } from "@/lib/request";
import { useSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

import styles from "./profile.module.scss";

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

export async function getServerSideProps({ locale }: { locale: string }) {
  const userData = await request(`/users/about-me`, "GET", null, false, {
    Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxNSIsImp0aSI6IjcxYTQyMDVlM2YyMzRkMDA5MzI0ZTc1YjZiYjQxOTFlMzdkZjczYzIxYmRlZmI0ZTZlM2UyZGQwMmU2NGZhOWZkM2QwZjIzMzc0ODY5Y2U0IiwiaWF0IjoxNjg3MTc0ODY5LjE0NjU1MywibmJmIjoxNjg3MTc0ODY5LjE0NjU1OSwiZXhwIjoxNjg5NzY2ODY5LjEzODEzOCwic3ViIjoiMTg2Iiwic2NvcGVzIjpbXX0.eKcqfZW_F8eU8hsyQHC2uUuc3ulE1CHZ4xm_WAaKFt14kuAkH0lZwo98drOu5q_e1N9hEzdUE7ftmtABbX5xfzXOmj6-kXK7Ljr7bxIIr8aZSeGWdk0ahypNptITio0PSlU4HqngtoGmzF5YBULQFazo_oy412oZ_TRBm05p2pFtCN4bK6OttE4xP8qtH7UkdtVW9HDfI0TCpWJWRMUUYa4MOg7qVuzzHzZfcUFxzhbuCmD1PW3Zu35DuWvMSFLZvXA4OdQz9KlqoCaJPha-TO5K1SHnECuqTNUlWW_TR50h79WY4eyw1gNLII0bzwZgCGLrtPUZe6KvTyz58ARlB_xAW6JhSlD3WegOSjIamQUJmeU0WliuCM8qFVVPP8Cz880DlRL2T5rySaEUPyff_SOxtrlB6AGWXFkgZXcD7CU3PSZZ3B8bVt7enZA-j_y-zwrEqEqwRMu8GT19fsGSe4GBVfuIo3y9L3MaOyTBX3SMUrMptJAAN0svMTYREhrXs-8s3cfDZluOX_F1JgiB6SuCRoFiQsp5UtbBWRdnvGVkRfNBP1gd3lyC5Yx37wfA4takBE19AdGyPxMpJ2xgAv0xr7LmcoBtH392BbkYp0H2ZRBajrh37oekmH7VEVszwhjN4_s7SsYsVijJ9G59j9dXEaBLCJS71Pomq73kAPI`,
  });

  if (userData?.response.status === 200) {
    return {
      props: {
        user: userData.data,
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
