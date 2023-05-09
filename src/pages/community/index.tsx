import { Collections, SNavbar, Write } from "@/components";
import { cardsForExample } from "@/data";
import { questionTypes } from "@/data/interfaces";
import SEO from "@/layouts/seo/seo";
import React, { useState } from "react";

const index = () => {
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

      {question.active ? (
        <Write state={question} setState={setQuestion} quiz />
      ) : (
        <Collections data={cardsForExample} community />
      )}
    </SEO>
  );
};

export default index;
