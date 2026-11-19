// external librarise
import { usePageContext } from "vike-react/usePageContext";
import { navigate } from "vike/client/router";
// types
import type { VolumeData } from "../pages/@edition/types";
import type { customPageContext } from "../pages/+onCreatePageContext";

type ListProps = {
    loading: boolean,
    clickedChapter: number,
    setClickedChapter: React.Dispatch<React.SetStateAction<number>>
}

const List = ({ volumes, props}: { volumes: VolumeData[], props: ListProps }) => {

    return (
        <>
            <ul className="list-none px-2 py-10 border-yami">
                {volumes.map((vol) => {
                    return (
                        <ListItem
                            key={`volume-list-${vol.counter}`}
                            volume={vol}
                            props={props}
                        />
                    )
                })}
            </ul>
        </>
    )
}

const ListItem = ({ volume, props }: {volume: VolumeData, props: ListProps }) => {
    const { urlParsed, bunkoban } = usePageContext() as customPageContext

    return (
        <div tabIndex={0} className="collapse collapse-arrow text-white cursor-pointer">
            <div className="collapse-title font-semibold">
                Volume {volume.counter}
                <span className="opacity-75">
                    {!bunkoban && `: ${volume.title}`}
                </span>
            </div>
            <div className="collapse-content text-sm">
                <ul>
                    {volume.chapters?.map((chap) => {
                        const chapterUrl = `${urlParsed.pathnameOriginal}/chapter/${chap.number}`
                        return (
                            <li
                                onClick={() => {
                                    props.setClickedChapter(chap.number)
                                    navigate(chapterUrl)
                                }}
                                key={`chapter-list-${chap.number}`}
                                className="cursor-pointer py-3 px-10 flex justify-between text-[15px] hover:link hover:text-link not-last:border-b border-dotted border-link">
                                <span className="hover:text-link">
                                    {chap.number}.
                                    {` ${bunkoban ? chap.jpn : chap.title}`}
                                </span>
                                {props.loading && props.clickedChapter === chap.number &&
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

export default List;