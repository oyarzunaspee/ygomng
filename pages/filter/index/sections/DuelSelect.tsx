// external libraries
import { useState } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useWatch } from "react-hook-form";
// types
import type { FormType } from "../../types";
import type { UseFormSetValue, Control } from "react-hook-form";

interface SelectedProps {
    duels: string[] | null
    setValue: UseFormSetValue<FormType>
}

const SelectedDuelsList = ({ duels, setValue }: SelectedProps) => {

    const handleRemoveDuel = (duel: string) => {
        setValue(
            "duel",
            (duels ?? []).filter(item => item !== duel),
            {
                shouldDirty: true,
                shouldValidate: true
            }
        );
    };

    return (
        <div className="mb-5">
            {duels?.map((duel, index) => {
                return (
                    <div
                        onClick={() => handleRemoveDuel(duel)}
                        key={`selected-duel-${index}`}
                        className="bg-link text-yami py-2 px-1 text-xs rounded flex items-center cursor-pointer my-2">
                        <XMarkIcon className="size-3 mr-1" />
                        <span>
                            {duel}
                        </span>
                    </div>
                )
            })}
        </div>
    )
};

interface DuelProps {
    duels: string[]
    control: Control<FormType>
    setValue: UseFormSetValue<FormType>
}

const DuelSelect = ({ duels, control, setValue }: DuelProps) => {
    const [autocompleteInput, setAutocompleteInput] = useState("")

    const selectedDuelsList = useWatch({
        control,
        name: "duel",
        defaultValue: []
    });


    const handleAddDuel = (duel: string) => {
        if (!selectedDuelsList?.includes(duel)) {
            setValue("duel", [...(selectedDuelsList ?? []), duel], {
                shouldDirty: true,
                shouldValidate: true
            });
            setAutocompleteInput("")
        }
    };

    const handleInput = (value: string) => {
        const input = value.replace(/[^a-zA-Z\s]/g, "");
        setAutocompleteInput(input);
    }

    const handleAutocomplete = (duel: string) => {
        const inputItems = autocompleteInput.toLowerCase().trim().split(/\s+/);
        const regex = new RegExp(inputItems.map(item => `(?=.*${item})`).join(""), "ig")

        return regex.test(duel.toLowerCase())
    }

    return (
        <>
            <SelectedDuelsList duels={selectedDuelsList} setValue={setValue} />
            <input
                onPaste={(e) => { e.preventDefault() }}
                value={autocompleteInput}
                onChange={e => handleInput(e.target.value)}
                type="text"
                placeholder="Type character names"
                className="input bg-transparent w-full border-white" />
            <div className="w-full mt-3 mb-1 rounded-sm bg-yamier">
                {duels.map((duel, index) => {

                    const inputMatchesDuel = handleAutocomplete(duel)
                    const isDuelSelected = selectedDuelsList?.includes(duel)

                    if (autocompleteInput.length > 2 && inputMatchesDuel && !isDuelSelected) {
                        return (
                            <div
                                onClick={() => handleAddDuel(duel)}
                                key={`duel-option-${index}`}
                                className="hover:text-yami hover:bg-link py-1 flex cursor-default p-2">
                                <PlusIcon className="size-4 mt-1 mr-2" />
                                <span className="">
                                    {duel}
                                </span>
                            </div>
                        )
                    }
                })}
            </div>
        </>
    )
}


export default DuelSelect;