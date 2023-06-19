import { Collections, SNavbar } from "@/components";
import { data, questionTypes } from "@/data/interfaces";
import SEO from "@/layouts/seo/seo";
import { request } from "@/lib/request";
import ErrorPage from "@/pages/_error";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React, { useState } from "react";

const index = ({ products }: { products: data }) => {
  const { t } = useTranslation("common");
  const [open, setOpen] = useState<questionTypes>({
    active: false,
  });

  const router = useRouter();

  const siteWay = [
    {
      title: t("main_topics.main_page"),
      url: "/",
    },
    {
      title: t("main_topics.market"),
      url: "/market",
    },
    {
      title: `${router.query.product}`,
      url: `/market/${router.query.product}`,
    },
  ];

  return products.status === 200 ? (
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
  ) : (
    <ErrorPage />
  );
};

export async function getServerSideProps({
  params,
  locale,
}: {
  params: { product: string };
  locale: string;
}) {
  const products = await request(`/marketplace/${params.product}`);

  if (products.response.status !== 404) {
    return {
      props: {
        products: { ...products.data, status: products.response.status },
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
}

export default index;
