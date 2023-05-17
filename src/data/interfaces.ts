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
  image: StaticImageData;
  created_at: string;
}

export interface siteWayTypes {
  title: string;
  url: string;
}
