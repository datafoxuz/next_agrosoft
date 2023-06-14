import { StaticImageData } from "next/image";

import uz from "@/assets/icons/uzbekistn.svg";
import ru from "@/assets/icons/russia.svg";
import en from "@/assets/icons/usa.svg";

export type openObjTypes = {
  weatherModal: boolean;
  languagesModal: boolean;
  burgerMenu: boolean;
};

export type routeObj = {
  title: string;
  url: string;
};

type routesType = routeObj[];

export const routes: routesType = [
  {
    title: "Biz haqimizda",
    url: "/about",
  },
  {
    title: "Ob-havo ma’lumotlari",
    url: "/weather",
  },
  {
    title: "Yangiliklar",
    url: "/news",
  },
  {
    title: "Agro jamiyat",
    url: "/community",
  },
  {
    title: "Agro kasallikar",
    url: "/diseases",
  },
  {
    title: "Agro maqolalar",
    url: "/articles",
  },
  {
    title: "Agro market",
    url: "/market",
  },
];

export type languagesObj = {
  title: string;
  config: string;
  icon: StaticImageData;
};

type languagesDataType = languagesObj[];

export const languagesData: languagesDataType = [
  { title: "Uzb", config: "uz", icon: uz },
  { title: "Рус", config: "ru", icon: ru },
  { title: "Eng", config: "en", icon: en },
];
