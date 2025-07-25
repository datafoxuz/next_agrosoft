import { CommunityApiResponse, communityData, questionTypes } from "@/data/interfaces";
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


const index = ({ communities }: { communities: CommunityApiResponse }) => {
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



  if (!communities.success) return (
    <ErrorPage />
  );
  return (
    <SEO metaTitle={communities.data.seo.title} metaDescription={communities.data.seo.description} metaKeywords={communities.data.seo.keyword}>
      <SNavbar
        siteWay={siteWay}
        title={`${t("main_topics.community")}`}
        community
        filter
        state={question}
        setState={setQuestion}
      />

      {communities.data.problems.length ? (
        <Collections
          data={communities.data.problems as any}
          meta={{
            currentPage: communities.data.paginator.current_page,
            pageCount: communities.data.paginator.pages_count,
            perPage: communities.data.paginator.per_page,
            totalCount: communities.data.paginator.total_count,
          }}
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
    communitiesData = await request(`/community-search?q=${search}`, "GET", null, false, locale);
  } else {
    communitiesData = await request(
      `/community/index?page=${page}&per_page=10`, "GET", null, false, locale
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
