import Layout from "@/layouts/layout";
// import NProgress from "nprogress";
import Router from "next/router";
import type { AppProps } from "next/app";

import "@/styles/globals.scss";
import "nprogress/nprogress.css";

// Show the NProgress bar on page load
// NProgress.configure({ showSpinner: false, speed: 500 });
// Router.events.on("routeChangeStart", () => {
//   NProgress.start();
// });
// Router.events.on("routeChangeComplete", () => NProgress.done());
// Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
