
import {pagination, seo} from "@/data/interfaces" 
import { ApiResponse } from "./apiResponse";

export interface deceasesData {
  deceases: deceaseItem[];
  seo: seo;
  paginator: pagination;
}
export interface deceaseData {
  decease: deceaseItem;
  similar: deceaseItem[];
  seo: seo;
}
export interface deceaseItem {
    id: number;
    answers_count: number;
    name: string;
    body: string;
    seo: seo;
    slug: string;
    image: string;
    created_at: string;
}
export type DeceasesApiResponse = ApiResponse<deceasesData>;
export type DeceaseApiResponse = ApiResponse<deceaseData>;