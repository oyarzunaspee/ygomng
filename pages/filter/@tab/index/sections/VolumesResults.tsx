import { useData } from "vike-react/useData";
import type { Data } from "../+data";
import Card from "../../../../../components/Card";
import { getLoading } from "../../../../../hooks/loadingState";
import { useState, useEffect } from "react";

const VolumesResults = () => {
    const { result } = useData<Data>()

    const [loading, setLoadingState] = useState(getLoading())
    const [clickedChapter, setClickedChapter] = useState(0)

    useEffect(() => {
        if (!loading) {
            setClickedChapter(0)
        }
    }, [loading])

    return (
        <>
            <Card
                volumes={result.volumes}
                loading={loading}
                clickedChapter={clickedChapter}
                setClickedChapter={setClickedChapter}
            />
        </>
    )
}

export default VolumesResults;