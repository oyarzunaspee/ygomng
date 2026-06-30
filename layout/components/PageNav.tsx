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


    const baseUrl = urlParsed.pathnameOriginal.split("/").slice(0, -1).join("/")
    const tabs = [
        {
            name: "Prev Chapter",
            tag: "prev",
            Icon: ChevronDoubleLeftIcon,
            link: `${baseUrl}/${currentChapter - 1}`
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
        <div className="flex fixed bottom-0 md:bottom-5 w-full justify-center z-20">
            <div ref={ref} className={`md:basis-1/2 lg:basis-1/3 w-full md:border md:border-dashed py-5 md:border-link md:rounded-lg z-10 bg-yamier text-neutral-content
        ${scroll || openMenu ? "opacity-100" : "opacity-0"}
        transition-opacity ease-in-out duration-500`}>
                <div className="flex justify-center">
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
                                    className="text-link basis-1/3">
                                    <div className="flex justify-center">
                                        <button className="flex cursor-pointer flex-col items-center">
                                            <tab.Icon className="size-[2em] mb-1" />
                                        </button>

                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <a
                                    key={tab.tag}
                                    href={tab.link}
                                    className={`basis-1/3
                   ${(tab.tag == "prev" && !prev) || (tab.tag == "next" && !next) ? " pointer-events-none opacity-50 cursor-not-allowed" : ""}
                  `}>
                                    <div className="flex justify-center">
                                        <button className="flex cursor-pointer flex-col items-center">
                                            <tab.Icon className="size-[1.2em] mb-1" />
                                            <span className="text-sm">
                                                {tab.name}
                                            </span>
                                        </button>

                                    </div>
                                </a>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    )
}

export default PageNav;