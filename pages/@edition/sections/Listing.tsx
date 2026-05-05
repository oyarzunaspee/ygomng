import { usePageContext } from "vike-react/usePageContext";
import type { customPageContext } from "../../+onCreatePageContext";
import type { VolumeData } from "../../../store/types";
import { navigate } from "vike/client/router";

const Listing = ({
    volumes,
    loading,
    clickedChapter,
    setClickedChapter
}: {
    volumes: VolumeData[],
    loading: boolean,
    clickedChapter: number,
    setClickedChapter: Function
}) => {


    return (
        <>
            <ul className="list-none px-2 py-10 border-yami">
                {volumes.map((vol) => {
                    return (
                        <ListItem
                            key={`list-${vol.counter}`}
                            counter={vol.counter}
                            title={vol.title}
                            chapters={vol.chapters}
                            loading={loading}
                            clickedChapter={clickedChapter}
                            setClickedChapter={setClickedChapter}
                        />
                    )
                })}
            </ul>
        </>
    )
}

const ListItem = ({
    counter,
    title,
    chapters,
    loading,
    clickedChapter,
    setClickedChapter
}: Partial<VolumeData> & {
    loading: boolean,
    clickedChapter: number,
    setClickedChapter: Function
}) => {
    const { urlParsed, bunkoban } = usePageContext() as customPageContext

    return (
        <div tabIndex={0} className="collapse collapse-arrow cursor-pointer">
            <div className="collapse-title font-semibold">
                Volume {counter}
                {!bunkoban && `: ${title}`}
            </div>
            <div className="collapse-content text-sm">
                <ul>
                    {chapters?.map((chap) => {
                        return (
                            <li
                                onClick={() => {
                                    setClickedChapter(chap.number)
                                    navigate(`${urlParsed.pathnameOriginal}/chapter/${chap.number}`)
                                }}
                                className="cursor-pointer py-3 px-10 flex justify-between text-[15px] hover:link hover:text-link not-last:border-b border-dotted border-link">
                                <span className="hover:text-link">
                                    {chap.number}.
                                    {bunkoban ?
                                        " " + chap.jpn
                                        :
                                        " " + chap.title
                                    }
                                </span>
                                {loading && clickedChapter == chap.number &&
                                    <span className="loading loading-spinner loading-xs"></span>
                                }
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Listing;