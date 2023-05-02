import { StaticImageData } from "next/image";

export const MOTION_CONFIGS = {
  layout: true,
  animate: { opacity: 1, y: "-100%" },
  initial: { opacity: 0, y: "-80%" },
  exit: { y: 0, opacity: 0 },
};

export interface sitewayProps {
  title: string;
  url: string;
}

export interface cardTypes {
  image: StaticImageData;
  title: string;
  url: string;
}
