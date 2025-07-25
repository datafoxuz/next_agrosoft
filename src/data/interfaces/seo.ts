import { StaticImageData } from "next/image";

export interface seo {
  title: string;
  description: string;
  keyword: string;
  image?: StaticImageData;
  author: string;
  robots: string;
}
