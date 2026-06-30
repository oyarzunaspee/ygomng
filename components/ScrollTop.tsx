import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import useDetectScroll from "@smakss/react-scroll-direction";

const ScrollTop = () => {
    const {scrollDir, scrollPosition} = useDetectScroll();
    const [scroll, setScroll] = useState<boolean>(false);
    
    useEffect(() => {
        if (scrollDir == "up" && scrollPosition.top > window.innerHeight) {
            setScroll(true);
        } else if (scrollDir == "down" || scrollPosition.top < window.innerHeight) {
            setScroll(false);
        }
    }, [scrollDir]);


    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };
    return (
        <div className={`overflow-hidden transition-height z-5 ease-in-out duration-500 fixed bottom-5 right-5 md:right-15 lg:right-35
                        ${scroll ? "h-35" : "h-0"}
                        `}>
            <button onClick={() => scrollToTop()} className="cursor-pointer z-5">

                <ArrowUpCircleIcon className="size-15 rounded-full text-link bg-yami z-5" />
            </button>
        </div>
    )
};

export default ScrollTop;