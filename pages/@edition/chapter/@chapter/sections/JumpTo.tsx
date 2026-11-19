// external libraries
import {
    useState,
    useEffect,
    MouseEventHandler,
    useRef
} from "react";
import { navigate } from "vike/client/router";
import { usePageContext } from "vike-react/usePageContext";
// redux
import { useAppSelector, useAppDispatch } from "../../../../../store/hooks";
import { useLazyGetVolumesQuery } from "../../../../../store/api/mangaApi";
import { toggleJumpTo } from "../../../../../store/slices/jumpToChapter";
// internal hooks
import { useOutsideClick } from "../../../../../hooks/outsideClick";
import { useMediaQuery } from "../../../../../hooks/mediaQuery";
// types
import type { customPageContext } from "../../../../+onCreatePageContext";
import type { VolumeData } from "../../../types";


const JumpTo = () => {

    const { bunkoban, currentChapter } = usePageContext() as customPageContext
    const isLG = useMediaQuery();


    const open = useAppSelector((state) => state.jumpToChapter.value)

    const [selectedChapter, setSelectedChapter] = useState(currentChapter);

    const [trigger, result] = useLazyGetVolumesQuery()

    useEffect(() => {
        if (open) {
            trigger({ bunkoban })
        }
    }, [currentChapter])



    const goToChapter = () => {
        const url = `/${bunkoban ? "bunkoban" : "original"}/chapter/${selectedChapter}`
        navigate(url)
    }

    const JumpToComponent = isLG ? Desktop : Mobile

    const props = {
        open: open,
        setSelectedChapter: setSelectedChapter,
        volumes: result.data?.volumes,
        currentChapter: currentChapter,
        goToChapter: goToChapter
    }

    return (
        <div className="z-90">
            {result.isSuccess &&
                <JumpToComponent props={props} />
            }
        </div>
    )

}

type JumpToProps = {
    open: boolean;
    setSelectedChapter: React.Dispatch<React.SetStateAction<number>>;
    volumes?: VolumeData[];
    currentChapter: number;
    goToChapter: () => void;
}

const Mobile = ({ props}: {props: JumpToProps}) => {
    return (
        <div className={`transition-height duration-600 ease-in-out overflow-hidden text-white
                    ${props.open ? "max-h-90" : "max-h-0"}
                    w-full join fixed inset z-90`}>
            <select
                onChange={(e) => {
                    props.setSelectedChapter(Number(e.target.value))
                }}
                className={`select join-item bg-yami w-full rounded-none
                        ${props.open ? "max-h-90" : "max-h-0"}
                        `}>
                {props.volumes?.map((vol) => {
                    return (
                        <optgroup key={vol.counter} label={`Volume ${vol.counter}`}>
                            {vol.chapters.map((chap) => {
                                return (
                                    <option
                                        key={`mobile-jump-to-${chap.number}`}
                                        selected={props.currentChapter === chap.number ? true : false} value={chap.number}>
                                        {chap.number}. {chap.title}
                                    </option>
                                )
                            })}
                        </optgroup>
                    )
                })}
            </select>
            <button
                className={`join-item btn bg-link text-yami rounded-none
                        ${props.open ? "max-h-90" : "max-h-0"}
                        `}
                onClick={props.goToChapter}
            >
                GO
            </button>
        </div>
    )
}

const Desktop = ({ props }: {props: JumpToProps}) => {
    const { urlOriginal } = usePageContext()
    const url = urlOriginal.split("/").slice(0, -1).join("/")
    const dispatch = useAppDispatch()
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [])

    const clickRef = useOutsideClick(() => {
        dispatch(toggleJumpTo(false))
    })
    return (
        <div className={`fixed left-0 top-0 text-white
                transition-width duration-600 ease-in-out
                ${props.open ? "max-w-500" : "max-w-0 overflow-hidden"}
                `}>
            <div ref={clickRef} className="bg-yami h-screen p-5 overflow-scroll">
                <ul className="">
                    {props.volumes?.map((vol) => {
                        return (
                            <li
                                key={`vol-${vol.counter}`}>
                                <span className="opacity-75">
                                    Volume {vol.counter}
                                </span>
                                <ul>
                                    {vol.chapters.map((chap) => {
                                        return (
                                            <li key={`desktop-jump-to-${chap.number}`} >
                                                {props.currentChapter === chap.number ?

                                                    <div ref={ref} className="p-2 bg-link text-yami w-full rounded font-bold cursor-default">
                                                        {chap.number}. {chap.title}
                                                    </div>
                                                    :
                                                    <a href={`${url}/${chap.number}`}>
                                                        <div className="p-2 opacity-50 hover:opacity-100 hover:bg-yamier">
                                                            {chap.number}. {chap.title}
                                                        </div>
                                                    </a>
                                                }
                                            </li>
                                        )
                                    })}
                                </ul>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default JumpTo;