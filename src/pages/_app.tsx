import Layout from "@/layouts/layout";
import NProgress from "nprogress";
import Router from "next/router";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { MainContextProvider } from "@/context";

import "@/styles/globals.scss";
import "nprogress/nprogress.css";

// Show the NProgress bar on page load
NProgress.configure({ showSpinner: false, speed: 500 });
Router.events.on("routeChangeStart", (url) => {
  if (!url.includes("?search=") && !url.includes("&search=")) {
    NProgress.start();
  }
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <MainContextProvider>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </MainContextProvider>
  );
}
