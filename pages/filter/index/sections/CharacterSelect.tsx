// external libraries
import { useState } from "react";
import { ArrowTurnDownRightIcon } from "@heroicons/react/24/solid";
import { useWatch } from "react-hook-form";
// types
import type { 
    GroupType,
    CharacterType,
    FormType
} from "../../types";
import type {
    Control,
    UseFormSetValue,
    UseFormRegister
} from "react-hook-form";

interface Props {
    groups: GroupType[]
    control: Control<FormType>
    setValue: UseFormSetValue<FormType>
    register: UseFormRegister<FormType>
}

const CharacterSelect = ({ groups, control, setValue, register }: Props) => {
    const [engNames, setEngNames] = useState(false)

    const selectedChars = useWatch({
        control,
        name: "characters",
        defaultValue: []
    });

    const selectCharacter = (character: CharacterType | undefined, mainChoice: boolean ) => {
        if (character === undefined) return;

        const current = selectedChars || []

        let updated: string[]

        // unselect if already in array
        if (current.includes(character.short)) {
            updated = current.filter(char => char !== character.short)
            // also unselect alt if not nested
            if (mainChoice && character.alt && current.includes(character.alt)) {
                updated = current.filter(char => char !== character.alt)
            }
        // select if not in array
        } else {
            updated = [...current, character.short]
            // also select if not nested
            if (mainChoice && character.alt && !current.includes(character.alt)) {
                updated = [...current, character.alt]
            }
        }

        setValue("characters", updated, {
            shouldDirty: true,
            shouldValidate: true
        })
    }


    // get object of alt character
    const getAltCharacter = (alt: string) => {
        return groups.flatMap(g => g.characters).find(c => c.short == alt)
    }

    return (
        <>
            <div className="flex justify-end">
                <label className="label py-3 text-xs">
                    <span className={`${engNames ? "text-link" : ""}`}>
                        English names
                    </span>
                    <input
                        onChange={() => {
                            setEngNames(!engNames)
                        }}
                        checked={engNames}
                        type="checkbox"
                        className="toggle toggle-xs checked:text-link" />
                </label>
            </div>
            {groups.map((group, index) => {
                return (
                    <div key={`group-${index}`} className="mt-3">
                        <span className="font-bold">
                            {group.group}
                        </span>
                        <ul className="pl-5 mt-2">
                            {group.characters.map((char) => {
                                return (

                                    <li
                                        key={`character-list-${char.short}`}
                                        className="  border-transparent border-b hover:border-link border-dotted py-1">
                                        <div className="w-full flex justify-between items-center">
                                            <span className="">
                                                {engNames ? (char.eng || char.name) : char.name}
                                            </span>
                                            <input
                                                {...register("characters")}
                                                checked={selectedChars?.includes(char.short)}
                                                onChange={() => selectCharacter(char, true)}
                                                value={char.short}
                                                type="checkbox" className="checkbox checkbox-md border-link" />

                                        </div>
                                        {/* nested */}
                                        {selectedChars?.includes(char.short) && char.alt != null &&
                                            <div className="flex justify-between mt-3 mb-1">
                                                <span className="flex text-sm">
                                                    <ArrowTurnDownRightIcon className="size-5" />
                                                    {engNames ?
                                                        (getAltCharacter(char.alt)?.eng || getAltCharacter(char.alt)?.name)
                                                        :
                                                        getAltCharacter(char.alt)?.name
                                                    }

                                                </span>
                                                <input
                                                    checked={selectedChars.includes(char.alt)}
                                                    onChange={() => selectCharacter(getAltCharacter(char.name), false)}
                                                    type="checkbox" className="checkbox checkbox-sm border-link" />
                                            </div>
                                        }
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                )
            })}
        </>
    )
}

export default CharacterSelect;