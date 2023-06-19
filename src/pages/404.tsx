import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

const NotFound = () => {
  return <div>NotFound</div>;
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default NotFound;
