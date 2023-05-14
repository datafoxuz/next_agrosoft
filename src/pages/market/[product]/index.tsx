import { Collections, SNavbar } from "@/components";
import { topcards } from "@/data";
import { questionTypes } from "@/data/interfaces";
import SEO from "@/layouts/seo/seo";
import { useRouter } from "next/router";
import React, { useState } from "react";

const index = () => {
  const [open, setOpen] = useState<questionTypes>({
    active: false,
  });

  const router = useRouter();

  const siteWay = [
    {
      title: "Bosh sahifa",
      url: "/",
    },
    {
      title: "Agromarket",
      url: "/market",
    },
    {
      title: `${router.query.product}`,
      url: `/market/${router.query.product}`,
    },
  ];

  return (
    <SEO metaTitle={`${router.query.product}`}>
      <SNavbar
        siteWay={siteWay}
        title={`${router.query.product}`}
        filter
        article
        product
        state={open}
        setState={setOpen}
      />
      <Collections data={topcards} product={open.active} />
    </SEO>
  );
};

export default index;
