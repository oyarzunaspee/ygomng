import { usePageContext } from "vike-react/usePageContext";
import type { customPageContext } from "../../+onCreatePageContext";
import type { VolumeData } from "../../../store/types";

const Listing = ({ volumes }:{volumes: VolumeData[]} ) => {


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
                        />
                    )
                })}
            </ul>
        </>
    )
}

const ListItem = ({ counter, title, chapters }: Partial<VolumeData>) => {
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
                            <li className="py-3 px-10 text-[15px] hover:link hover:text-link not-last:border-b border-dotted border-link">
                                <a href={`${urlParsed.pathnameOriginal}/chapter/${chap.number}`}>
                                    {chap.number}. 
                                    {bunkoban ?
                                    " " + chap.jpn
                                    :
                                    " " + chap.title
                                    }
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Listing;