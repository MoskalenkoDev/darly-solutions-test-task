import { RefObject, useEffect, useRef } from "react";

export const useScroll = <T extends HTMLElement>(
  onScrollCallFunc: (elemRef: RefObject<T>, e: Event) => void
): RefObject<T> => {
  const elemRef = useRef<T>(null);

  const onScrollFunc = (e: Event) => {
    onScrollCallFunc(elemRef, e);
  };

  useEffect(() => {
    if (elemRef.current) {
      let tableElem = elemRef.current;
      tableElem.addEventListener("scroll", onScrollFunc);
      return () => {
        tableElem.removeEventListener("scroll", onScrollFunc);
      };
    }
  }, []);

  return elemRef;
};
