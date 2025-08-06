import { seo,pagination } from "@/data/interfaces";
import { ApiResponse } from "./apiResponse";

export interface article {
    id: number;
    title: string;
    seo: seo;
    slug: string;
    image: string;
    created_at: string;
    is_published: boolean;
    is_featured: boolean;
    description: string;
}
export interface articleData {
  articles: article[];
  seo: seo;
  paginator: pagination;
}
export interface singleArticleData {
  article: article;
  similar: article[];
  seo: seo;
}
export type ArticlesApiResponse = ApiResponse<articleData>;
export type SingleArticlesApiResponse = ApiResponse<singleArticleData>;