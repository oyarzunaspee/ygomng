import { useEffect } from "react";
import WarningMessage from "../../../../components/Warning";

const SagaSelect = ({ register, setValue, sagas, watch }: { register: any, setValue: Function, sagas: string[], watch: Function }) => {

    const bunkoban = watch("bunkoban")
    const sagaValue = watch("saga")

    // sagas are only available in original edition
    useEffect(() => {
        if (sagaValue) {
            setValue("bunkoban", false)
        }
    }, [sagaValue])

    useEffect(() => {
        if (bunkoban) {
            setValue("saga", "")
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
            defaultValue=""
            className="w-full border border-dotted border-link rounded-md select bg-transparent">
            <option value="">
                No saga selected
            </option>
            {sagas.map((s) => (
                <option key={s} value={s}>
                    {s}
                </option>
            ))}
        </select>
        </>
    )
}

export default SagaSelect;