import { MainContext } from "@/context";
import { MainContextType } from "@/data/interfaces";
import React, { useContext, useState } from "react";

export const useMyContext = (): MainContextType => {
  const context = useContext(MainContext);

  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }

  return context;
};
