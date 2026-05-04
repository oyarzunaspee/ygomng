import { useState, useEffect } from "react";
import useDetectScroll from "@smakss/react-scroll-direction";

export const useScrollFade = () => {
    const {scrollDir, scrollPosition} = useDetectScroll();
    const [scroll, setScroll] = useState<boolean>(false);
  
    useEffect(() => {
    if ((scrollDir == "up" && scrollPosition.top > window.innerHeight) || (scrollPosition.bottom < 100) ) {
      setScroll(true);
    } else if (scrollDir == "down" || scrollPosition.top < window.innerHeight) {
      setScroll(false);
    }
  }, [scrollDir]);
  
    return scroll;
  };