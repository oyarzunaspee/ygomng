// external libraries
import { useState, useEffect } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
// redux
import { useAppSelector } from "../../../../store/hooks";

const FilterWrapper = ({ children, name, last }: { children: React.ReactNode, name: string, last?: boolean }) => {
    const tabOpen = useAppSelector(state => state.filterSection.value)
    const [openSection, setOpenSection] = useState<string[]>(["Edition", "Saga"])

    useEffect(() => {
        if (tabOpen == "volumes") {
            setOpenSection(["Edition", "Saga"])
        } else if (tabOpen == "chapters") {
            setOpenSection(["Arc", "Duel", "Characters"])
        } else if (tabOpen == "pages") {
            setOpenSection(["Page type"])
        }
    }, [tabOpen])


    return (
        <div className={`p-5 ${!last ? "border-b border-dotted border-link" : ""}`}>
            <div
                onClick={() => setOpenSection(prev => prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name])}
                className="flex justify-between">
                <span className="font-bold text-sm text-link">
                    {name}
                </span>
                <label
                    className="swap">
                    <ChevronDownIcon
                        className={`${openSection.includes(name) ? "swap-on" : "swap-off"}
                        size-5`} />
                    <ChevronUpIcon
                        className={`${!openSection.includes(name) ? "swap-on" : "swap-off"}
                    size-5`} />
                </label>
            </div>
            <div className={`transition-height ease-in-out duration-300 overflow-hidden
            ${openSection.includes(name) ? "max-h-800" : "max-h-0"}`}>
                <div className="mt-10">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default FilterWrapper;