import { ApiResponse } from "./apiResponse";

export interface district {
    name: string;
    /** latitude */
    lat: string;
    /** longitude */
    long: string;
}
export interface districtsData {
    districts: district[];
}

export type DistrictsApiResponse = ApiResponse<districtsData>;
