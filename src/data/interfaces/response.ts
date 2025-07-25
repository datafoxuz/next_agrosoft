import { card } from "./card";

export interface responseData {
  success?: boolean;
  status: number;
  data: card;
  message?: string;
  similar: [];
  seo: {
    author: string;
    description: string;
    image: string;
    robots: string;
    title: string;
  };
}
