import { card } from "@/data/interfaces";
import SEO from "@/layouts/seo/seo";
import { request } from "@/lib/request";
import ErrorPage from "@/pages/_error";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";

const SNavbar = dynamic(() => import("@/components/secondNavbar/SecondNavbar"))
const InternalPage = dynamic(() => import("@/components/internalPage/InternalPage"))

const index = ({ data }: { data: card }) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const siteWay = [
    {
      title: t("main_topics.main_page"),
      url: "/",
    },
    {
      title: t("main_topics.market"),
      url: "/market",
    },
    {
      title: `${router.query.product}`,
      url: `/market/${router.query.product}`,
    },
    {
      title: `${data?.title}`,
      url: `/market/${router.query.product}/${data?.slug}`,
    },
  ];

  return data.status === 200 ? (
    <SEO metaTitle={`${data?.seo?.title ? data?.seo?.title : data?.title}`}>
      <SNavbar siteWay={siteWay} innerPage />
      <InternalPage data={data} />
    </SEO>
  ) : (
    <ErrorPage status={data.status}/>
  );
};

export async function getServerSideProps({
  params,
  locale,
}: {
  params: { card: string };
  locale: string;
}) {
  const { data, response } = await request(
    `/marketplace/product/${params.card}`
  );

  if (response.status !== 404) {
    return {
      props: {
        data: { ...data, status: response.status },
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
