import { Html, Head, Main, NextScript } from 'next/document';
import Image from 'next/image';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Script strategy='lazyOnload' type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "AgroSoft",
              "url": "https://agrosoft.uz",
              "sameAs": [
                "https://www.facebook.com/agrosoftuz",
                "https://www.t.me/agrosoftuz",
                "https://www.instagram.com/agrosoftuz",
                "https://www.linkedin.com/in/agrosoftuz/",
                "https://www.tumblr.com/agrosoftuz",
                "https://medium.com/@agrosoftuz"
              ]
            }
          `}
        </Script>
        <Script>
          {
            `
            window.dataLayer = window.dataLayer || [];
            function gtag() {
                dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', 'UA-253078599-1');
              `
          }
        </Script>
        <Script strategy='lazyOnload' src="https://www.googletagmanager.com/gtag/js?id=UA-253078599-1" />

        <Script type="text/javascript">
          top_js = "1.0";
          top_r = "id=47002&r=" + escape(document.referrer) + "&pg=" + escape(window.location.href);
          document.cookie = "smart_top=1; path=/";
          top_r += "&c=" + (document.cookie ? "Y" : "N")
        </Script>
        <Script type="text/javascript">
          top_js = "1.1";
          top_r += "&j=" + (navigator.javaEnabled() ? "Y" : "N")
        </Script>
        <Script type="text/javascript">
          top_js = "1.2";
          top_r += "&wh=" + screen.width + 'x' + screen.height + "&px=" +
          (((navigator.appName.substring(0, 3) == "Mic")) ? screen.colorDepth : screen.pixelDepth)

        </Script>
        <Script type="text/javascript">
          top_js = "1.3";

        </Script>
        <Script type="text/javascript">
          top_rat = "&col=340F6E&t=ffffff&p=BD6F6F";
          top_r += "&js=" + top_js + "";
          document.write('<Image src="https://cnt0.www.uz/counter/collect?' + top_r + top_rat + '" width={0} height={0} alt="image" />')
        </Script>
        <noscript><Image height={0}
          src="https://cnt0.www.uz/counter/collect?id=47002&pg=http%3A//uzinfocom.uz&col=340F6E&t=ffffff&p=BD6F6F"
          alt="image"
          width={0} />
        </noscript>

      </Head>
      <body>
        <Main />
        <NextScript />

      </body>
    </Html>
  );
}
