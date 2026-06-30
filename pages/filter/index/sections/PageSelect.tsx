import { useState, useEffect } from "react";
import type { PageFilters } from "../+data";
import WarningMessage from "../../../../components/Warning";

const PageSelect = ({ filters, setValue, bunkoban }: { filters: PageFilters[], setValue: Function, bunkoban: boolean }) => {

    const [selectedFilters, setSelectedFilters] = useState<string[]>([])


    useEffect(() => {
        setValue("pageFilters", selectedFilters)
    }, [selectedFilters])


    useEffect(() => {
        // remove queries depending on if they are allowed in each edition
        let queries;
        if (bunkoban) {
            queries = ["extra_illust", "game"]
        } else {
            queries = ["tarot"]
        }
        setSelectedFilters(prev =>
            prev.filter(item => !queries.includes(item))
        )


    }, [bunkoban])

    const checkAvailability = (query: string) => {
        if (bunkoban && (query == "extra_illust" || query == "game")) {
            return true
        } else if (!bunkoban && query == "tarot") {
            return true
        } else {
            return false
        }
    }

    const addWarning = (query: string) => {
        return (bunkoban && ["extra_illust", "game"].includes(query)) || (!bunkoban && ["tarot"].includes(query)) ? true : false
    }


    return (
        <>

            {filters.map((filter) => {
                return (
                    <div key={`filter-${filter.query}`} 
                    className={`border-transparent ${addWarning(filter.query) ? "" : "border-b hover:border-link border-dotted"} py-1`}>
                        <div className="flex justify-between items-center">
                            <span className={`${checkAvailability(filter.query) ? "opacity-50" : ""}
                         cursor-default`}>
                                {addWarning(filter.query) &&
                                    <span className="mr-1 text-warning">
                                        !
                                    </span>
                                }
                                {filter.name}
                            </span>
                            <input
                                onChange={() => {
                                    setSelectedFilters(prev => {
                                        if (prev.includes(filter.query)) {
                                            return prev.filter(a => a !== filter.query)
                                        } else {
                                            return [...prev, filter.query]
                                        }
                                    })
                                }}
                                checked={selectedFilters.includes(filter.query)}
                                disabled={checkAvailability(filter.query)}
                                type="checkbox" className="checkbox border-link" />
                        </div>
                    </div>

                )
            })}
            <div className="mt-10">
                <WarningMessage message={`Only available for ${bunkoban ? "original" : "bunkoban"} edition`} />
            </div>
        </>
    )
}

export default PageSelect;