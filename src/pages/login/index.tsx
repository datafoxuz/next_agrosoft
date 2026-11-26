import AuthLayout from "@/layouts/auth/layout";
import SEO from "@/layouts/seo/seo";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import React from "react";

const GoogleLogin = dynamic(() => import("@/components/auth/GoogleLogin/GoogleLogin"), { ssr: false });

const index = () => {
  const { t } = useTranslation("common");
  return (
    <SEO metaTitle={`${t("auth.login")}`} noindex>
      <AuthLayout>
        <GoogleLogin />
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
