import { StaticImageData } from "next/image";
import { answerType } from "@/data/interfaces/answer"; // Adjust the import path as necessary
import { seo } from "@/data/interfaces/seo"; // Adjust the import path as necessary

export interface cardTypes {
  image: StaticImageData;
  title: string;
  url: string;
  commentsNum?: string;
  date?: string;
  answered?: boolean;
  location?: string;
  price?: string;
}

export interface card {
  id: number;
  title: string;
  slug: string;
  image?: StaticImageData;
  images?: StaticImageData[];
  created_at: string;
  body?: string;
  seo?: seo;
  date?: string;
  author_name?: string;
  author_phone?: number;
  country_name?: string;
  region_name?: string;
  low_price?: number;
  high_price?: number;
  amount_type_name?: string;
  answers_count?: number;
  is_answered?: number;
  url?: string;
  commentsNum?: string;
  answered?: boolean;
  status: number;
  answers?: {
    data: answerType[];
  };
}
