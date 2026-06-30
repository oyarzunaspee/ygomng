const WarningMessage = ({ message }: { message: string }) => {
    return (
        <div className="text-xs opacity-75">
            <span className="mr-1 text-warning">
                !
            </span>
            <span>
                {message}
            </span>
        </div>
    )
}

export default WarningMessage;