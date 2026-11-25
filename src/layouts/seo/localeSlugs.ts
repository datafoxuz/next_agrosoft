import { createContext } from "react";

/**
 * URL slug of the current item per language ({uz, ru, en}), from the API's `slugs`.
 * Detail pages provide it so <SEO> links each language version with its own slug;
 * a language missing here has no translation and points to the Uzbek page.
 */
export const LocaleSlugsContext = createContext<Partial<Record<string, string>> | null>(null);

/** getServerSideProps helper: send /ru/blogs/<uz-slug> to /ru/blogs/<ru-slug>. */
export function slugRedirect(
  section: string,
  locale: string,
  current: string,
  slugs?: Partial<Record<string, string>> | null
) {
  const want = slugs?.[locale];
  if (!want || decodeURIComponent(current) === want) return null;
  return {
    redirect: { destination: `/${locale}/${section}/${encodeURIComponent(want)}`, permanent: true },
  };
}
