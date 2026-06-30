import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { toggleScreenAdjustPage } from "../../../../../store/slices/screenAdjustPage";
import { ArrowsPointingInIcon, ArrowsPointingOutIcon } from "@heroicons/react/24/solid";
import { useScrollFade } from "../../../../../hooks/scrollFade";

const ScalePage = () => {
    const dispatch = useAppDispatch()

    const scroll = useScrollFade()
    
    const screenAdjustPage = useAppSelector((state) => state.screenAdjustPage.value)

    let Icon = screenAdjustPage ? ArrowsPointingOutIcon : ArrowsPointingInIcon

    const toggleScreenAdjust = () => {
        dispatch(toggleScreenAdjustPage())
    }

    return (
        <>
            <div className="fixed right-10 top-10">
                <button 
                onClick={toggleScreenAdjust}
                className={`flex items-center text-white/50 hover:text-link hover:bg-link/20 p-2 rounded-md bg-white/20 cursor-pointer
                ${scroll ? "opacity-100" : "opacity-0"}
                transition-opacity ease-in-out duration-500`}>
                    <Icon className="size-6 mr-1" />
                    <span className="">
                        Adjust to {screenAdjustPage ? "default" : "screen"}
                    </span>
                </button>
            </div>
        </>
    )
}

export default ScalePage;