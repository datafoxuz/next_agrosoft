
import {pagination, seo} from "@/data/interfaces" 
import { ApiResponse } from "./apiResponse";

export interface deceasesData {
  deceases: deceaseItem[];
  seo: seo;
  paginator: pagination;
}

export interface deceaseItem {
    id: number;
    title: string;
    seo: seo;
    slug: string;
    image: string;
}
export type DeceasesApiResponse = ApiResponse<deceasesData>;