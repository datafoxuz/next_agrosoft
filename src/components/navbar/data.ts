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
};

type languagesDataType = languagesObj[];

export const languagesData: languagesDataType = [
  { title: "Uz", config: "uz" },
  { title: "Ru", config: "ru" },
  { title: "En", config: "en" },
];
