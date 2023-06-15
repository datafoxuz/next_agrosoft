import articlesImage from "@/assets/images/articles.png";
import communityImage from "@/assets/images/community.png";
import diseasesImage from "@/assets/images/diseases.png";
import marketImage from "@/assets/images/market.png";

import { card, cardTypes } from "./interfaces";

export const baseUrl = "https://api.agrosoft.uz/api/v1/site";

export const MOTION_CONFIGS = {
  layout: true,
  animate: { opacity: 1, y: "10px" },
  initial: { opacity: 0, y: "40px" },
  exit: { y: 0, opacity: 0 },
};

export const SORT_MOTION_CONFIGS = {
  layout: true,
  animate: { opacity: 1, y: "60%" },
  initial: { opacity: 0, y: "90%" },
  exit: { y: 0, opacity: 0 },
};

export const cardsForExample: card[] = [
  {
    image: articlesImage,
    title:
      "What is the difference between displacement capacity and CC of a farm tractor?",
    url: "/",
    commentsNum: "5",
    date: "3.06.2022",
    answered: true,
    id: 2,
    slug: "",
    created_at: "",
  },
  {
    image: communityImage,
    title: "Why is a three-point hitch important in a farm tractor?",
    url: "/",
    commentsNum: "15",
    date: "3.06.2022",
    answered: false,
    id: 2,
    slug: "",
    created_at: "",
  },
  {
    image: diseasesImage,
    title: "Which fruit farming is the most profitable in India?",
    url: "/",
    commentsNum: "5",
    date: "31.06.2022",
    answered: false,
    id: 1,
    slug: "",
    created_at: "",
  },
  {
    image: marketImage,
    title:
      "What is the need of government subsidy in the Indian farming sector?",
    url: "/",
    commentsNum: "5",
    date: "3.06.2022",
    answered: true,
    id: 2,
    slug: "",
    created_at: "",
  },
  {
    image: articlesImage,
    title:
      "What is the difference between displacement capacity and CC of a farm tractor?",
    url: "/",
    commentsNum: "5",
    date: "3.06.2022",
    answered: true,
    id: 2,
    slug: "",
    created_at: "",
  },
];

export const weatherDataExample = [
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

export const regions = [
  {
    name: "Tashkent",
    districts: [
      { districtName: "Yangiyul", lang: 3245436654, lat: 34534 },
      { districtName: "Chirchiq", lang: 3245436654, lat: 34534 },
    ],
  },
  {
    name: "Samarqand",
    districts: [
      { districtName: "Urgut", lang: 3245436654, lat: 34534 },
      { districtName: "Kitob", lang: 3245436654, lat: 34534 },
    ],
  },
  {
    name: "Navoiy",
    districts: [
      { districtName: "Qiziltepa", lang: 3245436654, lat: 34534 },
      { districtName: "Chirchiq", lang: 3245436654, lat: 34534 },
    ],
  },
];
