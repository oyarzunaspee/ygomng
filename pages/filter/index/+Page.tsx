import { useData } from "vike-react/useData";
import type { Data } from "./+data";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler, Control, useWatch } from "react-hook-form"
import EditionSelect from "./sections/EditionSelect";
import SagaSelect from "./sections/SagaSelect";
import ArcSelect from "./sections/ArcSelect";
import DuelSelect from "./sections/DuelSelect";
import CharacterSelect from "./sections/CharacterSelect";
import PageSelect from "./sections/PageSelect";
import FilterButton from "./sections/FilterButton";
import type { CharacterType } from "./+data";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { swapFilterSection } from "../../../store/slices/filterSection";
import { usePageContext } from "vike-react/usePageContext";


export type FormType = {
    bunkoban: boolean;
    saga: string;
    arc: string[];
    duel: string[];
    characters: string[];
    pageFilters: string[];
}

export default function Page() {
    const {urlParsed} = usePageContext()
    console.log(urlParsed)
    const dispatch = useAppDispatch()
    const tabOpen = useAppSelector((state) => state.filterSection.value)
    const [filterAllowed, setFilterAllowed] = useState(true)

    const { filters } = useData<Data>()

    const tabs = ["Volumes", "Chapters", "Pages"]


    const {
        register,
        watch,
        setValue,
        getValues
    } = useForm<FormType>({
        defaultValues: {
            bunkoban: false,
            saga: "",
            arc: [],
            duel: [],
            characters: [],
            pageFilters: []
        }
    })
    useEffect(() => {
        setAllowed(tabOpen)
    }, [watch("arc"), watch("duel"), watch("characters"), watch("pageFilters")])

    useEffect(() => {
        setAllowed(tabOpen)
    }, [tabOpen])
    
    const setAllowed = (tab: string) => {
        let allowed = true
        if (tab == "Volumes") {
            allowed = getValues().saga != null
            setFilterAllowed(allowed)
        } else if (tab == "Chapters") {
            allowed = getValues().arc.length > 0 || getValues().duel.length > 0 || getValues().characters.length > 0
            setFilterAllowed(allowed)
        } else if (tab == "Pages") {
            allowed = getValues().pageFilters.length > 0
            setFilterAllowed(allowed)
        }
        
    }


    return (
        <>
            <div className="tabs tabs-lift mt-10 flex px-5 mb-10">
                {tabs.map((tab) => {
                    return (
                        <div
                            key={tab}
                            className="basis-1/3">
                            <div
                                onClick={() => {
                                    dispatch(swapFilterSection(tab))
                                }}
                                className={`${tabOpen == tab ? "border-x border-t" : "border-b"}
                            cursor-pointer py-5 border-dotted border-link flex justify-center rounded-t-md`}>
                                {tab}
                            </div>
                        </div>
                    )
                })}
                <div 
                className="border-x border-b w-full rounded-b-md border-dotted border-link">
                    <FilterButton filterAllowed={filterAllowed} getValues={getValues} />

                    <div className={`${tabOpen == tabs[2] ? "max-h-1000" : "max-h-0"} overflow-hidden`}>
                        <FilterSection name="Page type">
                            <PageSelect filters={filters.page} setValue={setValue} bunkoban={watch("bunkoban")} />
                        </FilterSection>
                    </div>

                    <FilterSection name="Edition">
                        <EditionSelect setValue={setValue} watch={watch} />
                    </FilterSection>

                    <FilterSection last={tabOpen == tabs[0]} name="Saga">
                        <SagaSelect register={register} setValue={setValue} sagas={filters.saga} watch={watch} />
                    </FilterSection>

                    <div className={`${tabOpen != tabs[0] ? "max-h-2000" : "max-h-0"} overflow-hidden`}>
                        <FilterSection name="Duel">
                            <DuelSelect duels={filters.duel} originalSetValue={setValue} watchDuels={watch("duel")} />
                        </FilterSection>

                        <FilterSection name="Arc">
                            <ArcSelect arcs={filters.arc} setValue={setValue} watch={watch} />
                        </FilterSection>

                        <FilterSection last name="Characters">
                            <CharacterSelect groups={filters.groups} setValue={setValue} />
                        </FilterSection>
                    </div>
                </div>
            </div>
        </>
    )
}

const FilterSection = ({ children, name, last }: { children: React.ReactNode, name: string, last?: boolean }) => {
    const tabOpen = useAppSelector((state) => state.filterSection.value)
    const [openSection, setOpenSection] = useState<string[]>(["Edition", "Saga"])

    useEffect(() => {
        if (tabOpen == "Volumes") {
            setOpenSection(["Edition", "Saga"])
        } else if (tabOpen == "Chapters") {
            setOpenSection(["Arc", "Duel", "Characters"])
        } else if (tabOpen == "Pages") {
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