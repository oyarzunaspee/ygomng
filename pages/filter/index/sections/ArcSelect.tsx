import type { Arc } from "../../types";
import { useState, useEffect } from "react";

const ArcSelect = ({ arcs, register }: { arcs: Arc[], register: any}) => {


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
                            {...register("arc")}
                                type="checkbox" className="checkbox border-link" />
                        </div>

                    </div>
                )
            })}
        </div>
    )
}

export default ArcSelect;