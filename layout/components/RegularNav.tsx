import { usePageContext } from "vike-react/usePageContext";
import type { customPageContext } from "../../pages/+onCreatePageContext";
import {
    BookOpenIcon,
    HomeIcon,
    MagnifyingGlassCircleIcon
} from "@heroicons/react/24/outline";
import { useScrollFade } from "../../hooks/scrollFade";

const RegularNav = () => {
    const { urlParsed, routeParams, fullView } = usePageContext() as customPageContext
    const bunkoban = routeParams.bunkoban == "bunkoban"

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
        <>
        <div className={`dock z-10 bg-yamier text-neutral-content
        ${fullView && (scroll ? "opacity-100": "opacity-0")}
        transition-opacity ease-in-out duration-500`}>
            {tabs.map((tab) => {
                return (
                    <a 
                    key={tab.name}
                    href={tab.link} 
                    className={`
                    ${urlParsed.pathnameOriginal.startsWith(tab.link) ? "dock-active text-link" : ""}
                    `}>
                        <button className="flex cursor-pointer flex-col items-center">
                            <tab.Icon className="size-[1.2em] mb-1" />
                            <span className="dock-label">
                                {tab.name}
                            </span>
                        </button>
                    </a>
                )
            })}
            </div>
        </>
    )
}

export default RegularNav;