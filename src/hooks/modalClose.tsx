import { useEffect } from "react";

export const useOutsideClick = (ref: any, btnRef: any, callback: any) => {
  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        !btnRef.current.contains(e.target)
      ) {
        callback();
      }
    };

    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [ref, callback]);
};
