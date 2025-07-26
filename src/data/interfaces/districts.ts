import { ApiResponse } from "./apiResponse";

export interface district {
    name: string;
    lang: string;
    lat: string;
}
export interface districtsData {
    districts: district[];
}

export type DistrictsApiResponse = ApiResponse<districtsData>;