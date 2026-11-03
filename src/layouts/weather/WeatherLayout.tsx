import React from "react";
import { LayoutProps } from "../props";

/** Weather data is loaded globally in MainContextProvider. */
const WeatherLayout = ({ children }: LayoutProps) => {
  return <div>{children}</div>;
};

export default WeatherLayout;
