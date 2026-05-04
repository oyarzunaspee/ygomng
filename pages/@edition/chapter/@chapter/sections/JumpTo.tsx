import { useLazyGetVolumesQuery } from "../../../../../store/api/mangaApi";
import { useAppSelector } from "../../../../../store/hooks";
import { useState, useEffect } from "react";
import { navigate } from "vike/client/router";
import { usePageContext } from "vike-react/usePageContext";
import type { customPageContext } from "../../../../+onCreatePageContext";


const JumpTo = () => {
    const { bunkoban, currentChapter} = usePageContext() as customPageContext


    const open = useAppSelector((state) => state.jumpToChapter.value)

    const [selectedChapter, setSelectedChapter] = useState(currentChapter);

    const [ trigger, result ] = useLazyGetVolumesQuery()

    useEffect(() => {
        if (open) {
            trigger({bunkoban})
        }
    }, [open])



    const goToChapter = () => {
        const url = `/${bunkoban ? "bunkoban" : "original"}/chapters/${selectedChapter}`
        navigate(url)
    }

    if (result.isSuccess) {
        return (
            <>
                <div className={`transition-height duration-600 ease-in-out overflow-hidden
                    ${open ? "max-h-90" : "max-h-0"}
                    w-full join fixed inset z-90`}>
                    <select
                        onChange={(e) => {
                            setSelectedChapter(Number(e.target.value))
                        }}
                        className={`select join-item bg-yami w-full
                        ${open ? "max-h-90" : "max-h-0"}
                        `}>
                        {result.data.volumes.map((vol) => {
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
                    className={`join-item btn bg-link text-yami
                        ${open ? "max-h-90" : "max-h-0"}
                        `}
                        onClick={goToChapter}
                        >
                        GO
                    </button>
    
                </div>
            </>
        )
    }

}

export default JumpTo;