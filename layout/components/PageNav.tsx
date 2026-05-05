import { usePageContext } from "vike-react/usePageContext";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    PlusCircleIcon,
    XCircleIcon
} from "@heroicons/react/24/outline";
import { toggleMenu, toggleCompare, closeScreen } from "../../store/slices/pageMenu";
import { toggleJumpTo } from "../../store/slices/jumpToChapter";
import { useOutsideClick } from "../../hooks/outsideClick";
import { useScrollFade } from "../../hooks/scrollFade";
import type { customPageContext } from "../../pages/+onCreatePageContext";


const PageNav = () => {
    const { 
        urlParsed,
        currentChapter
    } = usePageContext() as customPageContext

    const dispatch = useAppDispatch()

    const comparePages = useAppSelector((state) => state.pageMenu.value.compare)
    const openMenu = useAppSelector((state) => state.pageMenu.value.open)
    const openJumpTo = useAppSelector((state) => state.jumpToChapter.value)
    const maxNextChapter = useAppSelector((state) => state.maxNextChapter.value)
    

    const baseUrl = urlParsed.pathnameOriginal.split("/").slice(0,-1).join("/")
    const tabs = [
        {
            name: "Prev Chapter",
            tag: "prev",
            Icon: ChevronDoubleLeftIcon,
            link: `${baseUrl}$/${currentChapter - 1}`
        },
        {
            name: comparePages ? "Close" : "Menu",
            tag: "menu",
            Icon: comparePages || openMenu || openJumpTo ? XCircleIcon : PlusCircleIcon,
            link: ""
        },
        {
            name: "Next Chapter",
            tag: "next",
            Icon: ChevronDoubleRightIcon,
            link: `${baseUrl}/${currentChapter + 1}`
        }
    ]

    const ref = useOutsideClick(() => {
        dispatch(closeScreen())
    });

    const scroll = useScrollFade()

    const prev = currentChapter > 1
    const next = currentChapter < maxNextChapter
    return (
        <>
        <div ref={ref} className={`dock z-10 bg-yamier text-neutral-content
        ${scroll ? "opacity-100": "opacity-0"}
        transition-opacity ease-in-out duration-500`}>
            {tabs.map((tab) => {
                if (tab.tag == "menu") {
                    return (
                        <div
                            key={tab.tag}
                            onClick={() => {
                                if (comparePages) {
                                    dispatch(toggleCompare())
                                } else if (openJumpTo) {
                                    dispatch(toggleJumpTo(false))
                                } else {
                                    dispatch(toggleMenu())
                                }
                            }}
                            className="text-link">
                            <button className="flex cursor-pointer flex-col items-center">
                                <tab.Icon className="size-[2em] mb-1" />
                            </button>
                        </div>
                    )
                } else {
                    return (
                        <a
                        key={tab.tag} 
                        href={tab.link} 
                        className={`
                   ${(tab.tag == "prev" && !prev) || (tab.tag == "next" && !next) ? " pointer-events-none opacity-50 cursor-not-allowed" : ""}
                  `}>
                            <button className="flex cursor-pointer flex-col items-center">
                                <tab.Icon className="size-[1.2em] mb-1" />
                                <span className="dock-label">
                                    {tab.name}
                                </span>
                            </button>
                        </a>
                    )
                }
            })}
            </div>
        </>
    )
}

export default PageNav;