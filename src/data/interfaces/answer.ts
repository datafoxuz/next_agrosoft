import { StaticImageData } from "next/image";

export interface answerType {
  created_at: string;
  id: number;
  problem_id: number;
  text: string;
  updated_at: string;
  user_id: number;
  images: StaticImageData[];
}
