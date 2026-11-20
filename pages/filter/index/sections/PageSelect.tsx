import { useState, useEffect } from "react";
import type { PageFilters } from "../../types";
import WarningMessage from "../../../../components/Warning";
import { useWatch } from "react-hook-form";

interface Props {
    options: PageFilters[],
    setValue: Function,
    bunkoban: boolean,
    register: Function
}

const PageSelect = ({ options, setValue, bunkoban, register }: Props) => {

    const selectedDuelsList = useWatch({
        control,
        name: "page_filter",
        defaultValue: []
    });

    const [selectedFilters, setSelectedFilters] = useState<string[]>([])

    const returnConditionals = (query: string) => {
        const bunkobanConditional = bunkoban && ["extra_illust", "game"].includes(query)
        const originalConditional = !bunkoban && query == "tarot"
        return { bunkobanConditional, originalConditional }
    }


    useEffect(() => {
        const { bunkobanConditional, originalConditional } = returnConditionals(pageFilterValue)

        if (bunkobanConditional || originalConditional) {
            setValue("page_filter", null, {
                shouldValidate: true,
                shouldDirty: true,
            })
        }
    }, [bunkoban])


    const checkAvailability = (query: string) => {
        const { bunkobanConditional, originalConditional } = returnConditionals(query)

        return bunkobanConditional || originalConditional ? true : false
    }

    const addWarning = (query: string) => {
        return (bunkoban && ["extra_illust", "game"].includes(query)) || (!bunkoban && ["tarot"].includes(query)) ? true : false
    }


    return (
        <>

            {options.map((option) => {
                return (
                    <div key={`filter-${option.query}`}
                        onClick={() => {
                            if (!checkAvailability(option.query)) {
                                setValue("page_filter", option.query)
                            }
                        }}
                        className={`border-transparent py-3
                        ${checkAvailability(option.query) ? "" : "cursor-pointer"}
                        
                        ${addWarning(option.query) ? "" : "border-b hover:border-link border-dotted"} 
                        `}>
                        <div className="flex justify-between items-center">
                            <span className={`${checkAvailability(option.query) ? "opacity-50" : ""}
                         cursor-default`}>
                                {addWarning(option.query) &&
                                    <span className="mr-1 text-warning">
                                        !
                                    </span>
                                }
                                {option.name}
                            </span>
                            <input
                                {...register("page_filter")}
                                value={option.query}
                                checked={pageFilterValue === option.query}
                                disabled={checkAvailability(option.query)}
                                type="radio" className="radio  text-link"
                            />
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