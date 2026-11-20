import { useEffect } from "react";
import WarningMessage from "../../../../components/Warning";
import { useWatch } from "react-hook-form";
import type { FormType } from "../../types";
import type {
    Control,
    UseFormSetValue,
    UseFormRegister
} from "react-hook-form";

interface Props {
    sagas: string[],
    register: UseFormRegister<FormType>,
    setValue: UseFormSetValue<FormType>,
    control: Control<FormType>
}

const SagaSelect = ({ register, setValue, sagas, control }: Props) => {

    const bunkoban = useWatch({
        control,
        name: "bunkoban"
    });


    // sagas are only available in original edition
    useEffect(() => {
        if (bunkoban === "bunkoban") {
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
            {bunkoban == "bunkoban" &&
                <div className={`mb-1 ${bunkoban ? "opacity-50" : ""}`}>
                    <WarningMessage message="Only available for original edition" />
                </div>
            }
            <select
                {...register("saga")}
                disabled={bunkoban == "bunkoban"}
                defaultValue=""
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