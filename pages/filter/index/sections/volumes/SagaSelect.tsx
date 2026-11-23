// external libraries
import { useEffect } from "react";
import { useWatch } from "react-hook-form";
// components
import WarningMessage from "../../../../../components/Warning";
// types
import type { CommonProps } from "../../+Page";

const SagaSelect = ({ register, setValue, sagas, control }: {sagas: string[]} & Omit<CommonProps, "getValues">) => {

    const bunkoban = useWatch({
        control,
        name: "bunkoban"
    });


    // sagas are only available in original edition
    useEffect(() => {
        if (bunkoban) {
            setValue(
                "saga", "",
                {
                    shouldDirty: true,
                    shouldValidate: true
                }
            );
        }
    }, [bunkoban])


    return (
        <>
            {bunkoban &&
                <div className={`mb-1 ${bunkoban ? "opacity-50" : ""}`}>
                    <WarningMessage message="Only available for original edition" />
                </div>
            }
            <select
                {...register("saga")}
                disabled={bunkoban}
                className="w-full border border-dotted border-link rounded-md select bg-transparent">
                <option value="">
                    No saga selected
                </option>
                {sagas.map((saga) => (
                    <option key={`saga-select-${saga}`} value={saga}>
                        {saga}
                    </option>
                ))}
            </select>
        </>
    )
}

export default SagaSelect;