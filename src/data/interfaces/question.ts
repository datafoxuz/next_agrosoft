import { StaticImageData } from "next/image";
import { answerType } from "./answer";

export interface questionType {
  id: number;
  title: string;
  body: string;
  images: StaticImageData[];
  image: StaticImageData;
  answers: answerType[];
  
  author_name: string;
  author_id: number;
  is_answered: boolean;
  answers_count: number;

  created_at: string;
}
export interface questionsType {
  id: number;
  title: string;
  slug: string;
  answers_count: number;
}
