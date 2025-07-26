import { ApiResponse } from "./apiResponse";

export interface region {
    name: string;
    lang: string;
    lat: string;
}
export interface regionsData {
    regions: region[];
}

export type RegionsApiResponse = ApiResponse<regionsData>;