import { ReactNode } from "react";

export interface SeoProps {
  children?: ReactNode;
  metaTitle?: string | null;
  metaDescription?: string | null;
  author?: string | null;
  metaKeywords?: string | null;
  /** Absolute URL of the share image (og:image). */
  image?: string | null;
  /** "article" for blog/news/disease/question pages. */
  type?: "website" | "article";
  /** Hide private/utility pages (login, account, forms) from search engines. */
  noindex?: boolean;
  /** Optional schema.org JSON-LD object(s). */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}
