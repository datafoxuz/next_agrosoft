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
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-T92378W7');
          `}
        </Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T92378W7"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Script strategy="afterInteractive">
          {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '873501004292423');
          fbq('track', 'PageView');
          `}
        
        </Script>
        
        <noscript>
          <img 
          height="1" 
          width="1" 
          style={{display:none}}
          src="https://www.facebook.com/tr?id=873501004292423&ev=PageView&noscript=1"
        /></noscript>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=G-JWRJEZ358E`} strategy="afterInteractive" />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', 'G-JWRJEZ358E');
          `}
        </Script>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer />
    </MainContextProvider>
  );
}

export default appWithTranslation(App);
