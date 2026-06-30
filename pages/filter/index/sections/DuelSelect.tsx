import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";


type DuelInput = {
    duel: string;
}

const DuelSelect = ({ duels, originalSetValue, watchDuels }: { duels: string[], originalSetValue: Function, watchDuels: string[] }) => {
    const [isBackspace, setIsBackspace] = useState(false)
    // duels that match the user's input
    const [autoComplete, setAutoComplete] = useState<string[]>([])
    // duels selected by the user
    const [selectedDuels, setSelectedDuels] = useState<string[]>([])


    // form used within section, not final form data
    const {
        register,
        watch,
        setValue
    } = useForm<DuelInput>()

    const duelValue = watch("duel")

    useEffect(() => {
        // add vs at the end of the input when the user types a space to separate characters
        if (!isBackspace && duelValue && duelValue.at(-1) == " " && duelValue.search(/.+\svs\s$/) == -1) {
            setValue("duel", `${duelValue} vs `)
        }


        // populate the suggestions dropdown based on user's input matching duels that include typed characters
        if (duelValue) {
            const characters = duelValue.split(" vs ")
            const matches = duels.filter(item => characters.every(c => item.toLowerCase().includes(c.toLowerCase())));
            setAutoComplete(matches.filter(item => !selectedDuels.includes(item)))
            // reset suggestions when input is cleared
        } else if (duelValue === "") {
            setAutoComplete([])
        }
    }, [duelValue])

    // select duels from the suggestion dropdown
    const addDuel = (duel: string) => {
        setSelectedDuels([...selectedDuels, duel]);
        setValue("duel", "")
    }

    // set selected duels in the form
    useEffect(() => {
        originalSetValue("duel", selectedDuels)
    }, [selectedDuels])

    return (
        <>
            <SelectedDuels watchDuels={watchDuels} setSelectedDuels={setSelectedDuels} />
            <input
                onPaste={(e) => { e.preventDefault() }}
                onKeyDown={(e) => {
                    setIsBackspace(e.key === "Backspace")
                    return
                }}
                {...register("duel")}
                type="text"
                placeholder="Type characters"
                className="input bg-transparent" />
            <div className="w-full mt-3 mb-1 rounded-sm bg-yamier">
                {autoComplete.map((item, index) => {
                    return (
                        <div
                            onClick={() => addDuel(item)}
                            key={`duel-option-${index}`}
                            className="hover:text-yami hover:bg-link py-1 flex cursor-default p-2">
                            <PlusIcon className="size-4 mt-1 mr-2" />
                            <span className="">
                                {item}
                            </span>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

// selected duels with option to remove
const SelectedDuels = ({ watchDuels, setSelectedDuels }: { watchDuels: string[], setSelectedDuels: Function }) => {
    return (
        <div className="mb-5">
            {watchDuels && watchDuels.map((duel, index) => {
                return (
                    <div
                        onClick={() => {
                            setSelectedDuels((prev: string[]) => prev.filter(d => d !== duel));
                        }}
                        key={`duel-${index}`}
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
}

export default DuelSelect;