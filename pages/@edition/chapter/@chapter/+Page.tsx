import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import { usePageContext } from "vike-react/usePageContext";
import { useEffect, useState, useRef } from "react";

import type { ComparisonResponse, PageData } from "./types";
import { useLazyGetComparePagesQuery } from "../../../../store/api/mangaApi";
import {
    closeCompare,
    updateFetching,
    closeScreen
} from "../../../../store/slices/pageMenu";
import { setLastChapter } from "../../../../store/slices/maxNextChapter";
import { ImgComparisonSlider } from '@img-comparison-slider/react';
import { getLoading, subscribe } from "../../../../hooks/loadingState";
import { toggleJumpTo } from "../../../../store/slices/jumpToChapter";
import type { customPageContext } from "../../../+onCreatePageContext";
import { useMediaQuery } from "../../../../hooks/mediaQuery";

import {
    Comparison,
    ComparisonHandle,
    ComparisonItem,
} from "../../../../components/shadcn/components/ui/comparison";

import ScalePage from "./sections/ScalePage";
import NavMenu from "./sections/NavMenu";
import ProgressBar from "./sections/ProgressBar";

import { useData } from "vike-react/useData";
import type { Data } from "./+data";


export default function Page() {
    const dispatch = useAppDispatch()
    const isLG = useMediaQuery();

    const [loading, setLoadingState] = useState(getLoading())
    const [expandedDoublePages, setExpandedDoublePages] = useState(false)

    const clickedDoublePage = useRef<HTMLDivElement | null>(null);

    const handleClickDoublePage = (e: React.MouseEvent<HTMLDivElement>, double: boolean) => {
        if (double) {
            clickedDoublePage.current = e.currentTarget;
            setExpandedDoublePages(!expandedDoublePages)
            clickedDoublePage.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };


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
        dispatch(updateFetching(result.isFetching))
    }, [result.isLoading])

    useEffect(() => {
        if (comparePages) {
            trigger({ bunkoban: bunkoban, chap_num: currentChapter })
        }
    }, [comparePages])

    useEffect(() => {
        dispatch(closeScreen())
        setComparePagesList(result.data)
    }, [result.isSuccess])



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
                `}>
                {pages.map((page: PageData) => {

                    if (!comparePages || !comparePagesList || (comparePages && comparePagesList && !page.content)) {
                        // for double pages, place second page before first page to accomodate japanese reading order
                        page.double ? i = -i : Math.abs(i)
                        const order = page.double ? page.number - i : page.number
                        const isLeftDoublePage = page.double && i == 1
                        const isRightDoublePage = page.double && i == -1
                        return (
                            <div
                                onClick={(e) => handleClickDoublePage(e, page.double)}
                                key={`list-${page.number}`}
                                style={{ order: order }}
                                className={`
                                ${page.double ? "cursor-pointer" : ""}
                                ${result.isFetching || loading ? "blur-sm" : ""}
                                ${!expandedDoublePages && page.double ? "basis-1/2" : "basis-full justify-center flex"}
                                ${!expandedDoublePages && isLeftDoublePage ? "justify-end flex" : ""}
                                ${!expandedDoublePages && isRightDoublePage ? "justify-start flex" : ""}
                                `}>
                                <img

                                    className={`
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

        <div className="basis-full" style={{ order: page.number }} >
            <div className="lg:flex justify-center">
                <div className={`lg:basis-1/2 ${isLG && screenAdjustPage ? "" : "bg-white"}`}>
                    <Comparison className={`${isLG && screenAdjustPage ? "aspect-4/5" : "aspect-2/3"}`}>
                        <ComparisonItem position="start">
                            <img
                                className={`object-cover 
                                ${isLG && screenAdjustPage ? "h-screen" : "size-full border-b-2 border-dotted border-link"}`}
                                src={page.link}
                            />
                        </ComparisonItem>
                        <ComparisonItem position="end">
                            <img
                                className={`object-cover 
                                
                                ${isLG && screenAdjustPage ? "h-screen" : "size-full border-b-2 border-dotted border-link"}`}
                                src={comparePages ? comparePages[i - 1]?.link : ""}
                            />
                        </ComparisonItem>
                        <ComparisonHandle />
                    </Comparison>
                </div>
            </div>
        </div>

    )
}