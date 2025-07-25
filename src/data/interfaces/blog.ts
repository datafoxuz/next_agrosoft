import { seo } from "./seo";

export interface blog {
  id: number;
  title: string;
  seo: seo;
  slug: string;
  image: string;
}
