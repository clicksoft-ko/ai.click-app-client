import { useRef } from "react";

export function useScrollHandler<T extends HTMLElement>() {
  const targetRef = useRef<T>(null);

  function scrollToTop() {
    targetRef.current?.scrollTo({ top: 0 });
  }

  return { targetRef, scrollToTop };
}
