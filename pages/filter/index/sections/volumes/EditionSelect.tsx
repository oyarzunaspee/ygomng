import { CommonProps } from "../../+Page";
import { useWatch } from "react-hook-form";

const EditionSelect = ({ setValue, control }: Pick<CommonProps, "setValue" | "control">) => {

    const bunkoban = useWatch({
        control,
        name: "bunkoban"
    });

    const handleSelectEdition = (edition: string) => {
        setValue("bunkoban", edition === "bunkoban", {
            shouldDirty: true,
            shouldValidate: true
        })
    }


    return (
        <div className="flex justify-around text-sm">
            {["original", "bunkoban"].map((edition) => {
                return (
                    <label key={`edition-select${edition}`} className="label">
                        <input
                            type="radio"
                            onChange={() => handleSelectEdition(edition)}
                            checked={(edition === "original" && !bunkoban) || (edition === "bunkoban" && bunkoban) ? true : false }
                            value={edition}
                            className="radio" />
                        {edition[0].toUpperCase() + edition.slice(1)}
                    </label>
                )
            })}
        </div>
    )
}

export default EditionSelect;