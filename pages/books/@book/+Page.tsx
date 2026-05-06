import { useData } from "vike-react/useData";
import type { Data } from "./+data";
import { useScrollFade } from "../../../hooks/scrollFade";
import { useOutsideClick } from "../../../hooks/outsideClick";
import { useState, useEffect } from "react";

export default function Page() {

    const { book } = useData<Data>()
    const scroll = useScrollFade()

    const [fadeByClick, setFadeByClick] = useState(false)


    const ref = useOutsideClick(() => {
        setFadeByClick(true)
    });
    
    useEffect(() => {
        if (fadeByClick) {
            setFadeByClick(false)
        }
    }, [scroll])

    return (
        <>
            <div ref={ref} className={`fixed inset bg-yamier w-full py-3 px-2
            transition-opacity ease-in-out duration-500
            ${(fadeByClick && !scroll)|| (scroll && !fadeByClick) ? "opacity-100" : "opacity-0"}    
            `}>
                <div className="collapse collapse-arrow border-dotted border-link outline-none border">
                    <input type="checkbox" />
                    <div className="collapse-title font-semibold tracking-wide flex justify-center">
                        {book.short}
                    </div>
                    <div className="collapse-content text-md flex flex-col opacity-80">
                        <small className="mb-1">
                            {"[ "}{book.type}{" ]"}
                        </small>
                        <span className="mb-2 font-bold">
                            {book.title}
                        </span>
                        <span className="mb-2">
                             {book.jpn} {"("}{book.year}{")"}
                        </span>
                        <div className="flex flex-row justify-between mt-3">
                        <div className="flex flex-col">
                            <small>Publisher </small> 
                           
                            {book.publisher}
                        </div>
                        {book.author &&
                        <div className="flex flex-col items-end">
                            <small>Author </small> 
                           
                            {book.author}
                        </div>
                        }
                        </div>
                    </div>
                </div>
            </div>
            {book.pages.map((page) => {

                return (
                    <img
                        key={page.number}
                        src={page.full_link} />
                )
            })}
        </>
    )
}