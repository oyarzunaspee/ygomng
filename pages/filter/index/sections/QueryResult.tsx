import type { ResultType, FilterParams, TabType } from "../../types"
import VolumeResult from "./results/VolumeResult"
import ChapterResult from "./results/ChapterResult"
import PageResult from "./results/PageResult"
import { useState, useEffect } from "react"
import type { VolumeData } from "../../../@edition/types"


interface ResultProps {
    isError: boolean
    isLoading: boolean
    isSuccess: boolean
    originalArgs: FilterParams | void
    data: ResultType | null
}

const QueryResult = ({ isError, isLoading, isSuccess, data, originalArgs }: ResultProps) => {


    if (isLoading) {
        return (
            <div className="p-5">
                <div className="w-full animate-pulse rounded-lg border-dotted border-link border p-5">
                    <div className="flex  space-x-4">
                        <div className="flex-1 space-y-6 py-1">
                            <div className="h-2 rounded bg-link opacity-50"></div>
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-2 h-2 rounded bg-link opacity-30"></div>
                                    <div className="col-span-1 h-2 rounded bg-link opacity-30"></div>
                                </div>
                                <div className="h-2 rounded bg-link opacity-50"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    if (!isSuccess || !data) return null;

    if (originalArgs) {
        switch (originalArgs.tab) {
            case "volumes":
                return (
                    <VolumeResult data={data.results as VolumeData[]} />
                )
                break
            case "chapters":
                return (
                    <ChapterResult data={data?.results} />
                )
                break
            case "pages":
                return (
                    <PageResult data={data?.results} />
                )
                break
            default:
                return null;
        }

    }




}

export default QueryResult;