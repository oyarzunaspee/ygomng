import { useState, useEffect } from "react";
import type { PageFilters } from "../../../types";
import WarningMessage from "../../../../../components/Warning";
import { useWatch } from "react-hook-form";
import { CommonProps } from "../../+Page";

interface Props {
    options: PageFilters[]
    excludedOptions: { bunkoban: string[], original: string[] }
}

const PageSelect = ({ options, excludedOptions, setValue, register, control }: Props & Omit<CommonProps, "getValues">) => {

    const selectedPageFilter = useWatch({
        control,
        name: "page_filter",
        defaultValue: null
    });
    
    const bunkoban = useWatch({
        control,
        name: "bunkoban"
    });


    const returnConditionals = (query: string) => {
        const bunkobanConditional = bunkoban && excludedOptions["bunkoban"].includes(query)
        const originalConditional = !bunkoban && excludedOptions["original"].includes(query)
        return { bunkobanConditional, originalConditional }
    }


    useEffect(() => {
        const { bunkobanConditional, originalConditional } = returnConditionals(selectedPageFilter ?? "")

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
                const isFilterAvailable = checkAvailability(option.query)
                const warning = addWarning(option.query)
                return (
                    <div key={`page-filter-${option.query}`}
                        className={`border-transparent py-3
                        ${isFilterAvailable ? "" : "cursor-pointer"}
                        
                        ${warning ? "" : "border-b hover:border-link border-dotted"} 
                        `}>
                        <div className="flex justify-between items-center">
                            <span className={`${isFilterAvailable ? "opacity-50" : ""}
                         cursor-default`}>
                                {warning &&
                                    <span className="mr-1 text-warning">
                                        !
                                    </span>
                                }
                                {option.name}
                            </span>
                            <input
                                {...register("page_filter")}
                                value={option.query}
                                disabled={isFilterAvailable}
                                type="radio" className="radio"
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