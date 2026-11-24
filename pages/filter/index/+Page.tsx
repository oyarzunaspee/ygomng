// external libraries
import { useData } from "vike-react/useData";
import { usePageContext } from "vike-react/usePageContext";
import { useEffect } from "react";
import { useForm, Control } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// redux
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { swapFilterSection } from "../../../store/slices/filterSection";
import { useLazyGetFilterResultsQuery } from "../../../store/api/filterApi";
// components
import EditionSelect from "./sections/volumes/EditionSelect";
import SagaSelect from "./sections/volumes/SagaSelect";
import ArcSelect from "./sections/chapters/ArcSelect";
import DuelSelect from "./sections/chapters/DuelSelect";
import CharacterSelect from "./sections/chapters/CharacterSelect";
import PageSelect from "./sections/pages/PageSelect";
import FilterButton from "./sections/FilterButton";
import FilterWrapper from "./sections/FilterWrapper";
import QueryResult from "./sections/QueryResult";

// types
import type { FormType } from "../types";
import type { Data } from "./+data";
import type { UseFormSetValue, UseFormRegister, UseFormGetValues } from "react-hook-form";



export interface CommonProps {
    control: Control<FormType>
    setValue: UseFormSetValue<FormType>
    register: UseFormRegister<FormType>
    getValues: UseFormGetValues<FormType>
}


export default function Page() {

    const dispatch = useAppDispatch()
    const tabOpen = useAppSelector((state) => state.filterSection.value)
    const [triggerFilterResults, { isError, isLoading, isSuccess, data, originalArgs }] = useLazyGetFilterResultsQuery()

    const { filterData } = useData<Data>()

    const shcema = yup.object({
        bunkoban: yup.boolean().default(false).required(),
        saga: yup.string().nullable().defined().default(null).test(
            "mismatch",
            "Saga not available for Bunkoban edition",
            (value, context) => {
                return value === null ? !context.parent.bunkoban : true
            }
        ),
        arc: yup.array().of(yup.number().max(filterData.arc.length).defined()).nullable().defined().default(null),
        duel: yup.array().of(yup.string().oneOf(filterData.duel).defined()).nullable().defined().default(null),
        characters: yup.array().of(yup.string().oneOf(filterData.characterList).defined()).nullable().defined().default(null),
        page_filter: yup.string().oneOf(filterData.pageFilterList.flatMap(item => item["query"])).nullable().defined().default(null).test(
            "required",
            "Page filter required",
            (value, context) => {
                return (tabOpen === "pages" && context.parent.page_filter === null) ? false : true
            }
        )
    }).test(
        (values, schema) => {
            if (tabOpen === "chapters" && (values.arc === null && values.duel === null && values.characters === null)) {
                return schema.createError({
                    path: "chapter",
                    type: "required",
                    message: "At least one chapter filter required"
                });
            } else {
                return true
            }
        }
    )

    const {
        register,
        watch,
        control,
        setValue,
        setValues,
        getValues,
        handleSubmit,
        formState: { errors }
    } = useForm<FormType>({
        resolver: yupResolver(shcema),
        defaultValues: {
            bunkoban: false,
            saga: null,
            arc: null,
            duel: null,
            characters: null,
            page_filter: null
        }
    })

    useEffect(() => {
        switch (tabOpen) {
            case "volumes":
                setValues({ arc: null, duel: null, characters: null, page_filter: null })
                break
            case "chapters":
                setValues({ page_filter: null })
                break
        }
    }, [tabOpen])



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
                            <FilterButton handleSubmit={handleSubmit} errors={errors} trigger={triggerFilterResults} />


                            <div className={`${tabOpen === "pages" ? "max-h-1000" : "max-h-0"} overflow-hidden`}>
                                <FilterWrapper name="Page type">
                                    <PageSelect
                                        options={filterData.pageFilterList}
                                        control={control}
                                        excludedOptions={filterData.editionExcludedPageFilters}
                                        setValue={setValue}
                                        register={register}
                                    />
                                </FilterWrapper>
                            </div>

                            <FilterWrapper name="Edition">
                                <EditionSelect setValue={setValue} control={control} />
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
                    <QueryResult isError={isError} isLoading={isLoading} isSuccess={isSuccess} data={data ?? null} originalArgs={originalArgs}  />
                </div>
            </div>
        </>
    )
}