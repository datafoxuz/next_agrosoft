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
}

export interface questionTypes {
  active: boolean;
  title?: string;
  titleFile?: null | StaticImageData;
  desc?: string;
  descFile?: null | StaticImageData;
}
