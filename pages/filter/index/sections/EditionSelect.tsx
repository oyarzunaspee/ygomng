const EditionSelect = ({ setValue, watch }: { setValue: Function, watch: Function }) => {

    const bunkoban = watch("bunkoban")

    const onChangeEdition = (edition: boolean) => {
        setValue("bunkoban", edition)
    }

    return (
        <div className="flex justify-around text-sm">
            <label className="label">
                <input
                    onChange={() => onChangeEdition(false)}
                    type="radio"
                    checked={!bunkoban ? true : false}
                    className="radio text-link" />
                Original
            </label>
            <label className="label">
                <input
                    onChange={() => onChangeEdition(true)}
                    type="radio"
                    checked={bunkoban ? true : false}
                    className="radio text-link" />
                Bunkoban
            </label>
        </div>
    )
}

export default EditionSelect;