import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import { usePageContext } from "vike-react/usePageContext";
import { useEffect, useState, useRef } from "react";

import type { ComparisonResponse, PageData } from "./types";
import { useLazyGetComparePagesQuery } from "../../../../store/api/mangaApi";
import { closeCompare, updateFetching, closeScreen } from "../../../../store/slices/pageMenu";
import { setLastChapter } from "../../../../store/slices/maxNextChapter";
import { ImgComparisonSlider } from '@img-comparison-slider/react';
import { getLoading, subscribe } from "../../../../hooks/loadingState";
import { toggleJumpTo } from "../../../../store/slices/jumpToChapter";
import type { customPageContext } from "../../../+onCreatePageContext";
import { useMediaQuery } from "../../../../hooks/mediaQuery";

import ScalePage from "./sections/ScalePage";
import NavMenu from "./sections/NavMenu";
import ProgressBar from "./sections/ProgressBar";

import { useData } from "vike-react/useData";
import type { Data } from "./+data";


export default function Page() {
    const dispatch = useAppDispatch()
    const isLG = useMediaQuery();

    const [loading, setLoadingState] = useState(getLoading())

    const { pages, maxNext } = useData<Data>()

    const comparePages = useAppSelector((state) => state.pageMenu.value.compare)
    const screenAdjustPage = useAppSelector((state) => state.screenAdjustPage.value)

    const [comparePagesList, setComparePagesList] = useState<ComparisonResponse | null>()

    const { bunkoban, currentChapter } = usePageContext() as customPageContext

    useEffect(() => {
        dispatch(toggleJumpTo(false))
        dispatch(setLastChapter(maxNext))
        return subscribe(setLoadingState)
    }, [])


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
            {isLG &&
                <ScalePage />
            }
            <NavMenu />
            <ProgressBar />
            <div className={`bg-white md:bg-yamier flex flex-wrap md:justify-center md:items-center
                ${isLG ? "md:flex-col" : ""}
                `}>
                {pages.map((page: PageData) => {

                    if (!comparePages || !comparePagesList || (comparePages && comparePagesList && !page.content)) {
                        // for double pages
                        page.double ? i = -i : Math.abs(i)
                        const order = page.double ? page.number - i : page.number
                        return (
                            <div key={`list-${page.number}`} style={{ order: order }}
                                className={`
                                ${result.isFetching || loading ? "blur-sm" : ""}
                                ${page.double ? "basis-1/2" : ""}
                                `}>

                                <img className={`
                                    ${isLG && screenAdjustPage ? "h-screen" : ""}
                                    border-b-2 border-dotted border-link
                                `} src={page.link} />
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
    const first = useRef<HTMLImageElement | null>(null)
    const second = useRef<HTMLImageElement | null>(null)
    const isLG = useMediaQuery();
    const screenAdjustPage = useAppSelector((state) => state.screenAdjustPage.value)

    useEffect(() => {
        if (first.current && second.current) {
            const max = Math.max(first.current.height, second.current.height)
            first.current.style.height = `${max}px`
            second.current.style.height = `${max}px`
        }
    }, [first.current, second.current])


    return (

        <div style={{ order: page.number }} className="basis-full slider-wrapper">
            <ImgComparisonSlider className="coloured-slider">
                <img ref={first} slot="first" src={page.link} className={`${isLG && screenAdjustPage ? "max-h-screen" : "" }`} />
                <img ref={second} slot="second" className={`${isLG && screenAdjustPage ? "max-h-screen" : "" }`} src={comparePages ? comparePages[i - 1]?.link : ""} />
                <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
                    <path d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" stroke-width="1" vector-effect="non-scaling-stroke"></path>
                </svg>
            </ImgComparisonSlider>
        </div>
    )
}