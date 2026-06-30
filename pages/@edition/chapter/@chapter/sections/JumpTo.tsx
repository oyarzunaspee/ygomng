import { useLazyGetVolumesQuery } from "../../../../../store/api/mangaApi";
import { useAppSelector, useAppDispatch } from "../../../../../store/hooks";
import { useState, useEffect, MouseEventHandler, useRef } from "react";
import { navigate } from "vike/client/router";
import { usePageContext } from "vike-react/usePageContext";
import type { customPageContext } from "../../../../+onCreatePageContext";
import { useMediaQuery } from "../../../../../hooks/mediaQuery";
import type { VolumeData, ChapterData } from "../../../types";
import { useOutsideClick } from "../../../../../hooks/outsideClick";
import { toggleJumpTo } from "../../../../../store/slices/jumpToChapter";


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
    }, [open])



    const goToChapter = () => {
        const url = `/${bunkoban ? "bunkoban" : "original"}/chapter/${selectedChapter}`
        navigate(url)
    }

    let JumpToComponent = isLG ? Desktop : Mobile

    if (result.isSuccess) {
        return (
            <div className="z-90">
                <JumpToComponent
                    open={open}
                    setSelectedChapter={setSelectedChapter}
                    volumes={result.data.volumes}
                    currentChapter={currentChapter}
                    goToChapter={goToChapter}
                />

            </div>
        )
    }

}

type JumpToProps = {
    open: boolean;
    setSelectedChapter: Function;
    volumes: VolumeData[];
    currentChapter: number;
    goToChapter: MouseEventHandler<HTMLButtonElement>;
}

const Mobile = ({ open, setSelectedChapter, volumes, currentChapter, goToChapter }: JumpToProps) => {
    return (
        <div className={`transition-height duration-600 ease-in-out overflow-hidden
                    ${open ? "max-h-90" : "max-h-0"}
                    w-full join fixed inset z-90`}>
            <select
                onChange={(e) => {
                    setSelectedChapter(Number(e.target.value))
                }}
                className={`select join-item bg-yami w-full rounded-none
                        ${open ? "max-h-90" : "max-h-0"}
                        `}>
                {volumes.map((vol) => {
                    return (
                        <optgroup key={vol.counter} label={`Volume ${vol.counter}`}>
                            {vol.chapters.map((chap) => {
                                return (
                                    <option
                                        key={chap.number}
                                        selected={currentChapter == chap.number ? true : false} value={chap.number}>
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
                        ${open ? "max-h-90" : "max-h-0"}
                        `}
                onClick={goToChapter}
            >
                GO
            </button>

        </div>
    )
}

const Desktop = ({ open, setSelectedChapter, volumes, currentChapter, goToChapter }: JumpToProps) => {
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
        <div className={`fixed left-0 top-0
                transition-width duration-600 ease-in-out
                ${open ? "max-w-500" : "max-w-0 overflow-hidden"}
                `}>
            <div ref={clickRef} className="bg-yami h-screen p-5 overflow-scroll">
                <ul className="">
                    {volumes.map((vol) => {
                        return (
                            <li
                                key={`vol-${vol.counter}`}>
                                <span className="opacity-75">
                                    Volume {vol.counter}
                                </span>
                                <ul>
                                    {vol.chapters.map((chap) => {
                                        return (
                                            <li key={`chap-${chap.number}`} >
                                                {currentChapter == chap.number ?

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