import { useData } from "vike-react/useData";
import type { Data } from "./+data";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import {
    useForm,
    SubmitHandler,
    Control,
    useWatch
} from "react-hook-form"
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
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"


export type FormType = {
    bunkoban: boolean;
    saga: string | null;
    arc: number[] | null;
    duel: string[] | null;
    characters: string[] | null;
    page_filter: string | null;
}


export default function Page() {
    const { urlParsed } = usePageContext()

    const dispatch = useAppDispatch()
    const tabOpen = useAppSelector((state) => state.filterSection.value)
    const [filterAllowed, setFilterAllowed] = useState(true)

    const { filters } = useData<Data>()
    console.log(filters)

    const tabs = ["volumes", "chapters", "pages"]

    const fieldsPerTab = {
        volumes: ["bunkoban", "saga"],
        chapters: ["arc", "duel", "characters"],
        pages: ["pageFilter"]
    }

    const characterList = filters.groups.flatMap(group => group["characters"].map(({ short }) => short))
    const pageFilterNames = filters.page.flatMap(item => item)

    let schema = yup.object({
        bunkoban: yup.boolean().default(false).required(),
        saga: yup.string().oneOf(filters.saga).nullable().defined().default(null)
        .when([], {
            is: () => tabOpen == "volumes",
            then: schema => schema.required(),
            otherwise: schema => schema.notRequired(),
        }),
        arc: yup.array().of(yup.number().max(filters.arc.length).defined()).nullable().defined().default(null),
        duel: yup.array().of(yup.string().oneOf(filters.duel).defined()).nullable().defined().default(null),
        characters: yup.array().of(yup.string().oneOf(characterList).defined()).nullable().defined().default(null),
        page_filter: yup.string().oneOf(pageFilterNames.flatMap(item => item["query"])).nullable().defined().default(null)
        .when([], {
            is: () => tabOpen == "pages",
            then: val => val.required(),
            otherwise: val => val.notRequired(),
        })
    }).test(
        "at-least-one",
        "At least one chapter field is required",
        value => (tabOpen == "chapters" && !!(value?.arc || value?.duel || value?.characters))
    )

    const {
        register,
        watch,
        setValue,
        getValues
    } = useForm<FormType>({
        resolver: yupResolver(schema),
    })

    return (
        <>
            <div className="md:flex justify-center">
                <div className="lg:basis-1/2">

                    <div className="tabs tabs-lift mt-10 flex px-5 mb-10 text-white">
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
                                        {tab[0].toUpperCase() + tab.slice(1)}
                                    </div>
                                </div>
                            )
                        })}
                        <div
                            className="border-x border-b w-full rounded-b-md border-dotted border-link">
                            <FilterButton filterAllowed={filterAllowed} getValues={getValues} />

                            <div className={`${tabOpen == tabs[2] ? "max-h-1000" : "max-h-0"} overflow-hidden`}>
                                <FilterWrapper name="Page type">
                                    <PageSelect options={pageFilterNames} setValue={setValue} watch={watch} register={register} />
                                </FilterWrapper>
                            </div>

                            <FilterWrapper name="Edition">
                                <EditionSelect setValue={setValue} watch={watch} />
                            </FilterWrapper>

                            <FilterWrapper last={tabOpen == tabs[0]} name="Saga">
                                <SagaSelect register={register} setValue={setValue} sagas={filters.saga} watch={watch} />
                            </FilterWrapper>

                            <div className={`${tabOpen != tabs[0] ? "max-h-2000" : "max-h-0"} overflow-hidden`}>
                                <FilterWrapper name="Duel">
                                    <DuelSelect duels={filters.duel} originalSetValue={setValue} watchDuels={watch("duel")} />
                                </FilterWrapper>

                                <FilterWrapper name="Arc">
                                    <ArcSelect arcs={filters.arc} setValue={setValue} watch={watch} />
                                </FilterWrapper>

                                <FilterWrapper last name="Characters">
                                    <CharacterSelect groups={filters.groups} setValue={setValue} />
                                </FilterWrapper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const FilterWrapper = ({ children, name, last }: { children: React.ReactNode, name: string, last?: boolean }) => {
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