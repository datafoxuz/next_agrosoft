import { LoginModal, ResetPass } from "@/components/auth";
import AuthLayout from "@/layouts/auth/layout";
import SEO from "@/layouts/seo/seo";
import React, { useState } from "react";

const index = () => {
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
    <SEO metaTitle="Login">
      <AuthLayout>{mainContent(tabId, setTabId)}</AuthLayout>
    </SEO>
  );
};

export default index;
