import { useAppSelector, useAppDispatch } from "../../../../../store/hooks";
import {
    HomeIcon,
    BarsArrowUpIcon,
    ArrowTopRightOnSquareIcon,
    SparklesIcon,
    ArrowPathIcon
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { navigate } from "vike/client/router";
import { usePageContext } from "vike-react/usePageContext";
import { toggleCompare, closeScreen } from "../../../../../store/slices/pageMenu";
import { toggleJumpTo } from "../../../../../store/slices/jumpToChapter";
import type { customPageContext } from "../../../../+onCreatePageContext";
import { useMediaQuery } from "../../../../../hooks/mediaQuery";

import JumpTo from "./JumpTo";


const NavMenu = () => {
    const dispatch = useAppDispatch()

    const openMenu = useAppSelector((state) => state.pageMenu.value.open)
    const openJumpTo = useAppSelector((state) => state.jumpToChapter.value)
    const isFetching = useAppSelector((state) => state.pageMenu.value.isFetching)
    const isLG = useMediaQuery();



    const { urlParsed, bunkoban } = usePageContext() as customPageContext
    const menu = [
        {
            name: "Home",
            tag: "home",
            Icon: HomeIcon,
            onClick: () => {
                navigate("/")
            }
        },
        {
            name: `Compare ${bunkoban ? "Original" : "Bunkoban"} edition`,
            tag: "compare",
            Icon: isFetching ? ArrowPathIcon : SparklesIcon,
            onClick: () => {
                dispatch(toggleCompare())
            }
        },
        {
            name: `Open ${bunkoban ? "Original" : "Bunkoban"} edition in new tab`,
            tag: "open",
            Icon: ArrowTopRightOnSquareIcon,
            onClick: () => {
                const url = bunkoban ? urlParsed.pathnameOriginal.replace("bunkoban", "original") : urlParsed.pathnameOriginal.replace("original", "bunkoban")
                window.open(url, "_blank", "noopener,noreferrer");
            }
        },
        {
            name: "Jump to chapter...",
            tag: "chapter",
            Icon: BarsArrowUpIcon,
            onClick: () => {
                dispatch(closeScreen())
                dispatch(toggleJumpTo(true))
            }
        }
    ]

    useEffect(() => {
        if (openMenu && !isLG) {
            document.body.style.overflow = "hidden"
        } else if (!openMenu && !isLG) {
            document.body.style.overflow = "auto"
        }
    }, [openMenu])

     

    return (
        <>
        {openMenu && !isLG &&
        <div className={`bg-black z-5 w-full h-screen fixed overflow-hidden
            transition-opacity duration-300 ease-in-out
            ${openMenu ? "opacity-75" : "opacity-0"}    
            `}></div>
        }
            
            <JumpTo />
            <div className={`
                fixed bottom-0 md:bottom-31 left-0 flex justify-center w-full z-8`}>
                <div className="md:basis-4/9 lg:basis-1/3 w-full">
                    <div className={`transition-height duration-300 ease-in-out overflow-hidden
                ${openMenu ? "max-h-90 tooltip-tail" : "max-h-0"}
                        bg-yami md:rounded-lg  rounded-t-xl`}>
                        <ul className="mb-20 md:mb-0 px-3 py-5">
                    {menu.map((option, i) => {
                        return (
                            <div 
                            onClick={option.onClick}
                            key={i} className="flex px-5 rounded-lg cursor-pointer py-2 justify-between hover:bg-yamier hover:text-link">
                                <span className="text-[18px]">
                                    {option.name}
                                </span>
                                <option.Icon className={`
                                ${isFetching && option.tag == "compare" ? "animate-spin" : ""}    
                                size-6`} />
                            </div>
                        )
                    })}
                </ul>
                    </div>
                </div>
            </div>

        </>
    )
}

export default NavMenu;