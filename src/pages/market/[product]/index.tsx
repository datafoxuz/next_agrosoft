import { Collections, SNavbar } from "@/components";
import { data, questionTypes } from "@/data/interfaces";
import SEO from "@/layouts/seo/seo";
import { fetchData } from "@/lib/fetchData";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React, { useState } from "react";

const index = ({ products }: { products: data }) => {
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
      <Collections
        data={products.data}
        meta={products.meta}
        product={open.active}
      />
    </SEO>
  );
};

export async function getServerSideProps({
  params,
  locale,
}: {
  params: { product: string };
  locale: string;
}) {
  const products = await fetchData(`/marketplace/${params.product}`);

  return {
    props: {
      products,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default index;
