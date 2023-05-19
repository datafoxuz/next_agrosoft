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

export interface card {
  id: number;
  title: string;
  slug: string;
  image?: StaticImageData;
  images?: StaticImageData[];
  created_at: string;
  body?: string;
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
