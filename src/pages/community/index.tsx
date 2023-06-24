import { Collections, NotFound, SNavbar } from "@/components";
import { data, questionTypes, responseData } from "@/data/interfaces";
import SEO from "@/layouts/seo/seo";
import { request } from "@/lib/request";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React, { useState } from "react";
import ErrorPage from "../_error";

const index = ({ communities }: { communities: data }) => {
  const { t } = useTranslation("common");
  const router = useRouter()
  const [question, setQuestion] = useState<questionTypes>({
    active: false,
    title: "",
    titleFile: null,
    desc: "",
    descFile: null,
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
