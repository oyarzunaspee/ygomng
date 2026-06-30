import { useAppSelector } from "../../../../../store/hooks";

const JumpToDrawer = () => {
    const open = useAppSelector((state) => state.jumpToChapter.value)
    return (
        <>
        <div className="fixed left-0 top-0">
            <div className="bg-yami h-screen p-5">
                d
            </div>
        </div>
        </>
    )
}

export default JumpToDrawer;