import { Collections, SNavbar, Write } from "@/components";
import { cardsForExample } from "@/data";
import { data, questionTypes } from "@/data/interfaces";
import SEO from "@/layouts/seo/seo";
import { fetchData } from "@/lib/fetchData";
import { ParsedUrlQuery } from "querystring";
import React, { useState } from "react";

const index = ({ communities }: { communities: data }) => {
  const [question, setQuestion] = useState<questionTypes>({
    active: false,
    title: "",
    titleFile: null,
    desc: "",
    descFile: null,
  });

  const siteWay = [
    {
      title: "Bosh sahifa",
      url: "/",
    },
    {
      title: "Agro jamiyat",
      url: "/community",
    },
  ];

  console.log(communities);

  return (
    <SEO metaTitle="Community">
      <SNavbar
        siteWay={siteWay}
        title="Agrojamiyat"
        community
        filter
        state={question}
        setState={setQuestion}
      />

      {question.active ? (
        <Write state={question} setState={setQuestion} quiz />
      ) : (
        <Collections data={communities.data} community />
      )}
    </SEO>
  );
};

export async function getServerSideProps({ query }: { query: ParsedUrlQuery }) {
  const page = query.page || 1;
  const communitiesData = await fetchData(
    `/community/index?page=${page}&per_page=5`
  );

  return {
    props: {
      communities: communitiesData,
    },
  };
}

export default index;
