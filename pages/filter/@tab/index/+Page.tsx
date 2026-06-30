import { useData } from "vike-react/useData";
import type { Data } from "./+data";
import { usePageContext } from "vike-react/usePageContext";

import VolumesResults from "./sections/VolumesResults";
import ChaptersResults from "./sections/ChaptersResults";
import PagesResults from "./sections/PagesResults";

export default function Page() {
    const { routeParams } = usePageContext()
    const { result } = useData<Data>()
    console.log(result)
    switch (routeParams.tab.toLowerCase()) {
        case "volumes":
            return (
                <VolumesResults />
            )
        case "chapters":
            return (
                <ChaptersResults />
            )
        case "pages":
            return (
                <PagesResults />
            )
    }
}
