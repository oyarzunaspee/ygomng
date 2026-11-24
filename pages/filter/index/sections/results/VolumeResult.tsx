import type { VolumeData } from "../../../../@edition/types";
import type { ResultType } from "../../../types";


const VolumeResult = ({ data }: { data: Partial<VolumeData>[]}) => {
    console.log(data)
   
        return (
            <>
            {data.map(vol => {
                return (
                    <ul className="" key={`volume-result-list-${vol.counter}`}>
                        <li className="">
                            {vol.title}
                        </li>
                    </ul>
                )
            })}
            </>
        )


}

export default VolumeResult;