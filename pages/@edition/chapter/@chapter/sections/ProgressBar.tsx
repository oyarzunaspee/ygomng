import { useState, useRef, useEffect } from "react";

const ProgressBar = () => {
    const [progress, setProgress] = useState(0);
    const ref = useRef<HTMLInputElement>(null);

    const handleScroll = () => {
        const currentScroll = window.scrollY;
        const fullScroll = document.documentElement.scrollHeight - window.innerHeight;

        const percentage = Math.min(100, (currentScroll / fullScroll) * 100);
        setProgress(percentage);
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (ref.current) {ref.current.style.width = `${progress}%`}
        
    }, [progress])

    return (
        <>
            <div
                ref={ref}
                className={`z-80
                ${progress == 100 ? "" : "rounded-r"}
                bg-linear-to-r from-fromgrad to-tograd h-3 fixed top-0 left-0
                transition-width duration-100 ease-in-out
                `}
            >
            </div>
        </>
    )
};

export default ProgressBar;