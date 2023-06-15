import { RegisterModal } from "@/components/auth";
import AuthLayout from "@/layouts/auth/layout";
import SEO from "@/layouts/seo/seo";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

const index = () => {
  const { t } = useTranslation("common");
  return (
    <SEO metaTitle={`${t("auth.signup")}`}>
      <AuthLayout>
        <RegisterModal />
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
