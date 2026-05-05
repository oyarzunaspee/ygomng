import { useState, useEffect } from "react";
import useDetectScroll from "@smakss/react-scroll-direction";

export const useScrollFade = () => {
    const {scrollDir, scrollPosition} = useDetectScroll();
    const [scroll, setScroll] = useState<boolean>(false);

    useEffect(() => {
    if (scrollDir == "up" || scrollPosition.bottom < window.innerHeight) {
      setScroll(true);
    } else if (scrollDir == "down" && scrollPosition.bottom > window.innerHeight) {
      setScroll(false);
    }
  }, [scrollDir, scrollPosition.bottom]);
  
    return scroll;
  };