import { pagination } from "./pagination";
import { ApiResponse } from "./apiResponse";
import { seo } from "./seo";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  created_at: string;
  updated_at: string;
}
export interface productsData {
  products: Product[];
  seo: seo
  paginator: pagination;
}


export type ProductsApiResponse = ApiResponse<productsData>;