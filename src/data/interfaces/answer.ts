import { StaticImageData } from "next/image";

export interface answerType {
  id: number;
  text: string;
  images: StaticImageData[];
  author_name: string;
  author_id: number;
  created_at: string;
}
