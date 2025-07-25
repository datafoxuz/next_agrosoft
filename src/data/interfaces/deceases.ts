
import {seo} from "@/data/interfaces" 

export interface Deceases {
  deceases: DeceaseItem;
  seo: seo;
}

export interface DeceaseItem {
    id: number;
    title: string;
    seo: seo;
    slug: string;
    image: string;
}