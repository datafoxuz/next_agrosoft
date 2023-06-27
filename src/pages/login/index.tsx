import { LoginModal, ResetPass } from "@/components/auth";
import AuthLayout from "@/layouts/auth/layout";
import SEO from "@/layouts/seo/seo";
import { request } from "@/lib/request";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState } from "react";

const index = () => {
  const { t } = useTranslation("common");
  const [tabId, setTabId] = useState<number>(1);

  function mainContent(tabId: number, setTabId: (v: number) => void) {
    switch (tabId) {
      case 1:
        return <LoginModal tabId={tabId} setTabId={setTabId} />;
      case 2:
        return <ResetPass tabId={tabId} setTabId={setTabId} />;
      default:
        break;
    }
  }

  return (
    <SEO metaTitle={`${t("auth.login")}`}>
      <AuthLayout>{mainContent(tabId, setTabId)}</AuthLayout>
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
