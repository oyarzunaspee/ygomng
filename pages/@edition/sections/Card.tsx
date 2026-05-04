import { usePageContext } from "vike-react/usePageContext";
import type { VolumeData } from "../../../store/types";
import type { customPageContext } from "../../+onCreatePageContext";



const Card = ({ volumes }: { volumes: VolumeData[]}) => {

    return (
        <>
            {volumes.map((vol) => {
                return (
                    <CardItem
                        key={`card-${vol.counter}`}
                        counter={vol.counter}
                        title={vol.title}
                        chapters={vol.chapters}
                        chapterRange={[
                            vol.chapters[0].number || 0,
                            vol.chapters.at(-1)?.number || 0
                        ]}
                        cover={vol.cover}
                    />
                )
            })}
        </>
    )
}

const CardItem = ({ counter, title, chapters, cover, chapterRange }: VolumeData & {chapterRange: number[] }) => {
    const { urlParsed, bunkoban } = usePageContext() as customPageContext


    return (
        <>
            <div className="flex text-mute flex-col py-5 border-b border-link border-dotted">
                <div className="px-15 py-5">
                    <img src={cover} alt="" />
                </div>
                {!bunkoban &&
                    <div className="px-5 text-[20px] flex justify-center font-bold mt-2">
                        <h2>
                            {counter}. {title}
                        </h2>
                    </div>
                }
                <div tabIndex={0} className="collapse px-5 collapse-arrow cursor-pointer">
                    <div className="collapse-title font-semibold">
                        Chapters 
                        <span className="opacity-70 ml-3">
                            {"( "}{chapterRange[0]} - {chapterRange[1]}{" )"} 
                        </span>
                    </div>
                    <div className="collapse-content text-sm">
                        <ul>
                            {chapters?.map((chap) => {
                                return (
                                    <li 
                                    key={chap.number}
                                    className="py-3 px-10 text-[17px] hover:link hover:text-link not-last:border-b border-dotted border-link">
                                        <a href={`${urlParsed.pathnameOriginal}/chapter/${chap.number}`}>
                                            {chap.number}. {bunkoban ? chap.jpn : chap.title}
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