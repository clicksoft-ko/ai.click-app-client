import { useEffect } from "react";

export const useOutsideClick = (
  refs: React.RefObject<HTMLElement | null>[],
  callback: () => void,
  active: boolean
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (refs.every(ref => !ref.current?.contains(event.target as Node))) {
        callback();
      }
    };

    if (active) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [active, refs, callback]);
};
