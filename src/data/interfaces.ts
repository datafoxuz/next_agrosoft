import { StaticImageData } from "next/image";

export interface sitewayProps {
  title: string;
  url: string;
}

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

export interface questionTypes {
  active: boolean;
  title?: string;
  titleFile?: null | StaticImageData;
  desc?: string;
  descFile?: null | StaticImageData;
}

export interface seo {
  title: string;
  description: string;
  image: StaticImageData;
  author: string;
  robots: string;
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
  date?: "";
  country_name?: string;
  region_name?: string;
}

export interface meta {
  currentPage: number;
  pageCount: number;
  perPage: number;
  totalCount: number;
}

export interface data {
  success: boolean;
  data: card[];
  message: string;
  meta: meta;
}

export interface siteWayTypes {
  title: string;
  url: string;
}
