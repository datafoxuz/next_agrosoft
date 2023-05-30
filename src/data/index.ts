import articlesImage from "@/assets/images/articles.png";
import communityImage from "@/assets/images/community.png";
import diseasesImage from "@/assets/images/diseases.png";
import marketImage from "@/assets/images/market.png";

import articles from "@/assets/images/articles.png";
import community from "@/assets/images/community.png";
import diseases from "@/assets/images/diseases.png";
import market from "@/assets/images/market.png";

import { cardTypes } from "./interfaces";

export const baseUrl = "https://agrosoft.uz/api/v1/site";

export const MOTION_CONFIGS = {
  layout: true,
  animate: { opacity: 1, y: "10px" },
  initial: { opacity: 0, y: "40px" },
  exit: { y: 0, opacity: 0 },
};

export const cardsForExample: cardTypes[] = [
  {
    image: articlesImage,
    title:
      "What is the difference between displacement capacity and CC of a farm tractor?",
    url: "/",
    commentsNum: "5",
    date: "3.06.2022",
    answered: true,
  },
  {
    image: communityImage,
    title: "Why is a three-point hitch important in a farm tractor?",
    url: "/",
    commentsNum: "15",
    date: "3.06.2022",
    answered: false,
  },
  {
    image: diseasesImage,
    title: "Which fruit farming is the most profitable in India?",
    url: "/",
    commentsNum: "5",
    date: "31.06.2022",
    answered: false,
  },
  {
    image: marketImage,
    title:
      "What is the need of government subsidy in the Indian farming sector?",
    url: "/",
    commentsNum: "5",
    date: "3.06.2022",
    answered: true,
  },
  {
    image: articlesImage,
    title:
      "What is the difference between displacement capacity and CC of a farm tractor?",
    url: "/",
    commentsNum: "5",
    date: "3.06.2022",
    answered: true,
  },
];

export const topcards: cardTypes[] = [
  {
    url: "/blogs",
    image: articles,
    title: "Agro maqolalar",
    location: "Bukhara, Uzbekistan",
    price: "0.99 - 5.9",
  },
  {
    url: "/community",
    image: community,
    title: "Agro jamiyat",
  },
  {
    url: "/diseases",
    image: diseases,
    title: "Agrokasalliklar",
  },
  {
    url: "/market",
    image: market,
    title: "Agromarket",
  },
];

export const weatherData = [
  {
    time: "00:00",
    gradus: "5°",
  },
  {
    time: "00:00",
    gradus: "5°",
  },
  {
    time: "00:00",
    gradus: "5°",
  },
  {
    time: "00:00",
    gradus: "5°",
  },
  {
    time: "00:00",
    gradus: "5°",
  },
  {
    time: "00:00",
    gradus: "5°",
  },
  {
    time: "00:00",
    gradus: "5°",
  },
  {
    time: "00:00",
    gradus: "5°",
  },
  {
    time: "00:00",
    gradus: "5°",
  },
];
