import { useData } from "vike-react/useData";
import type { Data } from "./+data";
import { usePageContext } from "vike-react/usePageContext";
import { getLoading, subscribe } from "../../../hooks/loadingState";
import { useState, useEffect } from "react";

export default function Page() {
    const { urlParsed } = usePageContext()
    const { books } = useData<Data>()

    const [loading, setLoadingState] = useState(getLoading())

    useEffect(() => {
        return subscribe(setLoadingState)
      }, [])
    return (
        <>
            <div className="py-10 flex flex-col items-center">
                {books.map((book) => {
                    return (
                        <a key={book._id} className="w-full" href={`${urlParsed.pathnameOriginal}/${book._id}`}>
                            <div className="py-5 flex flex-col items-cente px-15">
                                <div className="relative aspect-2/3 border-link border-3">
                                    <div
                                    style={{ backgroundImage: `url(${book.cover})` }}
                                    className={`${loading ? "opacity-50" : "opacity-100"}
                                    transition-opacity ease-in-out duration-200
                                    bg-cover bg-left h-full w-full`}></div>
                                    <div className="bg-link absolute -top-4 -right-8 py-1 px-2 text-yami rounded">
                                        <small>
                                            {book.type}
                                        </small>
                                    </div>
                                    {loading &&
                                        <span className="loading top-[50%] left-[50%] translate-[-50%] text-link loading-spinner loading-xl absolute"></span>
                                    }

                                </div>
                                <h1 className="text-[20px] font-bold mt-5 text-center">
                                    {book.short}
                                </h1>
                                <small className="opacity-50 text-center">
                                    {book.title}
                                </small>
                            </div>
                        </a>
                    )
                })}

            </div>
        </>
    )
}