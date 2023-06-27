import { data, questionTypes, responseData } from "@/data/interfaces";
import SEO from "@/layouts/seo/seo";
import { request } from "@/lib/request";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ParsedUrlQuery } from "querystring";
import React, { useState } from "react";
import dynamic from "next/dynamic";

const SNavbar = dynamic(() => import("@/components/secondNavbar/SecondNavbar"))
const Collections = dynamic(() => import("@/components/cardsCollection/CardsCollection"))
const NotFound = dynamic(() => import("@/components/notFound/NotFound"))
const ErrorPage = dynamic(() => import("../_error"))


const index = ({ communities }: { communities: data }) => {
  const { t } = useTranslation("common");
  const [question, setQuestion] = useState<questionTypes>({
    active: false,
    title: "",
    file: null,
    desc: "",
  });

  const siteWay = [
    {
      title: t("main_topics.main_page"),
      url: "/",
    },
    {
      title: t("main_topics.community"),
      url: "/community",
    },
  ];



  return communities.status === 200 ? (
    <SEO metaTitle={`${t("main_topics.community")} - AgroSoft`}>
      <SNavbar
        siteWay={siteWay}
        title={`${t("main_topics.community")}`}
        community
        filter
        state={question}
        setState={setQuestion}
      />

      {communities?.data?.length ? (
        <Collections
          data={communities.data}
          meta={communities.meta}
          community
        />
      ) : (
        <NotFound />
      )}
    </SEO>
  ) : (
    <ErrorPage status={communities.status}/>
  );
};

export async function getServerSideProps({
  query,
  locale,
}: {
  query: ParsedUrlQuery;
  locale: string;
}) {
  const page = query.page || 1;
  const search = query.search || "";
  let communitiesData;

  if (search.length) {
    communitiesData = await request(`/community-search?q=${search}`);
  } else {
    communitiesData = await request(
      `/community/index?page=${page}&per_page=10`
    );
  }

  return {
    props: {
      communities: {
        ...communitiesData.data,
        status: communitiesData.response.status,
      },
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default index;
