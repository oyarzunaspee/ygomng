// external libraries
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import useDetectScroll from "@smakss/react-scroll-direction";

const ScrollTop = () => {
    const { scrollDir, scrollPosition } = useDetectScroll();
    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        setScroll(scrollDir === "up" && scrollPosition.top > window.innerHeight)
    }, [scrollDir]);


    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };
    return (
        <div className={`overflow-hidden transition-height z-5 ease-in-out duration-500 fixed bottom-5 right-5 md:right-15 lg:right-35
                        ${scroll ? "h-35" : "h-0"}
                        `}>
            <button onClick={scrollToTop} className="cursor-pointer" aria-label="Scroll to top">

                <ArrowUpCircleIcon className="size-15 rounded-full text-link bg-yami" />
            </button>
        </div>
    )
};

export default ScrollTop;