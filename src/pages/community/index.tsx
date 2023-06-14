import { Collections, NotFound, SNavbar } from "@/components";
import { data, questionTypes } from "@/data/interfaces";
import SEO from "@/layouts/seo/seo";
import { fetchData } from "@/lib/fetchData";
import { searchDatas } from "@/lib/searchData";
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

export async function getServerSideProps({ query }: { query: ParsedUrlQuery }) {
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
    },
  };
}

export default index;
