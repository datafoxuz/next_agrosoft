import { DeceaseApiResponse } from "@/data/interfaces";
import SEO from "@/layouts/seo/seo";
import { LocaleSlugsContext, slugRedirect } from "@/layouts/seo/localeSlugs";
import { requestPage } from "@/lib/request";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";

const SNavbar = dynamic(() => import("@/components/secondNavbar/SecondNavbar"));
const DeceaseInternalPage = dynamic(
  () => import("@/components/internalPage/DeceaseInternalPage")
);

const index = ({ decease }: { decease: DeceaseApiResponse }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const siteWay = [
    {
      title: t("main_topics.main_page"),
      url: "/",
    },
    {
      title: t("main_topics.diseases"),
      url: "/deceases",
    },
    {
      title: `${decease?.data?.decease.name}`,
      url: `/deceases/${router.query.page}`,
    },
  ];

  return(
    <LocaleSlugsContext.Provider value={(decease?.data as { slugs?: Record<string, string> })?.slugs ?? null}>
    <SEO
      metaTitle={decease?.data.seo?.title}
      metaDescription={decease?.data.seo?.description}
      author={decease?.data.seo?.author}
    >
      <SNavbar siteWay={siteWay} innerPage />
      <DeceaseInternalPage decease={decease?.data.decease} similar={decease?.data.similar} />
    </SEO>
    </LocaleSlugsContext.Provider>
  );
};

export async function getServerSideProps({
  params,
  locale,
}: {
  params: { page: string };
  locale: string;
}) {
  const res = await requestPage(`/deceases/${params.page}`, "GET", null, { locale });
  if (!res) return { notFound: true };
  const { data, response } = res;
  const redirect = slugRedirect("deceases", locale, params.page, data?.data?.slugs);
  if (redirect) return redirect;

  if (response.status !== 404) {
    return {
      props: {
        decease: { ...data, status: response.status },
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
