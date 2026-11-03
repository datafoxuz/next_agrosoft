import { ApiResponse } from "./apiResponse";

export interface region {
    id: number;
    name: string;
}
export interface regionsData {
    regions: region[];
}

export type RegionsApiResponse = ApiResponse<regionsData>;
