import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { siteConfig } from "@/config/site.config";
import { SeoProps } from "./seo.props";

export const SITE_URL = "https://agrosoft.uz";
const DEFAULT_LOCALE = "uz";
const SUPPORTED_LOCALES = ["uz", "ru", "en"];
const OG_LOCALES: Record<string, string> = {
  uz: "uz_UZ",
  ru: "ru_RU",
  en: "en_US",
};
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

/** Plain text from HTML, collapsed whitespace. */
export function toPlainText(value?: string | null): string {
  if (!value) return "";
  return value
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

/**
 * Page head tags. Every tag has a `key`, so when a page and an inner
 * component both render <SEO>, the inner (more specific) one wins
 * instead of producing duplicate description/canonical tags.
 */
const SEO = ({
  children,
  author = siteConfig.author,
  metaDescription,
  metaKeywords,
  metaTitle,
  image,
  type = "website",
  noindex = false,
  jsonLd,
}: SeoProps) => {
  const router = useRouter();
  const { t } = useTranslation("common");

  const currentLocale = router.locale || DEFAULT_LOCALE;

  let currentPath = router.asPath.split("?")[0].split("#")[0];
  currentPath = currentPath.replace(/^\/(uz|ru|en)(?=\/|$)/, "");
  currentPath =
    !currentPath || currentPath === "/"
      ? ""
      : `/${currentPath.replace(/^\/+/, "").replace(/\/+$/, "")}`;

  // Keep ?page=N in canonical so paginated lists are indexed separately.
  const page = Number(router.query.page);
  const pageSuffix = page > 1 ? `?page=${page}` : "";

  const makeLocalizedUrl = (locale: string) =>
    `${SITE_URL}/${locale}${currentPath}${pageSuffix}`;
  const canonicalUrl = makeLocalizedUrl(currentLocale);

  const defaultTitle = t("seo.default.title", { defaultValue: siteConfig.metaTitle });
  const defaultDescription = t("seo.default.description", {
    defaultValue: siteConfig.metaDescription,
  });

  const rawTitle = toPlainText(metaTitle) || defaultTitle;
  const finalTitle = /agrosoft/i.test(rawTitle) ? rawTitle : `${rawTitle} | AgroSoft`;
  const finalDescription = truncate(
    toPlainText(metaDescription) || defaultDescription,
    160
  );
  const finalImage = image || DEFAULT_IMAGE;
  const robots = noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large";

  return (
    <>
      <Head>
        <title key="title">{finalTitle}</title>
        <meta key="description" name="description" content={finalDescription} />
        {metaKeywords ? (
          <meta key="keywords" name="keywords" content={metaKeywords} />
        ) : null}
        {author ? <meta key="author" name="author" content={author} /> : null}
        <meta key="robots" name="robots" content={robots} />

        <link key="canonical" rel="canonical" href={canonicalUrl} />
        {SUPPORTED_LOCALES.map((locale) => (
          <link
            key={`alt-${locale}`}
            rel="alternate"
            hrefLang={locale}
            href={makeLocalizedUrl(locale)}
          />
        ))}
        <link
          key="alt-default"
          rel="alternate"
          hrefLang="x-default"
          href={makeLocalizedUrl(DEFAULT_LOCALE)}
        />

        <meta key="og:type" property="og:type" content={type} />
        <meta key="og:title" property="og:title" content={finalTitle} />
        <meta key="og:description" property="og:description" content={finalDescription} />
        <meta key="og:url" property="og:url" content={canonicalUrl} />
        <meta key="og:image" property="og:image" content={finalImage} />
        <meta key="og:site_name" property="og:site_name" content="AgroSoft" />
        <meta
          key="og:locale"
          property="og:locale"
          content={OG_LOCALES[currentLocale] ?? OG_LOCALES.uz}
        />
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta key="twitter:title" name="twitter:title" content={finalTitle} />
        <meta key="twitter:description" name="twitter:description" content={finalDescription} />
        <meta key="twitter:image" name="twitter:image" content={finalImage} />

        {jsonLd ? (
          <script
            key="jsonld"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        ) : null}
      </Head>

      {children}
    </>
  );
};

export default SEO;
