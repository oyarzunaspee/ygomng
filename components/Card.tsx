// external libraries
import { usePageContext } from "vike-react/usePageContext";
import { navigate } from "vike/client/router";

// types
import type { VolumeData } from "../pages/@edition/types";
import type { customPageContext } from "../pages/+onCreatePageContext";

type CardProps = {
    loading: boolean
    clickedChapter: number
    setClickedChapter: React.Dispatch<React.SetStateAction<number>>
}

const Card = ({
    volumes,
    props }: {
        volumes: VolumeData[],
        props: CardProps
    }) => {


    return (


        <div className="md:flex md:flex-wrap">
            {volumes.map((vol) => {
                return (
                    <div key={`volume-card-${vol.counter}`} className="md:basis-1/2">
                        <CardItem
                            volume={vol}
                            chapterRange={[
                                vol.chapters[0].number ?? 0,
                                vol.chapters.at(-1)?.number ?? 0
                            ]}
                            props={props}
                        />
                    </div>
                )
            })}
        </div>
    )
}

const CardItem = ({
    volume,
    chapterRange,
    props }: 
    {volume: VolumeData, chapterRange: [number, number], props: CardProps}) => {

    const { urlParsed, bunkoban } = usePageContext() as customPageContext
        

    return (
        <>
            <div className="flex text-mute flex-col py-5 border-b border-link border-dotted">
                <div className="px-15 py-5">
                    <img src={volume.cover} alt={`Cover of volume ${volume.counter}`} />
                </div>
                <div className="px-5 text-[20px] flex justify-center font-bold mt-2">
                    <h2>
                        {bunkoban ?
                            `Volume ${volume.counter}`
                            :
                            `${volume.counter}. ${volume.title}`
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
                            {volume.chapters?.map((chap) => {
                                const chapterUrl = `${urlParsed.pathnameOriginal}/chapter/${chap.number}`
                                return (
                                    <li key={`chapter-card-${chap.number}`}>
                                        <a
                                            href={chapterUrl}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                props.setClickedChapter(chap.number)
                                                navigate(chapterUrl)
                                            }}
                                            className="py-3 px-10 flex justify-between text-[17px] hover:link hover:text-link not-last:border-b border-dotted border-link">
                                            <span
                                                className="hover:text-link">
                                                {chap.number}. {bunkoban ? chap.jpn : chap.title}
                                            </span>
                                            {props.loading && props.clickedChapter === chap.number &&
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