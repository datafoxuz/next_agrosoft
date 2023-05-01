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
    url: "/",
  },
  {
    title: "Ob-havo ma’lumotlari",
    url: "/",
  },
  {
    title: "Yangiliklar",
    url: "/",
  },
  {
    title: "Agro jamiyat",
    url: "/",
  },
  {
    title: "Agro kasallikar",
    url: "/",
  },
  {
    title: "Agro maqolalar",
    url: "/",
  },
  {
    title: "Agro market",
    url: "/",
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
