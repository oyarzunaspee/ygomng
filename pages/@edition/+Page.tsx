import { usePageContext } from "vike-react/usePageContext";

import Listing from "./sections/Listing";
import Card from "./sections/Card";
import Switch from "./sections/Switch";
import { useData } from "vike-react/useData";
import type { Data } from "./+data";
import { getLoading, subscribe } from "../../hooks/loadingState";
import { useState, useEffect } from "react";

import type { customPageContext } from "../+onCreatePageContext";


export default function Page() {
  const [listing, setListing] = useState(false)
  const { bunkoban } = usePageContext() as customPageContext

  const [loading, setLoadingState] = useState(getLoading())
  const [clickedChapter, setClickedChapter] = useState(0)

  useEffect(() => {
    return subscribe(setLoadingState)
  }, [])

  useEffect(() => {
    if (!loading) {
      setClickedChapter(0)
    }
  }, [loading])



  const { volumes } = useData<Data>()


  return (
    <>
      <Switch
        listing={listing}
        setListing={setListing}
        bunkoban={bunkoban}
        loading={loading} />


      <div className="pb-5">
        {listing ?
          <Listing
            volumes={volumes}
            loading={loading}
            clickedChapter={clickedChapter}
            setClickedChapter={setClickedChapter}
          />
          :
          <Card
            volumes={volumes}
            loading={loading}
            clickedChapter={clickedChapter}
            setClickedChapter={setClickedChapter}
          />
        }
      </div>

    </>
  )
}