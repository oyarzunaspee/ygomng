import { usePageContext } from "vike-react/usePageContext";
import type { customPageContext } from "../../pages/+onCreatePageContext";
import {
    BookOpenIcon,
    HomeIcon,
    MagnifyingGlassCircleIcon
} from "@heroicons/react/24/outline";
import { useScrollFade } from "../../hooks/scrollFade";

const RegularNav = () => {
    const { urlParsed, routeParams, fullView, bunkoban } = usePageContext() as customPageContext


    const tabs = [
        {
            "name": "Books",
            "Icon": BookOpenIcon,
            "link": "/books"
        },
        {
            "name": "Manga",
            "Icon": HomeIcon,
            "link": `/${bunkoban ? "bunkoban" : "original"}`
        },
        {
            "name": "Filter",
            "Icon": MagnifyingGlassCircleIcon,
            "link": "/filter"
        }
    ]
    const scroll = useScrollFade()
    return (
        <div className="flex fixed bottom-0 md:bottom-5 w-full justify-center">

            <div className={`z-10 md:basis-1/2 lg:basis-1/3 w-full md:border md:border-dashed md:border-link bg-yamier text-neutral-content py-5 md:rounded-lg
        ${fullView && (scroll ? "opacity-100" : "opacity-0")}
        transition-opacity ease-in-out duration-500`}>
                <div className="flex justify-center">
                    {tabs.map((tab) => {
                        return (
                            <a
                                key={tab.name}
                                href={tab.link}
                                className={`basis-1/3
                    ${urlParsed.pathnameOriginal.startsWith(tab.link) ? "text-link" : ""}
                    `}>
                                <div className="flex justify-around">

                                    <button className="flex cursor-pointer flex-col items-center">
                                        <tab.Icon className="size-[1.2em] mb-1" />
                                        <span className="text-sm">
                                            {tab.name}
                                        </span>
                                    </button>
                                </div>
                            </a>
                        )
                    })}
                </div>
            </div>

        </div>

    )
}

export default RegularNav;