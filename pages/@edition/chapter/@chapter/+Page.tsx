import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import { usePageContext } from "vike-react/usePageContext";
import { useEffect, useState } from "react";

import type { ComparisonResponse, PageData } from "../../../../store/types";
import { useLazyGetComparePagesQuery } from "../../../../store/api/mangaApi";
import { closeCompare, updateFetching, closeScreen } from "../../../../store/slices/pageMenu";

import type { customPageContext } from "../../../+onCreatePageContext";

import NavMenu from "./sections/NavMenu";
import ProgressBar from "./sections/ProgressBar";

import { useData } from "vike-react/useData";
import type { Data } from "./+data";

export default function Page() {
    const dispatch = useAppDispatch()

    const { pages } = useData<Data>()


    const comparePages = useAppSelector((state) => state.pageMenu.value.compare)

    const [comparePagesList, setComparePagesList] = useState<ComparisonResponse | null>()

    const { bunkoban, currentChapter } = usePageContext() as customPageContext


    useEffect(() => {
        dispatch(closeCompare())
        setComparePagesList(null)
    }, [currentChapter])


    const [trigger, result] = useLazyGetComparePagesQuery();

    useEffect(() => {
        dispatch(closeScreen())
    }, [result.isSuccess])

    useEffect(() => {
        dispatch(updateFetching(result.isFetching))
    }, [result.isFetching])

    useEffect(() => {
        if (comparePages) {
            trigger({ bunkoban: bunkoban, chap_num: currentChapter })
        }
    }, [comparePages])

    useEffect(() => {
        setComparePagesList(result.data)
    }, [result.data])



    // for double pages
    let i = 1
    let j = 0
    return (
        <>
            <NavMenu />
            <ProgressBar />
            <div className="bg-white flex flex-wrap">
                {pages.map((page: PageData) => {

                    if (!comparePages || !comparePagesList || (comparePages && comparePagesList && !page.content)) {
                        // for double pages
                        page.double ? i = -i : Math.abs(i)
                        const order = page.double ? page.number - i : page.number
                        return (
                            <div key={`list-${page.number}`} style={{ order: order }}
                                className={`
                                ${result.isFetching ? "blur-sm" : ""}
                                ${page.double ? "basis-1/2" : ""}
                                `}>
                                <img className="z-70 border-b-2 border-dotted border-link" src={page.link} />
                            </div>
                        )
                    } else if (comparePages && page.content && (comparePagesList && comparePagesList.pages && page.content)) {
                        j++
                        return (
                            <>
                                <PageComparison key={`viewer-${page.number}`} page={page} comparePages={comparePagesList.pages} i={j} />

                            </>

                        )
                    }
                })}
            </div>
        </>
    )
}

const PageComparison = ({ page, comparePages, i }: { page: PageData, comparePages?: Partial<PageData>[], i: number }) => {


    return (

        <div style={{ order: page.number }} className="basis-full">
            {/* <ReactCompareSlider
                handle={<Handle buttonStyle={{
                    backdropFilter: "blur(1px)",
                    WebkitBackdropFilter: "blur(1px)",
                    width: "2.5rem",
                    height: "2.5rem"
                }} />}
                itemOne={<ReactCompareSliderImage onLoad={function UU() { }} src={page.link} alt="Image one" />}
                itemTwo={<ReactCompareSliderImage onLoad={function UU() { }} src={comparePages ? comparePages[i - 1]?.link : ""} alt="Image two" />}
            /> */}
        </div>
    )
}