import { questionTypes } from "@/data/interfaces";
import { NextRouter } from "next/router";

export function handleClick(
  state: questionTypes | undefined,
  setState: ((v: questionTypes) => void) | undefined
) {
  if (setState && state) {
    setState({
      ...state,
      active: !state.active,
    });
  }
}

export function shortenString(
  str: string | undefined,
  maxLength: number
): string | undefined {
  if (str) {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + "...";
    } else {
      return str;
    }
  }
}

export function handleChange(
  router: NextRouter,
  searchVal: string,
  setSearchVal: (str: string) => void
): void {
  setSearchVal(searchVal);

  if (searchVal.length) {
    if (!router.query.page) {
      router.push(`${router.pathname}?search=${searchVal}`);
    } else {
      router.push(
        `${router.pathname}?page=${router.query.page}&search=${searchVal}`
      );
    }
  } else {
    if (!router.query.page) {
      router.push(`${router.pathname}`);
    } else {
      router.push(`${router.pathname}?page=${router.query.page}`);
    }
  }
}


