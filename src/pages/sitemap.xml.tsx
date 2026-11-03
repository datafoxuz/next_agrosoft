import type { GetServerSideProps } from "next";
import { request } from "@/lib/request";

const SITE_URL = "https://agrosoft.uz";
const LOCALES = ["uz", "ru", "en"] as const;
type Locale = (typeof LOCALES)[number];

type Entry = {
  /** path without locale, e.g. "/blogs/my-post" */
  paths: Partial<Record<Locale, string>>;
  changefreq: "daily" | "weekly" | "monthly";
  priority: number;
};

const STATIC_PAGES: { path: string; changefreq: Entry["changefreq"]; priority: number }[] = [
  { path: "", changefreq: "daily", priority: 1.0 },
  { path: "/blogs", changefreq: "daily", priority: 0.9 },
  { path: "/deceases", changefreq: "weekly", priority: 0.9 },
  { path: "/community", changefreq: "daily", priority: 0.8 },
  { path: "/market", changefreq: "daily", priority: 0.7 },
  { path: "/news", changefreq: "daily", priority: 0.7 },
  { path: "/weather", changefreq: "daily", priority: 0.6 },
  { path: "/about", changefreq: "monthly", priority: 0.4 },
];

/** Content lists: API path, response key, URL prefix. */
const DYNAMIC: {
  api: string;
  key: string;
  prefix: string;
  changefreq: Entry["changefreq"];
  priority: number;
}[] = [
  { api: "/blogs/blogs-with-pagination?perPage=1000", key: "blogs", prefix: "/blogs", changefreq: "weekly", priority: 0.8 },
  { api: "/deceases/get-deceases?perPage=1000", key: "deceases", prefix: "/deceases", changefreq: "monthly", priority: 0.8 },
  { api: "/community/index?perPage=1000", key: "problems", prefix: "/community", changefreq: "weekly", priority: 0.6 },
  { api: "/articles/articles-with-pagination?perPage=1000", key: "articles", prefix: "/news", changefreq: "weekly", priority: 0.6 },
  { api: "/marketplace/categories?perPage=100", key: "categories", prefix: "/market", changefreq: "daily", priority: 0.5 },
];

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function url(locale: Locale, path: string) {
  // Encode non-ASCII slug characters (e.g. o‘g‘itlar).
  return `${SITE_URL}/${locale}${path
    .split("/")
    .map((p) => encodeURIComponent(decodeURIComponent(p)))
    .join("/")}`;
}

async function loadDynamic(): Promise<Entry[]> {
  const entries: Entry[] = [];
  for (const d of DYNAMIC) {
    const byId = new Map<string, Entry>();
    await Promise.all(
      LOCALES.map(async (locale) => {
        try {
          const res = await request(d.api, "GET", null, { locale });
          const items: { id?: number | string; slug?: string; title?: string; name?: string }[] =
            res?.data?.data?.[d.key] ?? [];
          for (const it of items) {
            const slug = (it.slug || "").trim();
            const title = (it.title || it.name || "").trim();
            if (!slug || !title) continue; // skip empty/garbage records
            const id = String(it.id ?? slug);
            const entry =
              byId.get(id) ?? { paths: {}, changefreq: d.changefreq, priority: d.priority };
            entry.paths[locale] = `${d.prefix}/${slug}`;
            byId.set(id, entry);
          }
        } catch {
          // API unavailable for this locale: skip
        }
      })
    );
    entries.push(...Array.from(byId.values()));
  }
  return entries;
}

function render(entries: Entry[]): string {
  const today = new Date().toISOString().slice(0, 10);
  const urls = entries.flatMap((e) =>
    (Object.keys(e.paths) as Locale[]).map((locale) => {
      const alternates = (Object.keys(e.paths) as Locale[])
        .map(
          (l) =>
            `    <xhtml:link rel="alternate" hreflang="${l}" href="${esc(url(l, e.paths[l]!))}"/>`
        )
        .join("\n");
      const xDefault = e.paths.uz
        ? `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${esc(url("uz", e.paths.uz))}"/>`
        : "";
      return `  <url>
    <loc>${esc(url(locale, e.paths[locale]!))}</loc>
${alternates}${xDefault}
    <lastmod>${today}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority.toFixed(1)}</priority>
  </url>`;
    })
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const staticEntries: Entry[] = STATIC_PAGES.map((p) => ({
    paths: { uz: p.path, ru: p.path, en: p.path },
    changefreq: p.changefreq,
    priority: p.priority,
  }));
  const entries = [...staticEntries, ...(await loadDynamic())];

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.write(render(entries));
  res.end();
  return { props: {} };
};

export default function Sitemap() {
  return null;
}
