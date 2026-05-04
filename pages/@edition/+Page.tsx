import { useState } from "react";
import { usePageContext } from "vike-react/usePageContext";

import Listing from "./sections/Listing";
import Card from "./sections/Card";
import Switch from "./sections/Switch";
import { useData } from "vike-react/useData";
import type { Data } from "./+data";

import type { customPageContext } from "../+onCreatePageContext";


export default function Page() {
  const [listing, setListing] = useState(false)
  const { bunkoban } = usePageContext() as customPageContext

  const {volumes} = useData<Data>()


    return (
      <>
        <Switch listing={listing} setListing={setListing} bunkoban={bunkoban} />

        {listing ?
          <Listing
            volumes={volumes}
          />
          :
          <Card
            volumes={volumes}
          />
        }
      </>
    )
}