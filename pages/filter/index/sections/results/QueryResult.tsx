import type { ResultType, FilterParams } from "../../../types"

interface ResultProps {
    isError: boolean
    isLoading: boolean
    isSuccess: boolean
    data?: ResultType | void
    originalArgs?: FilterParams
}

const QueryResult = ({isError, isLoading, isSuccess, data, originalArgs}: ResultProps) => {

    return (
        <>
        aa
        </>
    )
}

export default QueryResult;