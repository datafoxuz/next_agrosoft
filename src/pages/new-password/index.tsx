import AuthLayout from "@/layouts/auth/layout";
import SEO from "@/layouts/seo/seo";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import React from "react";

const NewPassword = dynamic(() => import("@/components/auth/NewPassword/NewPassword"))

const index = () => {
  const { t } = useTranslation("common");

  return (
    <SEO metaTitle={`${t("auth.new_pass")}`}>
      <AuthLayout>
        <NewPassword />
      </AuthLayout>
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
