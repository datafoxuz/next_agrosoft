import { LoginModal, ResetPass } from "@/components/auth";
import AuthLayout from "@/layouts/auth/layout";
import SEO from "@/layouts/seo/seo";
import { request } from "@/lib/request";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState } from "react";

const index = () => {
  const { t } = useTranslation("common");
  const [tabId, setTabId] = useState<number>(1);

  function mainContent(tabId: number, setTabId: (v: number) => void) {
    switch (tabId) {
      case 1:
        return <LoginModal tabId={tabId} setTabId={setTabId} />;
      case 2:
        return <ResetPass tabId={tabId} setTabId={setTabId} />;
      default:
        break;
    }
  }

  return (
    <SEO metaTitle={`${t("auth.login")}`}>
      <AuthLayout>{mainContent(tabId, setTabId)}</AuthLayout>
    </SEO>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  const userData = await request(`/users/about-me`, "GET", null, false, {
    Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxNSIsImp0aSI6IjcxYTQyMDVlM2YyMzRkMDA5MzI0ZTc1YjZiYjQxOTFlMzdkZjczYzIxYmRlZmI0ZTZlM2UyZGQwMmU2NGZhOWZkM2QwZjIzMzc0ODY5Y2U0IiwiaWF0IjoxNjg3MTc0ODY5LjE0NjU1MywibmJmIjoxNjg3MTc0ODY5LjE0NjU1OSwiZXhwIjoxNjg5NzY2ODY5LjEzODEzOCwic3ViIjoiMTg2Iiwic2NvcGVzIjpbXX0.eKcqfZW_F8eU8hsyQHC2uUuc3ulE1CHZ4xm_WAaKFt14kuAkH0lZwo98drOu5q_e1N9hEzdUE7ftmtABbX5xfzXOmj6-kXK7Ljr7bxIIr8aZSeGWdk0ahypNptITio0PSlU4HqngtoGmzF5YBULQFazo_oy412oZ_TRBm05p2pFtCN4bK6OttE4xP8qtH7UkdtVW9HDfI0TCpWJWRMUUYa4MOg7qVuzzHzZfcUFxzhbuCmD1PW3Zu35DuWvMSFLZvXA4OdQz9KlqoCaJPha-TO5K1SHnECuqTNUlWW_TR50h79WY4eyw1gNLII0bzwZgCGLrtPUZe6KvTyz58ARlB_xAW6JhSlD3WegOSjIamQUJmeU0WliuCM8qFVVPP8Cz880DlRL2T5rySaEUPyff_SOxtrlB6AGWXFkgZXcD7CU3PSZZ3B8bVt7enZA-j_y-zwrEqEqwRMu8GT19fsGSe4GBVfuIo3y9L3MaOyTBX3SMUrMptJAAN0svMTYREhrXs-8s3cfDZluOX_F1JgiB6SuCRoFiQsp5UtbBWRdnvGVkRfNBP1gd3lyC5Yx37wfA4takBE19AdGyPxMpJ2xgAv0xr7LmcoBtH392BbkYp0H2ZRBajrh37oekmH7VEVszwhjN4_s7SsYsVijJ9G59j9dXEaBLCJS71Pomq73kAPI`,
  });

  if (userData?.response.status !== 200) {
    return {
      props: {
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
