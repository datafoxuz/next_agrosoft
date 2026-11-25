import { pagination, seo } from "@/data/interfaces";
import { ApiResponse } from "./apiResponse";
export interface blog {
  id: number;
  title: string;
  seo: seo;
  slug: string;
  image: string;
  body?: string;
  created_at?: string;
}

export interface blogsData {
  blogs: blog[];
  seo: seo;
  paginator: pagination;
}
export interface singleBlogData {
  /** URL slug per language that has a translation */
  slugs?: Partial<Record<string, string>>;
  blog: blog;
  similar: blog[];
  seo: seo;
  paginator: pagination;
}
export type BlogsApiResponse = ApiResponse<blogsData>;
export type SingleBlogsApiResponse = ApiResponse<singleBlogData>;