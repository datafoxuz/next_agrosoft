import Head from "next/head";
import { useRouter } from "next/router";

import { siteConfig } from "@/config/site.config";
import { SeoProps } from "@/layouts/seo/seo.props";


const SITE_URL = "https://agrosoft.uz";
const DEFAULT_LOCALE = "uz";
const SUPPORTED_LOCALES = ["uz", "ru", "en"];

const SEO = ({
  children,
  author = siteConfig.author,
  metaDescription = siteConfig.metaDescription,
  metaKeywords = siteConfig.metaKeywords,
  metaTitle = siteConfig.metaTitle,
}: SeoProps) => {
  const router = useRouter();

  const currentLocale = router.locale || DEFAULT_LOCALE;

  // Удаляем query-параметры и hash.
  let currentPath = router.asPath
    .split("?")[0]
    .split("#")[0];

  // Если язык уже присутствует в asPath, удаляем его.
  currentPath = currentPath.replace(
    /^\/(uz|ru|en)(?=\/|$)/,
    "",
  );

  if (!currentPath || currentPath === "/") {
    currentPath = "";
  } else {
    currentPath = `/${currentPath
      .replace(/^\/+/, "")
      .replace(/\/+$/, "")}`;
  }

  const makeLocalizedUrl = (locale: string) =>
    `${SITE_URL}/${locale}${currentPath}`;

  const canonicalUrl = makeLocalizedUrl(currentLocale);

  const finalTitle =
    metaTitle?.trim() ||
    siteConfig.metaTitle?.trim() ||
    "AgroSoft";

  const finalDescription =
    metaDescription?.trim() ||
    siteConfig.metaDescription?.trim() ||
    "AgroSoft — сельскохозяйственные новости, статьи, болезни растений и консультации специалистов.";

  return (
    <>
      <Head>
        <meta charSet="utf-8" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        <title>{finalTitle}</title>

        <meta
          name="description"
          content={finalDescription}
        />

        {metaKeywords && (
          <meta
            name="keywords"
            content={metaKeywords}
          />
        )}

        <meta name="author" content={author} />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large"
        />

        <meta
          name="yandex-verification"
          content="02886f372b8fcd60"
        />

        {/* Основной адрес текущей страницы */}
        <link
          rel="canonical"
          href={canonicalUrl}
        />

        {/* Языковые версии */}
        {SUPPORTED_LOCALES.map((locale) => (
          <link
            key={locale}
            rel="alternate"
            hrefLang={locale}
            href={makeLocalizedUrl(locale)}
          />
        ))}

        <link
          rel="alternate"
          hrefLang="x-default"
          href={makeLocalizedUrl(DEFAULT_LOCALE)}
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={finalTitle} />
        <meta
          property="og:description"
          content={finalDescription}
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="AgroSoft" />

        <link
          rel="shortcut icon"
          href="/favicon.ico"
          type="image/x-icon"
        />
      </Head>

      {children}
    </>
  );
};

export default SEO;