import type { FormType } from "../../types";
import type { UseFormRegister } from "react-hook-form";
import { CommonProps } from "../+Page";

const EditionSelect = ({ register }:  Pick<CommonProps, "register"> ) => {

    return (
        <div className="flex justify-around text-sm">
            <label className="label">
                <input
                    {...register("bunkoban")}
                    type="radio"
                    value="original"
                    className="radio text-link" />
                Original
            </label>
            <label className="label">
                <input
                    {...register("bunkoban")}
                    type="radio"
                    value="bunkoban"
                    className="radio text-link" />
                Bunkoban
            </label>
        </div>
    )
}

export default EditionSelect;