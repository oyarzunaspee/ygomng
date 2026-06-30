import type { GroupType, CharacterType } from "../+data";
import { useState, useEffect } from "react";
import { ArrowTurnDownRightIcon } from "@heroicons/react/24/solid";

const CharacterSelect = ({ groups, setValue }: { groups: GroupType[], setValue: Function }) => {
    const [engNames, setEngNames] = useState(false)
    const [selectedChars, setSelectedChars] = useState<string[]>([])

    // populate characters field in form
    useEffect(() => {
        setValue("characters", selectedChars)
    }, [selectedChars])

    const selectCharacter = (char: CharacterType, alt?: boolean) => {
        setSelectedChars(prev => {
            if (prev.includes(char.short)) {
                if (char.alt != null && alt) {
                    return prev.filter(a => a !== char.short && a !== char.alt)
                } else {
                    return prev.filter(a => a !== char.short)
                }
            } else {
                if (char.alt != null && alt) {
                    return [...prev, char.short, char.alt]
                } else {
                    return [...prev, char.short]
                }
            }
        })
    }

    
    // get data of alt character
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
                                        key={char.short}
                                        className="  border-transparent border-b hover:border-link border-dotted py-1">
                                        <div className="w-full flex justify-between items-center">
                                            <span className="">
                                                {engNames ? (char.eng || char.name) : char.name}
                                            </span>
                                            <input
                                                checked={selectedChars.includes(char.short)}
                                                onChange={() => selectCharacter(char, true)}
                                                type="checkbox" className="checkbox checkbox-md border-link" />

                                        </div>
                                        {selectedChars.includes(char.short) && char.alt != null &&
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
                                                onChange={() => selectCharacter(getAltCharacter(char.alt!)!)}
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