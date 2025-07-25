
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
  initial: { opacity: 0, y: "70%" },
  exit: { y: 0, opacity: 0 },
};

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
