import type { Arc } from "../+data";
import { useState, useEffect } from "react";

const ArcSelect = ({ arcs, setValue, watch }: { arcs: Arc[], setValue: Function, watch: Function }) => {

    const [selectedArcs, setSelectedArcs] = useState<string[]>([])

    useEffect(() => {
        setValue("arc", selectedArcs)
    }, [selectedArcs])


    return (
        <div>
            {arcs.map((arc) => {
                return (
                    <div key={`arc-${arc.number}`} className="border-transparent border-b hover:border-link border-dotted py-1">
                        <div className="flex justify-between items-center">
                            <span className="text-sm">
                                {arc.name}
                            </span>
                            <input
                                onChange={() => {
                                    setSelectedArcs(prev => {
                                        if (prev.includes(arc.name)) {
                                            return prev.filter(a => a !== arc.name)
                                        } else {
                                            return [...prev, arc.name]
                                        }
                                    })
                                }}
                                type="checkbox" className="checkbox border-link" />
                        </div>

                    </div>
                )
            })}
        </div>
    )
}

export default ArcSelect;