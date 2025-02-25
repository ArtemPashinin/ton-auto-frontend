import { useEffect } from "react";

export const useOverflowHidden = (isActive: boolean) => {
  useEffect(() => {
    const htmlElement = document.documentElement;

    if (isActive) {
      htmlElement.classList.add("no-scroll");
    } else {
      htmlElement.classList.remove("no-scroll");
    }

    return () => {
      htmlElement.classList.add("no-scroll");
    };
  }, [isActive]);
};
