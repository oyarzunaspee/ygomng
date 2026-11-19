// external libraries
import { ArrowsPointingInIcon, ArrowsPointingOutIcon } from "@heroicons/react/24/solid";
// redux
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { handleToggle } from "../../../../../store/slices/isScreenAdjusted";
// internal hooks
import { useScrollVisibility } from "../../../../../hooks/scrollFade";

const ScalePage = () => {
    const dispatch = useAppDispatch()

    const scroll = useScrollVisibility()
    
    const isScreenAdjusted = useAppSelector((state) => state.isScreenAdjusted.value)

    const Icon = isScreenAdjusted ? ArrowsPointingOutIcon : ArrowsPointingInIcon

    const toggleScreenAdjust = () => {
        dispatch(handleToggle())
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
                        Adjust to {isScreenAdjusted ? "default" : "screen"}
                    </span>
                </button>
            </div>
        </>
    )
}

export default ScalePage;