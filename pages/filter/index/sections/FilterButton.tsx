import { useAppSelector } from "../../../../store/hooks";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import WarningMessage from "../../../../components/Warning";
import { usePageContext } from "vike-react/usePageContext";


const FilterButton = ({ filterAllowed, getValues }: { filterAllowed: boolean, getValues: Function }) => {
    const { urlParsed } = usePageContext()
    const tab = useAppSelector((state) => state.filterSection.value)
    const [warning, setWarning] = useState(false)

    useEffect(() => {
        if (filterAllowed) {
            setWarning(false)
        } 
    }, [filterAllowed])
    
    useEffect(() => {
        setWarning(false)
    }, [tab])

    const performFilter = () => {
        const form = getValues()
        const allTabs = ["Volumes", "Chapters", "Pages"]
        const range = allTabs.indexOf(tab)

        const fieldsPerTab = [["bunkoban", "saga"], ["arc", "duel", "characters"], ["pageFilters"]]

        const finalFields = fieldsPerTab.slice(0, range + 1)

        let queries = ""

        finalFields.map((item) => {
            item.map((field) => {
                if (field == "pageFilters"){
                    queries = `${queries}page_filters=${form[field]}&`
                } else {
                    queries = `${queries}${field}=${form[field]}&`
                }
            })
        })
    

        const url = `${urlParsed.pathnameOriginal}/${tab.toLowerCase()}?${queries.slice(0, -1)}`


        window.open(url, "_blank", "noreferrer")
    }

    return (
        <div className="mt-10 mb-5 px-5">
            <button
                onClick={() => {
                    if (!filterAllowed) {
                        setWarning(true)
                    } else {
                        performFilter()
                    }
                }}
                className="w-full text-yami shadow-sm cursor-pointer text-lg px-5 py-3 items-center justify-center rounded-md bg-link flex">
                Filter by {tab.toLocaleLowerCase()}
                <MagnifyingGlassCircleIcon className="size-7 ml-2" />
            </button>
            {warning &&
                <div className="mt-1">
                    <WarningMessage message="Choose at least one filter" />
                </div>
            }
        </div>
    )
}

export default FilterButton;