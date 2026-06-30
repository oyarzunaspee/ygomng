import { usePageContext } from "vike-react/usePageContext";
import { navigate } from "vike/client/router";
import type { VolumeData } from "../pages/@edition/types";
import type { customPageContext } from "../pages/+onCreatePageContext";


const Card = ({
    volumes,
    loading,
    clickedChapter,
    setClickedChapter }: {
        volumes: VolumeData[],
        loading: boolean,
        clickedChapter: number,
        setClickedChapter: Function
    }) => {


    return (


        <div className="md:flex md:flex-wrap">
            {volumes.map((vol) => {
                return (
                    <div key={`card-${vol.counter}`} className="md:basis-1/2">
                        <CardItem
                            counter={vol.counter}
                            title={vol.title}
                            chapters={vol.chapters}
                            chapterRange={[
                                vol.chapters[0].number || 0,
                                vol.chapters.at(-1)?.number || 0
                            ]}
                            cover={vol.cover}
                            loading={loading}
                            clickedChapter={clickedChapter}
                            setClickedChapter={setClickedChapter}
                        />
                    </div>
                )
            })}
        </div>
    )
}

const CardItem = ({
    counter,
    title,
    chapters,
    cover,
    chapterRange,
    loading,
    clickedChapter,
    setClickedChapter }: VolumeData & {
        chapterRange: number[],
        loading: boolean,
        clickedChapter: number,
        setClickedChapter: Function
    }) => {
    const { urlParsed, bunkoban } = usePageContext() as customPageContext


    return (
        <>
            <div className="flex text-mute flex-col py-5 border-b border-link border-dotted">
                <div className="px-15 py-5">
                    <img src={cover} alt="" />
                </div>
                <div className="px-5 text-[20px] flex justify-center font-bold mt-2">
                    <h2>
                        {bunkoban ?
                            `Volume ${counter}`
                            :
                            `${counter}. ${title}`
                        }
                    </h2>
                </div>
                <div tabIndex={0} className="collapse px-5 collapse-arrow cursor-pointer mt-3">
                    <div className="collapse-title font-semibold border-dotted border-link border rounded-md">
                        Chapters
                        <span className="opacity-70 ml-3">
                            {"( "}{chapterRange[0]} - {chapterRange[1]}{" )"}
                        </span>
                    </div>
                    <div className="collapse-content text-sm border-dotted border-link border-b border-x  rounded-b-md">
                        <ul>
                            {chapters?.map((chap) => {
                                return (
                                    <li>
                                        <a
                                            href={`${urlParsed.pathnameOriginal}/chapter/${chap.number}`}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                setClickedChapter(chap.number)
                                                navigate(`${urlParsed.pathnameOriginal}/chapter/${chap.number}`)
                                            }}
                                            key={chap.number}
                                            className="py-3 px-10 flex justify-between text-[17px] hover:link hover:text-link not-last:border-b border-dotted border-link">
                                            <span
                                                className="hover:text-link">
                                                {chap.number}. {bunkoban ? chap.jpn : chap.title}
                                            </span>
                                            {loading && clickedChapter == chap.number &&
                                                <span className="loading loading-spinner loading-xs"></span>
                                            }
                                        </a>

                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Card;