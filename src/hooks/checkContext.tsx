import { useContext } from "react";
import { SetContext } from "../context/context";

export const useMyContext = () => {
  const context = useContext(SetContext);
  if (!context) {
    throw new Error("Error context");
  }
  return context;
};
