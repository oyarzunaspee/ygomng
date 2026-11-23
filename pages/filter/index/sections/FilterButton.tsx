// external libraries
import { usePageContext } from "vike-react/usePageContext";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";
// redux
import { useAppSelector } from "../../../../store/hooks";
import { useLazyGetFilterResultsQuery } from "../../../../store/api/filterApi";
// components
import WarningMessage from "../../../../components/Warning";
// types
import type { UseFormHandleSubmit, FieldErrors } from "react-hook-form";
import type { FormType } from "../../types";

interface Props {
    errors: FieldErrors
    handleSubmit:  UseFormHandleSubmit<FormType>
    trigger: ReturnType<typeof useLazyGetFilterResultsQuery>[0]
}

const FilterButton = ({ handleSubmit, errors, trigger }: Props) => {
    const tabOpen = useAppSelector((state) => state.filterSection.value)
    


    const handleFilter = async (data: FormType) => {
        if (tabOpen && data.saga === null) {
            const url = `${data.bunkoban}`
            window.open(url, "_blank", "noreferrer")
        }

        const fields = Object.keys(data) as (keyof typeof data)[]

        let queries = ""

        fields.map(field => {
            queries += data[field] === null ? "" : `${field}=${data[field]}&`
            
        })

        await trigger({
            tab: tabOpen,
            queryString: queries.slice(0, -1)
        })
       

    }

    return (
        <div className="mt-10 mb-5 px-5">
            <button
                onClick={handleSubmit(handleFilter)}
                className="w-full text-yami shadow-sm cursor-pointer text-lg px-5 py-3 items-center justify-center rounded-md bg-link flex">
                Filter by {tabOpen}
                <MagnifyingGlassCircleIcon className="size-7 ml-2" />
            </button>
            {errors &&
                <div className="mt-1">
                    {Object.keys(errors).map((error) => {
                        const message = errors[error]?.message
                        return (
                            <div key={`error-${error}`} className="mt-3">
                                <WarningMessage message={`${error}: ${message}`} />
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default FilterButton;