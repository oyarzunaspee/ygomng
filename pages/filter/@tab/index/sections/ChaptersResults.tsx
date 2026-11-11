import { useData } from "vike-react/useData";
import type { Data } from "../+data";
import { usePageContext } from "vike-react/usePageContext";

const ChaptersResults = () => {
    const { result } = useData<Data>()
    const { routeParams } = usePageContext()
    return (
        <>
        {result.map((chapter) => {
            return (
                <h1 key={chapter.number}>
                    <a href={`/original/chapter/${chapter.number}`}>
                        {chapter.number}. {chapter.title}
                    </a>
                </h1>
            )
        })}
        </>
    )
}

export default ChaptersResults;