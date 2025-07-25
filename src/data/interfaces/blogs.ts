import { pagination, seo } from "@/data/interfaces";
import { ApiResponse } from "./apiResponse";
export interface blog {
  id: number;
  title: string;
  seo: seo;
  slug: string;
  image: string;
}

export interface blogsData {
  blogs: blog[];
  seo: seo;
  paginator: pagination;
}
export type BlogsApiResponse = ApiResponse<blogsData>;