import type { StaticImageData } from "next/image";
import defaultCover from "@/assets/images/default_cover.jpg";

/** Branded picture shown wherever a post, disease, question or listing has none. */
export const DEFAULT_COVER: StaticImageData = defaultCover;

/**
 * True when the API gave a usable picture. Items without one used to come as
 * ".../storage/" (the storage folder itself), which rendered as a broken image.
 */
export function hasImage(src: unknown): boolean {
  if (!src) return false;
  if (typeof src !== "string") return true; // imported static image
  const s = src.trim();
  return s !== "" && !/\/storage\/?$/.test(s) && !/\/(null|undefined)$/.test(s);
}

/** The picture, or the default cover. */
export function imageOr<T>(src: T | null | undefined): T | StaticImageData {
  return hasImage(src) ? (src as T) : DEFAULT_COVER;
}
