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

import JumpTo from "./JumpTo";


const NavMenu = () => {
    const dispatch = useAppDispatch()

    const openMenu = useAppSelector((state) => state.pageMenu.value.open)
    const openJumpTo = useAppSelector((state) => state.jumpToChapter.value)
    const isFetching = useAppSelector((state) => state.pageMenu.value.isFetching)



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
            name: "Jump to chapter...",
            tag: "chapter",
            Icon: BarsArrowUpIcon,
            onClick: () => {
                dispatch(closeScreen())
                dispatch(toggleJumpTo(true))
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
            name: `Compare ${bunkoban ? "Original" : "Bunkoban"} edition`,
            tag: "compare",
            Icon: isFetching ? ArrowPathIcon : SparklesIcon,
            onClick: () => {
                dispatch(toggleCompare())
            }
        }
    ]

    useEffect(() => {
        if (openMenu) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    }, [openMenu])

     

    return (
        <>
        {openMenu &&
        <div className={`bg-black z-5 w-full h-screen fixed overflow-hidden
            transition-opacity duration-300 ease-in-out
            ${openMenu ? "opacity-75" : "opacity-0"}    
            `}></div>
        }
            
            <JumpTo />
            <div className={`           
                    ${openMenu ? "max-h-90" : "max-h-0"}
                    transition-height duration-300 ease-in-out
                    fixed z-6 bottom-0 w-full left-0 bg-yami rounded-t-xl overflow-hidden
                    `}>
                <ul className="mb-15 px-3 py-5">
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

        </>
    )
}

export default NavMenu;