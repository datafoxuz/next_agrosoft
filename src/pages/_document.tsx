import { Html, Head, Main, NextScript } from 'next/document';
import Image from 'next/image';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
                var top_js = "1.0";
                var top_r = "id=47002&r=" + escape(document.referrer) + "&pg=" + escape(window.location.href);
                document.cookie = "smart_top=1; path=/";
                top_r += "&c=" + (document.cookie ? "Y" : "N");
              `
          }}
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
                top_js = "1.1";
                top_r += "&j=" + (navigator.javaEnabled() ? "Y" : "N");
              `
          }}
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
                top_js = "1.2";
                top_r += "&wh=" + screen.width + 'x' + screen.height + "&px=" +
                (((navigator.appName.substring(0, 3) == "Mic")) ? screen.colorDepth : screen.pixelDepth);
              `
          }}
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
                top_js = "1.3";
              `
          }}
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
                var top_rat = "&col=340F6E&t=ffffff&p=BD6F6F";
                top_r += "&js=" + top_js + "";
                document.write('<img src="https://cnt0.www.uz/counter/collect?' + top_r + top_rat + '" width="0" height="0" alt="image" />');
              `
          }}
        />
        <noscript>
          <img
            src="https://cnt0.www.uz/counter/collect?id=47002&pg=http%3A//uzinfocom.uz&col=340F6E&t=ffffff&p=BD6F6F"
            alt="image"
            width="0"
            height="0"
          />
        </noscript>
      </Head>
      <body>
        <Main />
        <NextScript />

      </body>
    </Html>
  );
}
