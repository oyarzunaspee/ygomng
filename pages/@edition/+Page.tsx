import { usePageContext } from "vike-react/usePageContext";

import List from "../../components/List";
import Card from "../../components/Card";
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
    <div className="md:flex justify-center">
      <div className="lg:basis-1/2 md:basis-7/9">
        <Switch
          listing={listing}
          setListing={setListing}
          bunkoban={bunkoban}
          loading={loading} />


        <div className="pb-5">
          {listing ?
            <List
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
      </div>

    </div>
  )
}