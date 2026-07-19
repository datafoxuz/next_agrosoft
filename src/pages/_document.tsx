import Document, {
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";
import Script from "next/script";

export default class MyDocument extends Document {
  render() {
    const locale =
      this.props.__NEXT_DATA__.locale || "uz";

    return (
      <Html lang={locale}>
        <Head>
          <Script
            id="counter-script"
            strategy="beforeInteractive"
          >
            {`
              (function () {
                function sendCounter() {
                  var topJs = "1.3";

                  var topR =
                    "id=47002" +
                    "&r=" + encodeURIComponent(document.referrer) +
                    "&pg=" + encodeURIComponent(window.location.href);

                  document.cookie =
                    "smart_top=1; path=/; SameSite=Lax";

                  topR += "&c=" + (document.cookie ? "Y" : "N");
                  topR += "&j=" +
                    (navigator.javaEnabled &&
                    navigator.javaEnabled()
                      ? "Y"
                      : "N");

                  topR +=
                    "&wh=" +
                    screen.width +
                    "x" +
                    screen.height +
                    "&px=" +
                    (screen.colorDepth || screen.pixelDepth || 0);

                  var topRat =
                    "&col=340F6E&t=ffffff&p=BD6F6F";

                  topR += "&js=" + topJs;

                  var counterImage =
                    document.createElement("img");

                  counterImage.src =
                    "https://cnt0.www.uz/counter/collect?" +
                    topR +
                    topRat;

                  counterImage.width = 0;
                  counterImage.height = 0;
                  counterImage.alt = "";
                  counterImage.style.display = "none";

                  document.body.appendChild(counterImage);
                }

                if (document.readyState === "loading") {
                  document.addEventListener(
                    "DOMContentLoaded",
                    sendCounter
                  );
                } else {
                  sendCounter();
                }
              })();
            `}
          </Script>
        </Head>

        <body>
          <noscript>
            <img
              src="https://cnt0.www.uz/counter/collect?id=47002&pg=https%3A%2F%2Fagrosoft.uz&col=340F6E&t=ffffff&p=BD6F6F"
              alt=""
              width="0"
              height="0"
              style={{ display: "none" }}
            />
          </noscript>

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}