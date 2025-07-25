import { StaticImageData } from "next/image";

export interface seo {
  title: string;
  description: string;
  image?: StaticImageData;
  author: string;
  robots: string;
}
