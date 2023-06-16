import { Collections, NotFound, SNavbar } from "@/components";
import { data, questionTypes } from "@/data/interfaces";
import SEO from "@/layouts/seo/seo";
import { fetchData } from "@/lib/fetchData";
import { searchDatas } from "@/lib/searchData";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ParsedUrlQuery } from "querystring";
import React, { useState } from "react";

const index = ({ communities }: { communities: data }) => {
  const { t } = useTranslation("common");
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

  return (
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
    communitiesData = await searchDatas(`/community-search?q=${search}`);
  } else {
    communitiesData = await fetchData(
      `/community/index?page=${page}&per_page=10`
    );
  }

  return {
    props: {
      communities: communitiesData,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default index;
