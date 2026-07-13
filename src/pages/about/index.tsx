import SEO from "@/layouts/seo/seo";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import React from "react";

const SNavbar = dynamic(() => import("@/components/secondNavbar/SecondNavbar"))
const AboutInternalPage = dynamic(() => import("@/components/internalPage/AboutInternalPage"));

const index = () => {
  const { t } = useTranslation("common");

  const siteWay = [
    {
      title: t("main_topics.main_page"),
      url: "/",
    },
    {
      title: t("inner_page.about_us"),
      url: "/about",
    },
  ];
  return (
    <SEO metaTitle="About">
      <SNavbar siteWay={siteWay} title={`${t("inner_page.about_us")}`} about />
      <AboutInternalPage />
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
