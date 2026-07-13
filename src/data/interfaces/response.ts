import { card } from "./card";

export interface ResponseData {
  success: boolean;
  data: {
    problem: card;
  };
  error: string | null;
}