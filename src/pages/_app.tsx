import Layout from "@/layouts/layout";
import NProgress from "nprogress";
import Router from "next/router";
import type { AppProps } from "next/app";
import { MainContextProvider } from "@/context";
import { appWithTranslation } from "next-i18next";
import { ToastContainer } from "react-toastify";
import Script from "next/script";

import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.scss";
import "nprogress/nprogress.css";
import Image from "next/image";

// Show the NProgress bar on page load
NProgress.configure({ showSpinner: false, speed: 500 });
Router.events.on("routeChangeStart", (url) => {
  if (!url.includes("?search=") && !url.includes("&search=")) {
    NProgress.start();
  }
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <MainContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer />
    </MainContextProvider>
  );
}

export default appWithTranslation(App);
