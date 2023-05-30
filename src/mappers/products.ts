import { card } from "@/data/interfaces";

export const productMapper = (data: card) => {
  return {
    author: data.author_name ?? "Aniqlanmagan",
    phone: data.author_phone ?? "Aniqlanmagan",
    country: data.country_name ?? "Uzbekistan",
    region: data.region_name ?? "Aniqlanmagan",
    price: data.high_price ?? "Aniqlanmagan",
  };
};
