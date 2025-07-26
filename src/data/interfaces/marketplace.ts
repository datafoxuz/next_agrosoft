import { pagination, seo } from "@/data/interfaces";
import { ApiResponse } from "./apiResponse";
export interface marketplaceCategory {
    id: number;
    title: string;
    
}

export interface marketplaceCategoryData {
  categories: marketplaceCategory[];
  seo: seo;
  paginator: pagination;
}
export type MarketplaceCategoryApiResponse = ApiResponse<marketplaceCategoryData>;