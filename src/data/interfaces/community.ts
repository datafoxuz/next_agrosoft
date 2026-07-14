import { seo } from "./seo";
import { pagination } from "@/data/interfaces/pagination";
import { ApiResponse } from "./apiResponse";
import { answerType } from "./answer";

export interface communityData {
  problems: communityProblem[];
  seo: seo;
  paginator: pagination;
}
export interface communityProblem {
  id: number;
  title: string;
  slug: string;
  image: string;
  images: string[];
  is_answered: number;
  answers_count: number;
  created_at: string;
}
// --- New: single problem detail, standardized response ---
export interface communityProblemDetail {
    problem: communityProblemInfo;
}

export interface communityProblemInfo {
    id: number;
    title: string;
    body: string;
    images: string[];
    image: string;
    answers: answerType[];
    author_name: string;
    author_id: number;
    is_answered: boolean;
    answers_count: number;
    created_at: string;
}

export type CommunityApiResponse = ApiResponse<communityData>;
export type CommunityDetailApiResponse = ApiResponse<communityProblemDetail>;