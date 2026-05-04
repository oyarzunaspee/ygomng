import { usePageContext } from "vike-react/usePageContext";
import {
    BookOpenIcon,
    HomeIcon,
    MagnifyingGlassCircleIcon
} from "@heroicons/react/24/outline";

const RegularNav = () => {
    const { urlParsed, routeParams } = usePageContext()
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
    return (
        <>
        <div className="dock z-10 bg-yamier text-neutral-content">
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