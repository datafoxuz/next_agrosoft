
import { seo } from "./seo";
import { pagination } from "@/data/interfaces/pagination";
import { ApiResponse } from "./apiResponse";

export interface communityProblem {
  id: number;
  title: string;
  slug: string;
  image: string;
  is_answered: number;
  answers_count: number;
  created_at: string;
}

export interface communityData {
  problems: communityProblem[];
  seo: seo & { keyword: string; descriptions: string };
  paginator: pagination;
}

export type CommunityApiResponse = ApiResponse<communityData>;
