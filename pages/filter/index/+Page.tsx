// external libraries
import { useData } from "vike-react/useData";
import { useState, useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePageContext } from "vike-react/usePageContext";
import {
    useForm,
    SubmitHandler,
    Control,
    useWatch
} from "react-hook-form";
// redux
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { swapFilterSection } from "../../../store/slices/filterSection";
// components
import EditionSelect from "./sections/EditionSelect";
import SagaSelect from "./sections/SagaSelect";
import ArcSelect from "./sections/ArcSelect";
import DuelSelect from "./sections/DuelSelect";
import CharacterSelect from "./sections/CharacterSelect";
import PageSelect from "./sections/PageSelect";
import FilterButton from "./sections/FilterButton";
import FilterWrapper from "./sections/FilterWrapper";

// types
import type { FormType } from "../types";
import type { Data } from "./+data";




export default function Page() {
    const { urlParsed } = usePageContext()

    const dispatch = useAppDispatch()
    const tabOpen = useAppSelector((state) => state.filterSection.value)
    const [filterAllowed, setFilterAllowed] = useState(true)

    const { filterData } = useData<Data>()

    let schema = yup.object({
        bunkoban: yup.string().oneOf(["bunkoban", "original"]).default("original").required(),
        saga: yup.string().oneOf(filterData.saga).nullable().defined().default(null)
            .when([], {
                is: () => tabOpen == "volumes",
                then: schema => schema.required(),
                otherwise: schema => schema.notRequired(),
            }),
        arc: yup.array().of(yup.number().max(filterData.arc.length).defined()).nullable().defined().default(null),
        duel: yup.array().of(yup.string().oneOf(filterData.duel).defined()).nullable().defined().default(null),
        characters: yup.array().of(yup.string().oneOf(filterData.characterList).defined()).nullable().defined().default(null),
        page_filter: yup.string().oneOf(filterData.pageFilterList.flatMap(item => item["query"])).nullable().defined().default(null)
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
        control,
        setValue,
        getValues
    } = useForm<FormType>({
        resolver: yupResolver(schema),
        defaultValues: {
            bunkoban: "original"
        }
    })

    const swapFilterNav = (tab: string) => {
        dispatch(swapFilterSection(tab))
    }

    return (
        <>
            <div className="md:flex justify-center">
                <div className="lg:basis-1/2">

                    <div className="tabs tabs-lift mt-10 flex px-5 mb-10 text-white">
                        {filterData.tabList.map((tab) => {
                            return (
                                <div
                                    key={tab}
                                    className="basis-1/3">
                                    <div
                                        onClick={() => swapFilterNav(tab)}
                                        className={`${tabOpen == tab ? "border-x border-t" : "border-b"}
                            cursor-pointer py-5 border-dotted border-link flex justify-center rounded-t-md`}>
                                        {tab[0].toUpperCase() + tab.slice(1)}
                                    </div>
                                </div>
                            )
                        })}
                        <div
                            className="border-x border-b w-full rounded-b-md border-dotted border-link">
                            <FilterButton filterAllowed getValues={getValues} />

                            <div className={`${tabOpen === "pages" ? "max-h-1000" : "max-h-0"} overflow-hidden`}>
                                <FilterWrapper name="Page type">
                                    {/* <PageSelect options={filterData.pageFilterList} setValue={setValue} bunkoban={watch("bunkoban") == "bunkoban"} register={register} /> */}
                                </FilterWrapper>
                            </div>

                            <FilterWrapper name="Edition">
                                <EditionSelect register={register} />
                            </FilterWrapper>

                            <FilterWrapper last={tabOpen === "volumes"} name="Saga">
                                <SagaSelect register={register} setValue={setValue} sagas={filterData.saga} control={control} />
                            </FilterWrapper>

                            <div className={`${tabOpen !== "volumes" ? "max-h-2000" : "max-h-0"} overflow-hidden`}>
                                <FilterWrapper name="Duel">
                                    <DuelSelect duels={filterData.duel} control={control} setValue={setValue} />
                                </FilterWrapper>

                                <FilterWrapper name="Arc">
                                    <ArcSelect arcs={filterData.arc} register={register} />
                                </FilterWrapper>

                                <FilterWrapper last name="Characters">
                                    <CharacterSelect groups={filterData.groups} setValue={setValue} control={control} register={register} />
                                </FilterWrapper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}