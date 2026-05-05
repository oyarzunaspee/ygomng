import { useState, useEffect } from "react";
import useDetectScroll from "@smakss/react-scroll-direction";
import { useAppSelector } from "../store/hooks";

export const useScrollFade = () => {
    const {scrollDir, scrollPosition} = useDetectScroll();
    const [scroll, setScroll] = useState<boolean>(false);

    const comparePages = useAppSelector((state) => state.pageMenu.value.compare)

    useEffect(() => {
      if (comparePages) {
        setScroll(true)
      } else if ((scrollDir == "up" || scrollPosition.bottom < window.innerHeight) && !comparePages) {
        setScroll(true);
      } else if ((scrollDir == "down" && scrollPosition.bottom > window.innerHeight) && !comparePages) {
        setScroll(false);
      }
    }, [scrollDir, scrollPosition.bottom, comparePages]);
  
    return scroll;
  };