import { Collections, SNavbar, Write } from "@/components";
import { cardsForExample } from "@/data";
import { questionTypes } from "@/data/interfaces";
import React, { useState } from "react";

import styles from "./community.module.scss";

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
    <div className={styles.community}>
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
    </div>
  );
};

export default index;
